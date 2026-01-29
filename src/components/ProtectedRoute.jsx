import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
    const { user, loading, setShowAuthModal } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            // Save where user wanted to go
            console.log('Saving intended route:', location.pathname);
            sessionStorage.setItem('intendedRoute', location.pathname);
            setShowAuthModal(true);
        }
    }, [user, loading, setShowAuthModal, location]);

    // Redirect to intended route after login
    useEffect(() => {
        if (user) {
            const intendedRoute = sessionStorage.getItem('intendedRoute');
            if (intendedRoute && intendedRoute !== location.pathname) {
                sessionStorage.removeItem('intendedRoute');
                navigate(intendedRoute);
            }
        }
    }, [user, navigate, location]);

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
