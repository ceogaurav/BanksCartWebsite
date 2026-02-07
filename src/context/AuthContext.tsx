import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

interface AuthContextType {
    currentUser: User | null;
    loading: boolean;
    userParams: {
        isAuthenticated: boolean;
        isProfileComplete: boolean;
    };
    userData: any; // Expose full user data
    isLoginModalOpen: boolean;
    openLoginModal: () => void;
    closeLoginModal: () => void;
    isOnboardingModalOpen: boolean;
    setIsOnboardingModalOpen: (isOpen: boolean) => void;
    checkUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);
    const [isProfileComplete, setIsProfileComplete] = useState(false);
    const [userData, setUserData] = useState<any>(null); // State for user data

    const checkUserProfile = async (user: User) => {
        try {
            const docRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setUserData(data); // Save data to state
                if (data.fullName && data.mobileNumber) {
                    setIsProfileComplete(true);
                    setIsOnboardingModalOpen(false);
                } else {
                    setIsProfileComplete(false);
                    setIsOnboardingModalOpen(true);
                }
            } else {
                setUserData(null);
                setIsProfileComplete(false);
                setIsOnboardingModalOpen(true);
            }
        } catch (error) {
            console.error("Error checking user profile:", error);
        }
    };

    useEffect(() => {
        let unsubscribeUserDoc: (() => void) | null = null;

        const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);

            // Clean up previous listener if any
            if (unsubscribeUserDoc) {
                unsubscribeUserDoc();
                unsubscribeUserDoc = null;
            }

            if (user) {
                const docRef = doc(db, 'users', user.uid);

                // Check and Create User Doc if missing (First Login)
                getDoc(docRef).then(async (snapshot) => {
                    if (!snapshot.exists()) {
                        console.log("User doc missing, creating initial profile...");

                        // Determine App ID for Artifacts Path (Duplicated logic for safety in Context)
                        const localFirebaseConfig = { projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID };
                        let firebaseConfig = localFirebaseConfig;
                        // @ts-ignore
                        if (typeof __firebase_config !== 'undefined' && __firebase_config) {
                            try {
                                // @ts-ignore
                                const canvasConfig = JSON.parse(__firebase_config);
                                firebaseConfig = { ...localFirebaseConfig, ...canvasConfig };
                            } catch (e) { console.error(e); }
                        }
                        // @ts-ignore
                        const appId = typeof __app_id !== 'undefined' ? __app_id : firebaseConfig.projectId || 'default-app-id';

                        const initialData = {
                            fullName: user.displayName || '',
                            email: user.email || '',
                            mobileNumber: '',
                            createdAt: new Date(),
                            photoURL: user.photoURL || '',
                            cibilScore: 750, // Default
                        };

                        const writes = [];
                        writes.push(setDoc(doc(db, 'users', user.uid), initialData, { merge: true }));
                        writes.push(setDoc(doc(db, `artifacts/${appId}/public/data/cibilScoreChecks`, user.uid), initialData, { merge: true }));

                        await Promise.allSettled(writes);
                        console.log("Initial profile creation attempted.");
                    }
                });

                // Real-time listener for user profile
                unsubscribeUserDoc = onSnapshot(docRef, (docSnap) => {
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setUserData(data);

                        // Strict check: if mobile missing, FORCE onboarding
                        if (data.fullName && data.mobileNumber) {
                            setIsProfileComplete(true);
                            setIsOnboardingModalOpen(false);
                        } else {
                            setIsProfileComplete(false);
                            setIsOnboardingModalOpen(true);
                        }
                    } else {
                        // Doc doesn't exist yet (new user)
                        setUserData(null);
                        setIsProfileComplete(false);
                        setIsOnboardingModalOpen(true);
                    }
                }, (error) => {
                    console.error("AuthContext Snapshot Error:", error);
                });

                setIsLoginModalOpen(false);
            } else {
                setUserData(null);
                setIsProfileComplete(false);
            }
            setLoading(false);
        });

        return () => {
            unsubscribeAuth();
            if (unsubscribeUserDoc) unsubscribeUserDoc();
        };
    }, []);

    const value = {
        currentUser,
        loading,
        userParams: {
            isAuthenticated: !!currentUser,
            isProfileComplete
        },
        userData, // Expose in context
        isLoginModalOpen,
        openLoginModal: () => setIsLoginModalOpen(true),
        closeLoginModal: () => setIsLoginModalOpen(false),
        isOnboardingModalOpen,
        setIsOnboardingModalOpen,
        checkUserProfile: async () => {
            // Redundant now as logic is in onSnapshot, but keeping for compatibility if needed elsewhere
            // or could trigger a manual re-fetch if we weren't using snapshots
        }
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
