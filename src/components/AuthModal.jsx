// AuthModal Component - Login/Signup Modal with Google OAuth
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthModal = () => {
    const navigate = useNavigate();
    const {
        showAuthModal,
        setShowAuthModal,
        authMode,
        setAuthMode,
        signIn,
        signUp,
        signInWithGoogle,
        user
    } = useAuth();

    // Read intendedRoute inside component to ensure it's fresh on re-renders
    const savedRoute = sessionStorage.getItem('intendedRoute');
    const isProtectedPortfolio = savedRoute && savedRoute.startsWith('/team/') && savedRoute !== '/team/thinley-dhendup';


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');

    // Close modal and redirect if user logs in
    useEffect(() => {
        if (user) {
            console.log('User logged in, checking for redirect...');
            setShowAuthModal(false);
            setLoading(false);

            // Redirect to intended route if exists
            const savedRoute = sessionStorage.getItem('intendedRoute');
            console.log('Saved route:', savedRoute);
            if (savedRoute) {
                console.log('Navigating to:', savedRoute);
                sessionStorage.removeItem('intendedRoute');
                navigate(savedRoute);
            }
        }
    }, [user, setShowAuthModal, navigate]);


    // Reset state when modal opens/closes or mode changes
    useEffect(() => {
        setError(null);
        setSuccessMsg('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    }, [showAuthModal, authMode]);

    if (!showAuthModal) return null;

    const handleGoogleLogin = async () => {
        try {
            setError(null);
            const { error } = await signInWithGoogle();
            if (error) throw error;
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (authMode === 'login') {
                const { error } = await signIn(email, password);
                if (error) throw error;
            } else {
                if (password !== confirmPassword) {
                    throw new Error("Passwords do not match");
                }
                const { error } = await signUp(email, password);
                if (error) throw error;
                setSuccessMsg("Registration successful! Please check your email to confirm.");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop with blur */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-md"
                onClick={() => setShowAuthModal(false)}
            ></div>

            {/* Modal Content */}
            <div className="relative z-10 w-full max-w-md bg-white p-6 sm:p-8 shadow-2xl rounded-3xl mx-4 animate-in fade-in zoom-in duration-300">
                <button
                    onClick={() => setShowAuthModal(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="text-center mb-6">
                    {savedRoute && (
                        <div className="mb-4 py-3 px-2 bg-blue-50 border border-blue-200 rounded-lg max-w-xs mx-auto">
                            <p className="text-xs text-blue-800 font-medium lowercase">
                                {isProtectedPortfolio ? 'login to see the portfolio' : 'login to continue'}
                            </p>
                        </div>
                    )}
                    <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-gray-900 font-['Montserrat']">
                        {authMode === 'login' ? 'Sign in to your account' : 'Create a new account'}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        {authMode === 'login' ? 'Or ' : 'Already have an account? '}
                        <button
                            onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                            className="font-medium text-black underline hover:text-gray-700"
                        >
                            {authMode === 'login' ? 'create a new account' : 'Sign in'}
                        </button>
                    </p>
                </div>

                {successMsg ? (
                    <div className="text-center">
                        <div className="text-green-600 mb-4">{successMsg}</div>
                        <button
                            onClick={() => setAuthMode('login')}
                            className="text-black underline font-semibold"
                        >
                            Go to Login
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4 sm:space-y-6">
                        {/* Google Button */}
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent transition-colors"
                        >
                            Continue with Google
                        </button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                <div className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-sm font-medium leading-6">
                                <span className="bg-white px-6 text-gray-900">Or continue with email</span>
                            </div>
                        </div>

                        <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="off"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 px-3 bg-gray-50"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="off"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 px-3 bg-gray-50"
                                    />
                                </div>
                            </div>

                            {authMode === 'signup' && (
                                <div>
                                    <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                                    <div className="mt-2">
                                        <input
                                            id="confirm-password"
                                            name="confirm-password"
                                            type="password"
                                            autoComplete="off"
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 px-3 bg-gray-50"
                                        />
                                    </div>
                                </div>
                            )}

                            {error && (
                                <div className="text-red-500 text-sm text-center">
                                    {error}
                                </div>
                            )}

                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex w-full justify-center bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:opacity-50 transition-colors"
                                >
                                    {loading ? 'Processing...' : (authMode === 'login' ? 'Sign in' : 'Sign up')}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuthModal;
