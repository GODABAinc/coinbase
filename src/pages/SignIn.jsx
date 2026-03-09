import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Button from '../components/common/Button';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock sign in - no actual auth
        alert('Sign in functionality is for demonstration purposes only.');
    };

    return (
        <div className="min-h-screen bg-cb-gray-50 flex flex-col">
            {/* Simple Nav */}
            <nav className="bg-white border-b border-cb-gray-100 px-6 py-4">
                <div className="max-w-[1400px] mx-auto flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2">
                        <img src="/assets/coinbaseLogoNavigation-4.svg" alt="Coinbase" className="h-7 w-7" />
                        <span className="text-lg font-bold text-cb-dark hidden sm:block">Coinbase</span>
                    </Link>
                    <Link to="/signup" className="text-sm font-semibold text-cb-blue hover:text-cb-blue-hover transition-colors">
                        Sign up →
                    </Link>
                </div>
            </nav>

            {/* Sign In Form */}
            <div className="flex-1 flex items-center justify-center py-12 px-4">
                <div className="w-full max-w-md animate-fade-in-up">
                    <div className="bg-white rounded-2xl shadow-lg border border-cb-gray-100 p-8 sm:p-10">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-cb-dark text-center mb-2">
                            Sign in to Coinbase
                        </h1>
                        <p className="text-cb-gray-500 text-center mb-8 text-sm">
                            Not a Coinbase user?{' '}
                            <Link to="/signup" className="text-cb-blue font-semibold hover:text-cb-blue-hover transition-colors">
                                Sign up
                            </Link>
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-cb-dark mb-2">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className="w-full px-4 py-3 border-2 border-cb-gray-100 rounded-xl text-sm focus:outline-none focus:border-cb-blue transition-colors bg-white text-cb-dark placeholder-cb-gray-300"
                                    required
                                />
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label htmlFor="password" className="text-sm font-semibold text-cb-dark">
                                        Password
                                    </label>
                                    <button
                                        type="button"
                                        className="text-xs text-cb-blue font-semibold hover:text-cb-blue-hover transition-colors cursor-pointer"
                                    >
                                        Forgot password?
                                    </button>
                                </div>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Enter your password"
                                        className="w-full px-4 py-3 border-2 border-cb-gray-100 rounded-xl text-sm focus:outline-none focus:border-cb-blue transition-colors bg-white text-cb-dark placeholder-cb-gray-300 pr-12"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-cb-gray-500 hover:text-cb-dark font-semibold cursor-pointer"
                                    >
                                        {showPassword ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                            </div>

                            <Button type="submit" fullWidth size="lg">
                                Sign in
                            </Button>
                        </form>

                        {/* Divider */}
                        <div className="flex items-center my-6">
                            <div className="flex-1 h-px bg-cb-gray-100" />
                            <span className="px-4 text-xs text-cb-gray-500 font-medium">or</span>
                            <div className="flex-1 h-px bg-cb-gray-100" />
                        </div>

                        {/* Social Buttons */}
                        <div className="space-y-3">
                            <button className="flex items-center justify-center gap-3 w-full py-3 px-4 border-2 border-cb-gray-100 rounded-xl text-sm font-semibold text-cb-dark hover:bg-cb-gray-50 transition-colors cursor-pointer">
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Continue with Google
                            </button>
                            <button className="flex items-center justify-center gap-3 w-full py-3 px-4 border-2 border-cb-gray-100 rounded-xl text-sm font-semibold text-cb-dark hover:bg-cb-gray-50 transition-colors cursor-pointer">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.18 0-.52-.02-.72-.07.12-.57.25-1.06.62-1.72.73-1.34 2.01-2.3 3.12-2.83.24-.12.49-.17.63-.03.02.01.04.02.06.02H16.365zM21.544 17.338c0 .12-.13.5-.53 1.12-.81 1.27-1.9 2.17-3.3 2.17-.63 0-1.13-.18-1.66-.39-.56-.22-1.17-.46-2.04-.46-.93 0-1.58.25-2.17.47-.48.18-.93.35-1.48.39-.19.01-.37.02-.56.02-1.8 0-3.46-1.85-4.72-3.66-1.38-1.98-2.5-5.15-2.5-8.07 0-4.59 2.96-7.04 5.88-7.04.89 0 1.67.29 2.4.56.54.2 1.05.39 1.5.39.36 0 .83-.17 1.37-.37.84-.31 1.84-.68 2.96-.68.53 0 2.54.08 3.84 1.96-.1.06-2.29 1.35-2.29 4.02 0 3.12 2.73 4.21 2.81 4.24-.02.07-.44 1.53-1.46 3.03z" />
                                </svg>
                                Continue with Apple
                            </button>
                        </div>
                    </div>

                    <p className="text-xs text-cb-gray-500 text-center mt-6 max-w-sm mx-auto">
                        By continuing, you agree to our{' '}
                        <a href="/" className="text-cb-blue hover:underline">User Agreement</a> and{' '}
                        <a href="/" className="text-cb-blue hover:underline">Privacy Policy</a>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
