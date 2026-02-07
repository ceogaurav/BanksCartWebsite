import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, // Imported for signup
    signInWithPopup, 
    GoogleAuthProvider, 
    sendPasswordResetEmail,
    updateProfile 
} from 'firebase/auth';
import { auth } from '../../config/firebase';
import { X, Mail, Lock, ArrowLeft, User as UserIcon } from 'lucide-react';

const LoginModal: React.FC = () => {
    const { isLoginModalOpen, closeLoginModal } = useAuth();
    // Added 'signup' to the view state type
    const [view, setView] = useState<'login' | 'signup' | 'forgotPassword'>('login');
    
    const [fullName, setFullName] = useState(''); // State for new user name
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isLoginModalOpen) return null;

    const toggleView = (newView: 'login' | 'signup' | 'forgotPassword') => {
        setView(newView);
        setError('');
        setSuccessMessage('');
    };

    // --- Login Handler ---
    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            closeLoginModal();
        } catch (err: any) {
            setError('Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    // --- Signup Handler (New) ---
    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            // 1. Create User
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            // 2. Update Display Name if provided
            if (fullName && userCredential.user) {
                await updateProfile(userCredential.user, {
                    displayName: fullName
                });
            }
            
            closeLoginModal();
        } catch (err: any) {
            console.error(err);
            if (err.code === 'auth/email-already-in-use') {
                setError('This email is already registered. Please login.');
            } else if (err.code === 'auth/weak-password') {
                setError('Password should be at least 6 characters.');
            } else {
                setError('Failed to create account. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    // --- Google Handler (Used for both Login and Signup) ---
    const handleGoogleLogin = async () => {
        setError('');
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            closeLoginModal();
        } catch (err: any) {
            setError('Failed to sign in with Google');
        }
    };

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');
        setLoading(true);

        if (!email) {
            setError("Please enter your email address.");
            setLoading(false);
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            setSuccessMessage("Password reset email sent! Please check your inbox.");
        } catch (err: any) {
            if (err.code === 'auth/user-not-found') {
                setError('No account found with this email.');
            } else {
                setError('Failed to send reset email. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={closeLoginModal}></div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md w-full">
                    <div className="absolute top-4 right-4">
                        <button onClick={closeLoginModal} className="text-gray-400 hover:text-gray-500">
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="px-8 py-8">
                        {/* ================= LOGIN VIEW ================= */}
                        {view === 'login' && (
                            <>
                                <div className="text-center mb-8">
                                    <h3 className="text-2xl font-bold text-gray-900">Login to your account</h3>
                                    <p className="mt-2 text-sm text-gray-600">Access your personalized dashboard</p>
                                </div>

                                {error && (
                                    <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                                        {error}
                                    </div>
                                )}

                                <button
                                    onClick={handleGoogleLogin}
                                    className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-700 font-medium hover:bg-gray-50 transition-all"
                                >
                                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="h-5 w-5" />
                                    Continue with Google
                                </button>

                                <div className="relative my-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-500">or continue with email</span>
                                    </div>
                                </div>

                                <form onSubmit={handleEmailLogin} className="space-y-4">
                                    <div>
                                        <label className="sr-only">Email address</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Mail className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="email"
                                                required
                                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                                                placeholder="Email address"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="sr-only">Password</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Lock className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="password"
                                                required
                                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                        <div className="flex justify-end mt-1">
                                            <button
                                                type="button"
                                                onClick={() => toggleView('forgotPassword')}
                                                className="text-sm font-medium text-blue-600 hover:text-blue-500 hover:underline"
                                            >
                                                Forgot Password?
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
                                    >
                                        {loading ? 'Signing in...' : 'Sign In'}
                                    </button>
                                </form>

                                {/* SIGNUP TOGGLE */}
                                <div className="mt-6 text-center text-sm">
                                    <span className="text-gray-600">New User? </span>
                                    <button
                                        onClick={() => toggleView('signup')}
                                        className="font-bold text-blue-600 hover:text-blue-500 hover:underline"
                                    >
                                        For signup click here
                                    </button>
                                </div>
                            </>
                        )}

                        {/* ================= SIGNUP VIEW ================= */}
                        {view === 'signup' && (
                            <>
                                <div className="text-center mb-8 relative">
                                    <button onClick={() => toggleView('login')} className="absolute left-0 top-1 text-gray-400 hover:text-gray-600">
                                        <ArrowLeft className="h-6 w-6" />
                                    </button>
                                    <h3 className="text-2xl font-bold text-gray-900">Create Account</h3>
                                    <p className="mt-2 text-sm text-gray-600">Join us to start your journey</p>
                                </div>

                                {error && (
                                    <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                                        {error}
                                    </div>
                                )}

                                <button
                                    onClick={handleGoogleLogin}
                                    className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white text-gray-700 font-medium hover:bg-gray-50 transition-all"
                                >
                                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="h-5 w-5" />
                                    Continue with Google
                                </button>

                                <div className="relative my-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-200"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-500">or sign up with email</span>
                                    </div>
                                </div>

                                <form onSubmit={handleSignup} className="space-y-4">
                                    <div>
                                        <label className="sr-only">Full Name</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <UserIcon className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="text"
                                                required
                                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                                                placeholder="Full Name"
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="sr-only">Email address</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Mail className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="email"
                                                required
                                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                                                placeholder="Email address"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="sr-only">Password</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Lock className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="password"
                                                required
                                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                                                placeholder="Password (min 6 chars)"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
                                    >
                                        {loading ? 'Creating Account...' : 'Sign Up'}
                                    </button>
                                </form>
                                <div className="mt-6 text-center text-sm">
                                    <span className="text-gray-600">Already have an account? </span>
                                    <button
                                        onClick={() => toggleView('login')}
                                        className="font-bold text-blue-600 hover:text-blue-500 hover:underline"
                                    >
                                        Login here
                                    </button>
                                </div>
                            </>
                        )}

                        {/* ================= FORGOT PASSWORD VIEW ================= */}
                        {view === 'forgotPassword' && (
                            <>
                                <div className="text-center mb-8 relative">
                                    <button
                                        onClick={() => toggleView('login')}
                                        className="absolute left-0 top-1 text-gray-400 hover:text-gray-600"
                                    >
                                        <ArrowLeft className="h-6 w-6" />
                                    </button>
                                    <h3 className="text-2xl font-bold text-gray-900">Reset Password</h3>
                                    <p className="mt-2 text-sm text-gray-600">Enter your email to receive a reset link</p>
                                </div>

                                {error && (
                                    <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                                        {error}
                                    </div>
                                )}
                                {successMessage && (
                                    <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                                        {successMessage}
                                    </div>
                                )}

                                <form onSubmit={handleForgotPassword} className="space-y-6">
                                    <div>
                                        <label className="sr-only">Email address</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Mail className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="email"
                                                required
                                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
                                                placeholder="Email address"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading || !!successMessage}
                                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
                                    >
                                        {loading ? 'Sending...' : 'Send Reset Link'}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => toggleView('login')}
                                        className="w-full text-center text-sm font-medium text-gray-500 hover:text-gray-900"
                                    >
                                        Back to Login
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
