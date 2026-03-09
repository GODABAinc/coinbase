import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { cryptoAssets, learnArticles, formatPrice } from '../data/cryptoData';

const Home = () => {
    const [email, setEmail] = useState('');
    const [activeTab, setActiveTab] = useState('tradable');

    // Scroll animation refs for each section
    const [exploreRef, exploreVisible] = useScrollAnimation();
    const [heroRef, heroVisible] = useScrollAnimation();
    const [coinbaseOneRef, coinbaseOneVisible] = useScrollAnimation();
    const [baseAppRef, baseAppVisible] = useScrollAnimation();
    const [advancedRef, advancedVisible] = useScrollAnimation();
    const [zeroFeesRef, zeroFeesVisible] = useScrollAnimation();
    const [learnRef, learnVisible] = useScrollAnimation();

    // Top 6 cryptos for the dark card
    const topCryptos = cryptoAssets.slice(0, 6);

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* ============================================ */}
            {/* SECTION 1: Explore Crypto (Dark Background) */}
            {/* ============================================ */}
            <section
                ref={exploreRef}
                className="bg-[#0A0B0D] text-white"
                style={{
                    opacity: exploreVisible ? 1 : 0,
                    transform: exploreVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
                }}
            >
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                        {/* Left: Text */}
                        <div className="flex-1 text-center lg:text-left">
                            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold leading-tight mb-6">
                                Explore crypto like Bitcoin, Ethereum, and Dogecoin.
                            </h1>
                            <p className="text-lg text-gray-400 mb-8 max-w-lg mx-auto lg:mx-0">
                                Simply and securely buy, sell, and manage hundreds of cryptocurrencies.
                            </p>
                            <Link
                                to="/explore"
                                className="inline-flex items-center justify-center px-6 py-3 bg-white text-black font-semibold rounded-full text-base hover:bg-gray-200 transition-colors"
                            >
                                See more assets
                            </Link>
                        </div>

                        {/* Right: Crypto Price Card */}
                        <div className="flex-1 max-w-md w-full">
                            <div className="bg-[#1E1F25] rounded-2xl overflow-hidden">
                                {/* Tabs */}
                                <div className="flex border-b border-gray-700">
                                    {['Tradable', 'Top gainers', 'New on Coinbase'].map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab.toLowerCase().replace(/ /g, '-'))}
                                            className={`flex-1 py-3 text-sm font-medium transition-colors cursor-pointer ${activeTab === tab.toLowerCase().replace(/ /g, '-')
                                                    ? 'text-white border-b-2 border-white'
                                                    : 'text-gray-500 hover:text-gray-300'
                                                }`}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>

                                {/* Crypto List */}
                                <div className="divide-y divide-gray-800">
                                    {topCryptos.map((crypto) => (
                                        <Link
                                            key={crypto.id}
                                            to={`/asset/${crypto.id}`}
                                            className="flex items-center justify-between px-5 py-4 hover:bg-[#2A2B32] transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                {crypto.icon ? (
                                                    <img
                                                        src={crypto.icon}
                                                        alt={crypto.name}
                                                        className="w-8 h-8 rounded-full"
                                                    />
                                                ) : (
                                                    <div
                                                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                                                        style={{ backgroundColor: crypto.color }}
                                                    >
                                                        {crypto.symbol[0]}
                                                    </div>
                                                )}
                                                <span className="text-white font-semibold text-base">
                                                    {crypto.name}
                                                </span>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-white font-medium text-sm">
                                                    {formatPrice(crypto.price)}
                                                </div>
                                                <div
                                                    className={`text-xs ${crypto.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                                                        }`}
                                                >
                                                    {crypto.change24h >= 0 ? '↗' : '↘'}{' '}
                                                    {Math.abs(crypto.change24h).toFixed(2)}%
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 2: Hero — Phone LEFT, Text RIGHT    */}
            {/* ============================================ */}
            <section
                ref={heroRef}
                className="bg-white"
                style={{
                    opacity: heroVisible ? 1 : 0,
                    transform: heroVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
                }}
            >
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                        {/* Left: Phone Mockup */}
                        <div className="flex-1 flex justify-center">
                            <div className="relative">
                                <div className="bg-gradient-to-br from-cb-blue to-blue-700 rounded-3xl p-8 lg:p-12">
                                    <img
                                        src="/assets/Hero__4_.png"
                                        alt="Coinbase App"
                                        className="w-72 lg:w-80 rounded-2xl shadow-2xl animate-float"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Right: Text + Email CTA */}
                        <div className="flex-1 text-center lg:text-left">
                            <h2 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold text-cb-dark leading-tight mb-6">
                                The future of finance is here.
                            </h2>
                            <p className="text-lg text-cb-gray-500 mb-8">
                                Trade crypto and more on a platform you can trust.
                            </p>

                            {/* Email + Sign Up */}
                            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto lg:mx-0">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="satoshi@nakamoto.com"
                                    className="flex-1 px-5 py-3 border border-cb-gray-300 rounded-full text-base focus:outline-none focus:ring-2 focus:ring-cb-blue focus:border-transparent"
                                />
                                <Button to="/signup" size="md" className="rounded-full px-8">
                                    Sign up
                                </Button>
                            </div>

                            <p className="text-xs text-red-500 mt-3 max-w-lg mx-auto lg:mx-0">
                                Stocks and prediction markets not available in your jurisdiction.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 3: Coinbase One Membership           */}
            {/* ============================================ */}
            <section
                ref={coinbaseOneRef}
                className="bg-cb-gray-50"
                style={{
                    opacity: coinbaseOneVisible ? 1 : 0,
                    transform: coinbaseOneVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
                }}
            >
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                        {/* Left: Text */}
                        <div className="flex-1 text-center lg:text-left">
                            <p className="text-sm text-cb-gray-500 mb-4 tracking-wide">Get more out of crypto with one membership:</p>
                            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold text-cb-dark leading-tight mb-6">
                                zero trading fees, boosted rewards, priority support, and more.
                            </h2>
                            <button className="inline-flex items-center justify-center px-6 py-3 bg-cb-dark text-white font-semibold rounded-full text-base hover:bg-gray-800 transition-colors">
                                Claim free trial
                            </button>
                        </div>

                        {/* Right: Phone Mockup */}
                        <div className="flex-1 flex justify-center">
                            <img
                                src="/assets/zero_fees_us.png"
                                alt="Coinbase One - Trade Successful"
                                className="w-72 lg:w-80 rounded-2xl shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 4: Base App                          */}
            {/* ============================================ */}
            <section
                ref={baseAppRef}
                className="bg-white"
                style={{
                    opacity: baseAppVisible ? 1 : 0,
                    transform: baseAppVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
                }}
            >
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                        {/* Left: Phone Mockup */}
                        <div className="flex-1 flex justify-center">
                            <img
                                src="/assets/CB_LOLP__1_.png"
                                alt="Base App"
                                className="w-72 lg:w-80 rounded-2xl shadow-lg"
                            />
                        </div>

                        {/* Right: Text */}
                        <div className="flex-1 text-center lg:text-left">
                            <div className="flex items-center gap-2 mb-4 justify-center lg:justify-start">
                                <span className="text-sm font-semibold text-cb-gray-500 tracking-wide">◇ BASE APP</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold text-cb-dark leading-tight mb-6">
                                Countless ways to earn crypto with the Base App.
                            </h2>
                            <p className="text-lg text-cb-gray-500 mb-8 max-w-lg mx-auto lg:mx-0">
                                An everything app to trade, create, discover, and chat, all in one place.
                            </p>
                            <button className="inline-flex items-center justify-center px-6 py-3 bg-cb-dark text-white font-semibold rounded-full text-base hover:bg-gray-800 transition-colors">
                                Learn more
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 5: Advanced Trading (Dark Background)*/}
            {/* ============================================ */}
            <section
                ref={advancedRef}
                className="bg-white"
                style={{
                    opacity: advancedVisible ? 1 : 0,
                    transform: advancedVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
                }}
            >
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                        {/* Left: Advanced Trading Screenshot */}
                        <div className="flex-1 flex justify-center">
                            <img
                                src="/assets/Advanced.png"
                                alt="Advanced Trading Tools"
                                className="w-full max-w-lg rounded-2xl shadow-lg"
                            />
                        </div>

                        {/* Right: Text */}
                        <div className="flex-1 text-center lg:text-left">
                            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold text-cb-dark leading-tight mb-6">
                                Powerful tools, designed for the advanced trader.
                            </h2>
                            <p className="text-lg text-cb-gray-500 mb-8 max-w-lg mx-auto lg:mx-0">
                                Powerful analytical tools with the safety and security of Coinbase deliver the ultimate trading experience. Tap into sophisticated charting capabilities, real-time order books, and deep liquidity across hundreds of markets.
                            </p>
                            <button className="inline-flex items-center justify-center px-6 py-3 bg-cb-dark text-white font-semibold rounded-full text-base hover:bg-gray-800 transition-colors">
                                Start trading
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 6: Coinbase One — Zero Fees          */}
            {/* ============================================ */}
            <section
                ref={zeroFeesRef}
                className="bg-cb-gray-50"
                style={{
                    opacity: zeroFeesVisible ? 1 : 0,
                    transform: zeroFeesVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
                }}
            >
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                        {/* Left: Text */}
                        <div className="flex-1 text-center lg:text-left">
                            <div className="flex items-center gap-2 mb-4 justify-center lg:justify-start">
                                <span className="text-sm font-semibold text-cb-gray-500 tracking-wide">◈ COINBASE ONE</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold text-cb-dark leading-tight mb-6">
                                Zero trading fees, more rewards.
                            </h2>
                            <p className="text-lg text-cb-gray-500 mb-8 max-w-lg mx-auto lg:mx-0">
                                Get more out of crypto with one membership: zero trading fees, boosted rewards, priority support, and more.
                            </p>
                            <button className="inline-flex items-center justify-center px-6 py-3 bg-cb-dark text-white font-semibold rounded-full text-base hover:bg-gray-800 transition-colors">
                                Claim free trial
                            </button>
                        </div>

                        {/* Right: Phone Mockup */}
                        <div className="flex-1 flex justify-center">
                            <img
                                src="/assets/zero_fees_us.png"
                                alt="Zero Trading Fees"
                                className="w-72 lg:w-80 rounded-2xl shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================ */}
            {/* SECTION 7: Learn Basics + Article Cards      */}
            {/* ============================================ */}
            <section
                ref={learnRef}
                className="bg-white"
                style={{
                    opacity: learnVisible ? 1 : 0,
                    transform: learnVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
                }}
            >
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
                    {/* Top: Heading and CTA side by side */}
                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16 mb-12">
                        <div className="flex-1">
                            <h2 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold text-cb-dark leading-tight">
                                New to crypto? Learn some crypto basics
                            </h2>
                        </div>
                        <div className="flex-1">
                            <p className="text-lg text-cb-gray-500 mb-6">
                                Beginner guides, practical tips, and market updates for first-timers, experienced investors, and everyone in between
                            </p>
                            <Link
                                to="/learn"
                                className="inline-flex items-center justify-center px-6 py-3 bg-cb-dark text-white font-semibold rounded-full text-base hover:bg-gray-800 transition-colors"
                            >
                                Read More
                            </Link>
                        </div>
                    </div>

                    {/* Article Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {learnArticles.slice(0, 3).map((article) => (
                            <Link
                                key={article.id}
                                to="/learn"
                                className="group block rounded-2xl overflow-hidden border border-cb-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="aspect-[4/3] overflow-hidden bg-cb-gray-50">
                                    <img
                                        src={article.image}
                                        alt={article.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-5">
                                    <h3 className="text-lg font-bold text-cb-dark mb-2 group-hover:text-cb-blue transition-colors">
                                        {article.title}
                                    </h3>
                                    <p className="text-sm text-cb-gray-500 line-clamp-3">
                                        {article.description}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;