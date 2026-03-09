import React from 'react';
import { Link } from 'react-router-dom';
import { footerLinks } from '../../data/cryptoData';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { name: 'X (Twitter)', icon: '/assets/x-light.svg', href: 'https://twitter.com/coinbase' },
        { name: 'Instagram', icon: '/assets/instagram-light.svg', href: 'https://instagram.com/coinbase' },
        { name: 'LinkedIn', icon: '/assets/linkedin-light.svg', href: 'https://linkedin.com/company/coinbase' },
        { name: 'TikTok', icon: '/assets/tiktok-light.svg', href: 'https://tiktok.com/@coinbase' },
    ];

    const legalLinks = [
        { label: 'Privacy Policy', href: '/' },
        { label: 'Cookie Policy', href: '/' },
        { label: 'Terms of Service', href: '/' },
        { label: 'Licenses', href: '/' },
    ];

    const footerSections = [
        { title: 'Individual', links: footerLinks.individual },
        { title: 'Business', links: footerLinks.business },
        { title: 'Developers', links: footerLinks.developers },
        { title: 'Company', links: footerLinks.company },
        { title: 'Support', links: footerLinks.support },
    ];

    return (
        <footer className="bg-cb-dark text-white">
            {/* Main Footer */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
                {/* Logo */}
                <div className="mb-12">
                    <Link to="/" className="inline-flex items-center gap-3">
                        <img
                            src="/assets/coinbase_logo@2x.png"
                            alt="Coinbase"
                            className="h-6"
                        />
                        <span className="text-xl font-bold">Coinbase</span>
                    </Link>
                </div>

                {/* Footer Links Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
                    {footerSections.map((section, index) => (
                        <div key={index}>
                            <h3 className="text-sm font-bold text-cb-gray-300 uppercase tracking-wider mb-4">
                                {section.title}
                            </h3>
                            <ul className="space-y-3">
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <Link
                                            to={link.href}
                                            className="text-sm text-cb-gray-500 hover:text-white transition-colors duration-200"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className="border-t border-cb-gray-700 pt-8">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                        {/* Social Icons */}
                        <div className="flex items-center gap-4">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-cb-gray-700 hover:bg-cb-gray-500 flex items-center justify-center transition-colors duration-200"
                                    title={social.name}
                                >
                                    <img src={social.icon} alt={social.name} className="w-5 h-5 invert" />
                                </a>
                            ))}
                        </div>

                        {/* Legal Links */}
                        <div className="flex flex-wrap items-center gap-4 text-xs text-cb-gray-500">
                            <span>© {currentYear} Coinbase</span>
                            {legalLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    className="hover:text-white transition-colors duration-200"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="mt-8 pt-6 border-t border-cb-gray-700">
                    <p className="text-xs text-cb-gray-500 leading-relaxed max-w-4xl">
                        Coinbase, Inc. is licensed to engage in virtual currency business activity by the New York State Department of Financial Services.
                        Cryptocurrency is not insured by the FDIC or SIPC. Cryptocurrency is highly speculative and involves significant risk.
                        Past performance is not indicative of future results.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
