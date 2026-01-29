import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
    const { user, loading, setShowAuthModal } = useAuth();

    useEffect(() => {
        if (!loading && !user) {
            setShowAuthModal(true);
        }
    }, [user, loading, setShowAuthModal]);

    if (loading) {
        return <div className="flex h-screen items-center justify-center">Loading...</div>;
    }

    if (!user) {
        // Render content but blurred and pointer-events disabled
        // This allows the "background" to be visible behind the modal
        return (
            <div className="filter blur-md pointer-events-none select-none h-screen overflow-hidden relative">
                <div className="absolute inset-0 z-40 bg-white/30"></div>
                <Outlet />
            </div>
        );
    }

    return <Outlet />;
};

export default ProtectedRoute;
