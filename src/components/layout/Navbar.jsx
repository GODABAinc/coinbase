import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiSearch, FiGlobe, FiMenu, FiX, FiChevronDown } from 'react-icons/fi';
import Button from '../common/Button';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const location = useLocation();
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
        setActiveDropdown(null);
    }, [location]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navItems = [
        {
            label: 'Cryptocurrencies',
            to: '/explore',
        },
        {
            label: 'Individuals',
            dropdown: [
                { label: 'Buy & Sell Crypto', desc: 'Trade Bitcoin, Ethereum, and more', to: '/explore' },
                { label: 'Earn Rewards', desc: 'Earn up to 12% APY on your crypto', to: '/' },
                { label: 'Card', desc: 'Spend crypto everywhere Visa is accepted', to: '/' },
                { label: 'Wallet', desc: 'The best self-custody crypto wallet', to: '/' },
            ],
        },
        {
            label: 'Businesses',
            dropdown: [
                { label: 'Prime', desc: 'Advanced trading and prime brokerage', to: '/' },
                { label: 'Commerce', desc: 'Accept crypto payments', to: '/' },
                { label: 'Asset Hub', desc: 'Tokenize and manage assets', to: '/' },
            ],
        },
        {
            label: 'Institutions',
            dropdown: [
                { label: 'Institutional', desc: 'Custody, trading, and financing', to: '/' },
                { label: 'Prime', desc: 'Advanced trading and prime brokerage', to: '/' },
                { label: 'Asset Management', desc: 'Digital asset management solutions', to: '/' },
            ],
        },
        {
            label: 'Developers',
            dropdown: [
                { label: 'Cloud', desc: 'Node infrastructure and APIs', to: '/' },
                { label: 'Base', desc: 'Ethereum L2 network', to: '/' },
                { label: 'Wallet SDK', desc: 'Build with smart wallets', to: '/' },
                { label: 'Rosetta', desc: 'Open-source blockchain integration', to: '/' },
            ],
        },
        {
            label: 'Company',
            dropdown: [
                { label: 'About', desc: 'Learn about Coinbase', to: '/' },
                { label: 'Careers', desc: 'Join our team', to: '/' },
                { label: 'Press', desc: 'News and media resources', to: '/' },
                { label: 'Blog', desc: 'Latest updates and insights', to: '/' },
                { label: 'Security', desc: 'How we protect your assets', to: '/' },
            ],
        },
    ];

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-cb-gray-100'
                    : 'bg-white border-b border-cb-gray-100'
                    }`}
            >
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Left: Logo + Nav */}
                        <div className="flex items-center gap-1 lg:gap-6" ref={dropdownRef}>
                            {/* Logo */}
                            <Link to="/" className="flex items-center shrink-0 mr-2 lg:mr-4">
                                <img
                                    src="/assets/coinbaseLogoNavigation-4.svg"
                                    alt="Coinbase"
                                    className="h-7 w-7"
                                />
                            </Link>

                            {/* Desktop Nav */}
                            <div className="hidden lg:flex items-center gap-0.5">
                                {navItems.map((item, index) => (
                                    <div key={index} className="relative">
                                        {item.to ? (
                                            <Link
                                                to={item.to}
                                                className={`px-3 py-2 text-[13px] font-semibold rounded-lg transition-colors duration-150
                          ${location.pathname === item.to ? 'text-cb-blue' : 'text-cb-dark hover:text-cb-blue hover:bg-cb-gray-50'}`}
                                            >
                                                {item.label}
                                            </Link>
                                        ) : (
                                            <button
                                                onClick={() => setActiveDropdown(activeDropdown === index ? null : index)}
                                                className={`flex items-center gap-1 px-3 py-2 text-[13px] font-semibold rounded-lg transition-colors duration-150 cursor-pointer
                          ${activeDropdown === index ? 'text-cb-blue bg-cb-blue-light' : 'text-cb-dark hover:text-cb-blue hover:bg-cb-gray-50'}`}
                                            >
                                                {item.label}
                                                <FiChevronDown
                                                    className={`w-3 h-3 transition-transform duration-200 ${activeDropdown === index ? 'rotate-180' : ''}`}
                                                />
                                            </button>
                                        )}

                                        {/* Dropdown Menu */}
                                        {item.dropdown && activeDropdown === index && (
                                            <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-xl border border-cb-gray-100 py-2 animate-slide-down z-50">
                                                {item.dropdown.map((subItem, subIndex) => (
                                                    <Link
                                                        key={subIndex}
                                                        to={subItem.to}
                                                        className="flex flex-col px-4 py-3 hover:bg-cb-gray-50 transition-colors"
                                                        onClick={() => setActiveDropdown(null)}
                                                    >
                                                        <span className="text-sm font-semibold text-cb-dark">{subItem.label}</span>
                                                        <span className="text-xs text-cb-gray-500 mt-0.5">{subItem.desc}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex items-center gap-2">
                            <button className="p-2 text-cb-gray-700 hover:text-cb-blue hover:bg-cb-gray-50 rounded-lg transition-colors hidden sm:flex items-center justify-center cursor-pointer">
                                <FiSearch className="w-5 h-5" />
                            </button>
                            <button className="p-2 text-cb-gray-700 hover:text-cb-blue hover:bg-cb-gray-50 rounded-lg transition-colors hidden sm:flex items-center justify-center cursor-pointer">
                                <FiGlobe className="w-5 h-5" />
                            </button>
                            <Link
                                to="/signin"
                                className="hidden sm:inline-flex text-[13px] font-semibold text-cb-dark hover:text-cb-blue transition-colors px-3 py-2"
                            >
                                Sign in
                            </Link>
                            <Button to="/signup" size="sm">
                                Sign up
                            </Button>

                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="lg:hidden p-2 text-cb-dark hover:text-cb-blue hover:bg-cb-gray-50 rounded-lg transition-colors cursor-pointer"
                            >
                                {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
            >
                <div className="absolute inset-0 bg-black/30" onClick={() => setMobileMenuOpen(false)} />
                <div
                    className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transition-transform duration-300 ease-out ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                >
                    <div className="pt-20 px-6 pb-6 overflow-y-auto h-full">
                        <div className="flex flex-col gap-1">
                            {navItems.map((item, index) => (
                                <div key={index}>
                                    {item.to ? (
                                        <Link
                                            to={item.to}
                                            className="block px-4 py-3 text-base font-semibold text-cb-dark hover:text-cb-blue hover:bg-cb-gray-50 rounded-xl transition-colors"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => setActiveDropdown(activeDropdown === `mobile-${index}` ? null : `mobile-${index}`)}
                                                className="flex items-center justify-between w-full px-4 py-3 text-base font-semibold text-cb-dark hover:text-cb-blue hover:bg-cb-gray-50 rounded-xl transition-colors cursor-pointer"
                                            >
                                                {item.label}
                                                <FiChevronDown
                                                    className={`w-4 h-4 transition-transform ${activeDropdown === `mobile-${index}` ? 'rotate-180' : ''}`}
                                                />
                                            </button>
                                            {activeDropdown === `mobile-${index}` && (
                                                <div className="ml-4 mb-2">
                                                    {item.dropdown.map((subItem, subIndex) => (
                                                        <Link
                                                            key={subIndex}
                                                            to={subItem.to}
                                                            className="block px-4 py-2.5 text-sm text-cb-gray-700 hover:text-cb-blue hover:bg-cb-gray-50 rounded-lg transition-colors"
                                                            onClick={() => setMobileMenuOpen(false)}
                                                        >
                                                            {subItem.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 pt-6 border-t border-cb-gray-100 flex flex-col gap-3">
                            <Button to="/signin" variant="outline" fullWidth onClick={() => setMobileMenuOpen(false)}>
                                Sign in
                            </Button>
                            <Button to="/signup" fullWidth onClick={() => setMobileMenuOpen(false)}>
                                Sign up
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Spacer for fixed navbar */}
            <div className="h-16" />
        </>
    );
};

export default Navbar;