import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { currentUser, loading, openLoginModal } = useAuth();
    const [hasOpenedLogin, setHasOpenedLogin] = React.useState(false);

    React.useEffect(() => {
        if (!loading && !currentUser && !hasOpenedLogin) {
            openLoginModal();
            setHasOpenedLogin(true);
        }
    }, [loading, currentUser, openLoginModal, hasOpenedLogin]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!currentUser) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
                <h2 className="text-2xl font-bold text-gray-800">Access Restricted</h2>
                <p className="text-gray-600">Please login to view your profile.</p>
                <button
                    onClick={openLoginModal}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Open Login
                </button>
            </div>
        );
    }

    return <>{children}</>;
};

export default ProtectedRoute;
