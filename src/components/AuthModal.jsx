// AuthModal Component - Login/Signup Modal with Google OAuth
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthModal = () => {
    const navigate = useNavigate();
    const intendedRoute = sessionStorage.getItem('intendedRoute');
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
                    {intendedRoute && (
                        <div className="mb-4 py-3 px-2 bg-blue-50 border border-blue-200 rounded-lg max-w-xs mx-auto">
                            <p className="text-xs text-blue-800 font-medium">
                                Login to see the portfolio
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
                            <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                                <path d="M12.0003 20.45c4.6593 0 8.361-3.8687 8.1691-8.5884H12.0003v-3.3275h11.4593C23.5714 8.9712 23.6364 9.4705 23.6364 10c0 6.6274-5.3726 12-12 12-6.6274 0-12-5.3726-12-12s5.3726-12 12-12c3.0587 0 5.8422 1.1539 7.962 3.039l-2.4545 2.4545C15.6558 4.2952 13.9113 3.4545 12.0003 3.4545c-4.6644 0-8.5455 3.7317-8.5455 8.5455 0 4.8137 3.881 8.5455 8.5455 8.5455z" fill="currentColor" opacity="0.5" />
                                <path d="M11.963 20.45V17.0682C10.6384 16.9238 9.3879 16.4251 8.3541 15.642L6.1627 17.558C8.5028 19.5394 11.2334 20.5516 11.963 20.45z" fill="#34A853" />
                                <path d="M4.606 14.5097C4.1678 13.0645 4.1678 11.4808 4.606 10.0356L2.3412 8.1883C1.0487 11.0256 1.0487 14.2464 2.3412 17.0837L4.606 14.5097z" fill="#FBBC05" />
                                <path d="M11.963 3.45455c-1.8906 0-3.6163.7431-4.8973 1.9405L4.54545 2.9405C6.5273 1.10325 9.1764 0 11.963 0c3.9575 0 7.3789 2.0628 9.2595 5.1764L18.991 7.63295C17.6596 5.1953 15.0219 3.45455 11.963 3.45455z" fill="#EA4335" />
                                <path d="M23.2373 10c0-.6231-.0594-1.2299-.1689-1.8173H11.963v3.6346h6.4631c-.3286 1.5878-1.2505 2.9698-2.5204 3.9056l2.3087 2.007C21.731 15.2863 23.2373 12.8711 23.2373 10z" fill="#4285F4" />
                            </svg>
                            <span className="text-sm font-semibold leading-6">Continue with Google</span>
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
