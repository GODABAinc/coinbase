import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';

const SignUp = () => {
    const navigate = useNavigate();
    const { register } = useAuth();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });
    const [agreed, setAgreed] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!agreed) {
            setError('You must agree to the User Agreement and Privacy Policy.');
            return;
        }

        setLoading(true);
        try {
            const fullName = `${formData.firstName} ${formData.lastName}`.trim();
            await register(fullName, formData.email, formData.password);
            navigate('/profile');
        } catch (err) {
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const getPasswordStrength = () => {
        const { password } = formData;
        if (!password) return { level: 0, label: '', color: '' };
        if (password.length < 6) return { level: 1, label: 'Weak', color: 'bg-cb-red' };
        if (password.length < 10) return { level: 2, label: 'Fair', color: 'bg-yellow-500' };
        if (password.length >= 10 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
            return { level: 3, label: 'Strong', color: 'bg-cb-green' };
        }
        return { level: 2, label: 'Fair', color: 'bg-yellow-500' };
    };

    const strength = getPasswordStrength();

    return (
        <div className="min-h-screen bg-cb-gray-50 flex flex-col">
            <nav className="bg-white border-b border-cb-gray-100 px-6 py-4">
                <div className="max-w-[1400px] mx-auto flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2">
                        <img src="/assets/coinbaseLogoNavigation-4.svg" alt="Coinbase" className="h-7 w-7" />
                        <span className="text-lg font-bold text-cb-dark hidden sm:block">Coinbase</span>
                    </Link>
                    <Link to="/signin" className="text-sm font-semibold text-cb-blue hover:text-cb-blue-hover transition-colors">
                        Sign in →
                    </Link>
                </div>
            </nav>

            <div className="flex-1 flex items-center justify-center py-12 px-4">
                <div className="w-full max-w-md animate-fade-in-up">
                    <div className="bg-white rounded-2xl shadow-lg border border-cb-gray-100 p-8 sm:p-10">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-cb-dark text-center mb-2">
                            Create your account
                        </h1>
                        <p className="text-cb-gray-500 text-center mb-8 text-sm">
                            Already have an account?{' '}
                            <Link to="/signin" className="text-cb-blue font-semibold hover:text-cb-blue-hover transition-colors">
                                Sign in
                            </Link>
                        </p>

                        {error && (
                            <div className="mb-5 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-semibold text-cb-dark mb-2">First name</label>
                                    <input id="firstName" name="firstName" type="text" value={formData.firstName} onChange={handleChange} placeholder="John" className="w-full px-4 py-3 border-2 border-cb-gray-100 rounded-xl text-sm focus:outline-none focus:border-cb-blue transition-colors bg-white text-cb-dark placeholder-cb-gray-300" required />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-semibold text-cb-dark mb-2">Last name</label>
                                    <input id="lastName" name="lastName" type="text" value={formData.lastName} onChange={handleChange} placeholder="Doe" className="w-full px-4 py-3 border-2 border-cb-gray-100 rounded-xl text-sm focus:outline-none focus:border-cb-blue transition-colors bg-white text-cb-dark placeholder-cb-gray-300" required />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="signup-email" className="block text-sm font-semibold text-cb-dark mb-2">Email address</label>
                                <input id="signup-email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className="w-full px-4 py-3 border-2 border-cb-gray-100 rounded-xl text-sm focus:outline-none focus:border-cb-blue transition-colors bg-white text-cb-dark placeholder-cb-gray-300" required />
                            </div>

                            <div>
                                <label htmlFor="signup-password" className="block text-sm font-semibold text-cb-dark mb-2">Password</label>
                                <div className="relative">
                                    <input id="signup-password" name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} placeholder="Create a strong password" className="w-full px-4 py-3 border-2 border-cb-gray-100 rounded-xl text-sm focus:outline-none focus:border-cb-blue transition-colors bg-white text-cb-dark placeholder-cb-gray-300 pr-12" required minLength={6} />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-cb-gray-500 hover:text-cb-dark font-semibold cursor-pointer">
                                        {showPassword ? 'Hide' : 'Show'}
                                    </button>
                                </div>

                                {formData.password && (
                                    <div className="mt-3">
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 h-1.5 bg-cb-gray-100 rounded-full overflow-hidden">
                                                <div className={`h-full ${strength.color} rounded-full transition-all duration-300`} style={{ width: `${(strength.level / 3) * 100}%` }} />
                                            </div>
                                            <span className={`text-xs font-semibold ${strength.level === 1 ? 'text-cb-red' : strength.level === 2 ? 'text-yellow-500' : 'text-cb-green'}`}>
                                                {strength.label}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-start gap-3">
                                <input id="terms" type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1 w-4 h-4 rounded border-cb-gray-300 text-cb-blue focus:ring-cb-blue cursor-pointer" required />
                                <label htmlFor="terms" className="text-xs text-cb-gray-500 leading-relaxed cursor-pointer">
                                    I certify that I am 18 years of age or older, and I agree to the{' '}
                                    <a href="/" className="text-cb-blue hover:underline">User Agreement</a> and{' '}
                                    <a href="/" className="text-cb-blue hover:underline">Privacy Policy</a>.
                                </label>
                            </div>

                            <Button type="submit" fullWidth size="lg" disabled={loading} className={!agreed || loading ? 'opacity-50 cursor-not-allowed' : ''}>
                                {loading ? 'Creating account...' : 'Create free account'}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
