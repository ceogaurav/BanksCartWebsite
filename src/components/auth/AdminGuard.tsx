import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface AdminGuardProps {
    children: React.ReactNode;
}

const AdminGuard: React.FC<AdminGuardProps> = ({ children }) => {
    const { currentUser, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    // ALLOWED ADMIN EMAILS
    const ALLOWED_ADMINS = [
        'gaurav.kumar@helpcallservices.com',
        'venkat@helpcallservices.com'
    ];

    if (!currentUser || !currentUser.email || !ALLOWED_ADMINS.includes(currentUser.email)) {
        // Option: Redirect to home or show Access Denied page
        return <Navigate to="/" />;
    }

    return <>{children}</>;
};

export default AdminGuard;
