import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';

const SignIn = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate('/profile');
        } catch (err) {
            setError(err.message || 'Sign in failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-cb-gray-50 flex flex-col">
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

                        {error && (
                            <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-cb-dark mb-2">Email address</label>
                                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full px-4 py-3 border-2 border-cb-gray-100 rounded-xl text-sm focus:outline-none focus:border-cb-blue transition-colors bg-white text-cb-dark placeholder-cb-gray-300" required />
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label htmlFor="password" className="text-sm font-semibold text-cb-dark">Password</label>
                                </div>
                                <div className="relative">
                                    <input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="w-full px-4 py-3 border-2 border-cb-gray-100 rounded-xl text-sm focus:outline-none focus:border-cb-blue transition-colors bg-white text-cb-dark placeholder-cb-gray-300 pr-12" required />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-cb-gray-500 hover:text-cb-dark font-semibold cursor-pointer">
                                        {showPassword ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                            </div>

                            <Button type="submit" fullWidth size="lg" disabled={loading} className={loading ? 'opacity-50 cursor-not-allowed' : ''}>
                                {loading ? 'Signing in...' : 'Sign in'}
                            </Button>
                        </form>
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
