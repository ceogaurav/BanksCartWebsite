import React, { useState } from 'react';
import { User, updatePassword, updateEmail, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { Lock, Mail, AlertCircle, CheckCircle, Save } from 'lucide-react';

interface SecuritySettingsProps {
    user: User;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({ user }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');

    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState('');
    const [emailError, setEmailError] = useState('');
    const [emailSuccess, setEmailSuccess] = useState('');
    const [isPasswordLoading, setIsPasswordLoading] = useState(false);
    const [isEmailLoading, setIsEmailLoading] = useState(false);

    // Helper: Re-authenticate user (required for sensitive operations)
    const reauthenticate = async (password: string) => {
        if (!user.email) throw new Error("No email associated with this account.");
        const credential = EmailAuthProvider.credential(user.email, password);
        await reauthenticateWithCredential(user, credential);
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordError('');
        setPasswordSuccess('');
        setIsPasswordLoading(true);

        if (newPassword !== confirmPassword) {
            setPasswordError("New passwords do not match.");
            setIsPasswordLoading(false);
            return;
        }

        if (newPassword.length < 6) {
            setPasswordError("Password must be at least 6 characters.");
            setIsPasswordLoading(false);
            return;
        }

        try {
            await reauthenticate(currentPassword);
            await updatePassword(user, newPassword);
            setPasswordSuccess("Password updated successfully!");
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err: any) {
            console.error(err);
            if (err.code === 'auth/wrong-password') {
                setPasswordError("Incorrect current password.");
            } else {
                setPasswordError("Failed to update password. Please try again.");
            }
        } finally {
            setIsPasswordLoading(false);
        }
    };

    const handleUpdateEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        setEmailError('');
        setEmailSuccess('');
        setIsEmailLoading(true);

        if (!newEmail || !newEmail.includes('@')) {
            setEmailError("Please enter a valid email address.");
            setIsEmailLoading(false);
            return;
        }

        // Changing email usually requires re-authentication, but we don't have a password input here specifically for it.
        // Good UX: Ask for password inside this flow or assume recent login. 
        // For security, Firebase forces re-auth. We'll use the 'currentPassword' state if available, or prompt.
        // Simplified approach: Add a dedicated password field for email change or reuse the prompt.
        // Let's assume we need to prompt or fail if recent login expired.

        // For this MVP implementation, we will try to update. If it fails due to requires-recent-login, we tell user to re-login.
        try {
            await updateEmail(user, newEmail);
            setEmailSuccess("Email updated! Please verify your new address.");
            setNewEmail('');
        } catch (err: any) {
            console.error(err);
            if (err.code === 'auth/requires-recent-login') {
                setEmailError("For security, please logout and login again before changing your email.");
            } else if (err.code === 'auth/email-already-in-use') {
                setEmailError("This email is already in use by another account.");
            } else {
                setEmailError("Failed to update email.");
            }
        } finally {
            setIsEmailLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* Password Change Section */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                        <Lock className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Change Password</h3>
                        <p className="text-sm text-gray-500">Ensure your account is secure with a strong password.</p>
                    </div>
                </div>

                {passwordError && (
                    <div className="mb-4 bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" /> {passwordError}
                    </div>
                )}
                {passwordSuccess && (
                    <div className="mb-4 bg-green-50 text-green-600 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" /> {passwordSuccess}
                    </div>
                )}

                <form onSubmit={handleChangePassword} className="space-y-4 max-w-lg">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                        <input
                            type="password"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                            <input
                                type="password"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                            <input
                                type="password"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={isPasswordLoading}
                        className="mt-2 flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-xl font-medium transition-all disabled:opacity-50"
                    >
                        {isPasswordLoading ? 'Updating...' : <><Save className="h-4 w-4" /> Update Password</>}
                    </button>
                </form>
            </div>

            {/* Email Change Section */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
                    <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                        <Mail className="h-6 w-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Update Email Address</h3>
                        <p className="text-sm text-gray-500">Update the email address associated with your account.</p>
                    </div>
                </div>

                <div className="mb-6 p-4 bg-blue-50 text-blue-800 rounded-xl text-sm">
                    <strong>Current Email:</strong> {user.email}
                </div>

                {emailError && (
                    <div className="mb-4 bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" /> {emailError}
                    </div>
                )}
                {emailSuccess && (
                    <div className="mb-4 bg-green-50 text-green-600 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" /> {emailSuccess}
                    </div>
                )}

                <form onSubmit={handleUpdateEmail} className="space-y-4 max-w-lg">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">New Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            placeholder="new.email@example.com"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isEmailLoading}
                        className="mt-2 flex items-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-xl font-medium transition-all disabled:opacity-50"
                    >
                        {isEmailLoading ? 'Updating...' : 'Update Email'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SecuritySettings;
