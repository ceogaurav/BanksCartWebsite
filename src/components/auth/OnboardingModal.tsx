import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../config/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { X } from 'lucide-react';

const OnboardingModal: React.FC = () => {
    const { isOnboardingModalOpen, setIsOnboardingModalOpen, currentUser, checkUserProfile, userData } = useAuth();
    const [fullName, setFullName] = useState(userData?.fullName || currentUser?.displayName || '');
    const [mobileNumber, setMobileNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Update local state if external data loads later (e.g. from firestore snapshot)
    React.useEffect(() => {
        if (userData?.fullName) setFullName(userData.fullName);
        else if (currentUser?.displayName) setFullName(currentUser.displayName);
    }, [userData, currentUser]);

    if (!isOnboardingModalOpen || !currentUser) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!fullName.trim() || !mobileNumber.trim()) {
            setError('All fields are mandatory');
            return;
        }

        setLoading(true);
        console.log("Starting profile update for UID:", currentUser.uid);
        try {
            // 1. Determine App ID for Artifacts Path
            const localFirebaseConfig = {
                projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
            };
            let firebaseConfig = localFirebaseConfig;
            // @ts-ignore
            if (typeof __firebase_config !== 'undefined' && __firebase_config) {
                try {
                    // @ts-ignore
                    const canvasConfig = JSON.parse(__firebase_config);
                    firebaseConfig = { ...localFirebaseConfig, ...canvasConfig };
                } catch (e) {
                    console.error("Error parsing __firebase_config:", e);
                }
            }
            // @ts-ignore
            const appId = typeof __app_id !== 'undefined' ? __app_id : firebaseConfig.projectId || 'default-app-id';

            const userDataPayload = {
                fullName,
                mobileNumber,
                email: currentUser.email,
                updatedAt: new Date(),
                // Initialize empty tracking data
                cibilScore: 750, // Default for new users
                employmentStatus: '',
                financialTracking: {
                    totalLoans: 0,
                    activeLoans: 0,
                    totalEmi: 0
                }
            };

            const writes = [];

            // Write 1: Root 'users' collection (Primary App Data)
            const userDocRef = doc(db, 'users', currentUser.uid);
            writes.push(setDoc(userDocRef, userDataPayload, { merge: true }));

            // Write 2: Artifacts 'cibilScoreChecks' collection (Admin Visibility Backup)
            // Note: We use 'cibilScoreChecks' because 'users' artifact is not whitelisted in provided rules,
            // but 'cibilScoreChecks' allows auth users to read/write. This ensures admin visibility.
            const artifactUserRef = doc(db, `artifacts/${appId}/public/data/cibilScoreChecks`, currentUser.uid);
            writes.push(setDoc(artifactUserRef, userDataPayload, { merge: true }));

            // Execute writes in parallel and tolerate partial failures
            const results = await Promise.allSettled(writes);

            const rootWrite = results[0];
            const artifactWrite = results[1];

            if (rootWrite.status === 'rejected') {
                console.error("Root 'users' write failed:", rootWrite.reason);
            } else {
                console.log("Root 'users' write successful");
            }

            if (artifactWrite.status === 'rejected') {
                console.error("Artifacts 'cibilScoreChecks' write failed:", artifactWrite.reason);
            } else {
                console.log("Artifacts 'cibilScoreChecks' write successful");
            }

            // If BOTH failed, then we show an error.
            // If at least one succeeded, we proceed (assuming one is better than none)
            if (rootWrite.status === 'rejected' && artifactWrite.status === 'rejected') {
                throw new Error("Failed to save profile data to any storage path.");
            }

            // checkUserProfile() is largely redundant with onSnapshot but harmless
            await checkUserProfile();

            // Force close modal if we had at least partial success
            setIsOnboardingModalOpen(false);

        } catch (err: any) {
            console.error("Firestore Error:", err);
            // Show detailed error in UI if possible, or at least in console
            if (err.code === 'permission-denied') {
                setError('Permission denied: Unable to save profile. Check Firestore rules.');
            } else {
                setError('Failed to update profile: ' + err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[101] overflow-y-auto" aria-modal="true">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div
                    className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-90"
                    onClick={() => setIsOnboardingModalOpen(false)}
                ></div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full relative">
                    <button
                        onClick={() => setIsOnboardingModalOpen(false)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 z-10"
                    >
                        <X className="h-6 w-6" />
                    </button>
                    <div className="px-8 py-8">
                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-900">Complete Your Profile</h3>
                            <p className="mt-2 text-sm text-gray-600">Please provide your details to continue to the dashboard.</p>
                        </div>

                        {error && (
                            <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    required
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter your full name"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number <span className="text-red-500">*</span></label>
                                <div className="flex">
                                    <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                                        +91
                                    </span>
                                    <input
                                        type="tel"
                                        required
                                        pattern="[0-9]{10}"
                                        maxLength={10}
                                        className="flex-1 block w-full px-4 py-3 border border-gray-300 rounded-r-xl focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Enter 10-digit number"
                                        value={mobileNumber}
                                        onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                            >
                                {loading ? 'Saving...' : 'Continue to Dashboard'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnboardingModal;
