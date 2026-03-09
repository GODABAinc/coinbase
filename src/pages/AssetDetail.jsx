import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import { cryptoAssets, formatPrice, formatNumber } from '../data/cryptoData';
import { FiArrowLeft, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

const AssetDetail = () => {
    const { id } = useParams();
    const asset = cryptoAssets.find((a) => a.id === id);

    if (!asset) {
        return (
            <div className="min-h-screen bg-white">
                <Navbar />
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <h1 className="text-3xl font-bold text-cb-dark mb-4">Asset not found</h1>
                    <p className="text-cb-gray-500 mb-8">The cryptocurrency you're looking for doesn't exist.</p>
                    <Button to="/explore">Browse all assets</Button>
                </div>
                <Footer />
            </div>
        );
    }

    const isPositive = asset.change24h >= 0;

    // Generate a larger price chart SVG
    const generateChart = () => {
        const width = 600;
        const height = 200;
        const points = [];
        const numPoints = 60;

        let y = height / 2;
        const pointsArray = [];

        for (let i = 0; i < numPoints; i++) {
            const randomDelta = (Math.random() - 0.5) * 15;
            const trendDelta = isPositive ? -0.8 : 0.8;
            y = Math.max(20, Math.min(height - 20, y + randomDelta + trendDelta));
            const x = (i / (numPoints - 1)) * width;
            pointsArray.push({ x, y });
            points.push(`${x},${y}`);
        }

        // Create gradient area
        const areaPoints = `0,${height} ${points.join(' ')} ${width},${height}`;

        return (
            <svg width="100%" viewBox={`0 0 ${width} ${height}`} className="w-full">
                <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor={isPositive ? '#05B169' : '#DF3347'} stopOpacity="0.2" />
                        <stop offset="100%" stopColor={isPositive ? '#05B169' : '#DF3347'} stopOpacity="0" />
                    </linearGradient>
                </defs>
                <polygon points={areaPoints} fill="url(#chartGradient)" />
                <polyline
                    points={points.join(' ')}
                    fill="none"
                    stroke={isPositive ? '#05B169' : '#DF3347'}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        );
    };

    const stats = [
        { label: 'Market Cap', value: formatNumber(asset.marketCap) },
        { label: '24h Volume', value: formatNumber(asset.volume24h) },
        { label: 'Circulating Supply', value: asset.supply },
        { label: '24h Change', value: `${isPositive ? '+' : ''}${asset.change24h.toFixed(2)}%`, isChange: true },
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Back Link */}
                <Link
                    to="/explore"
                    className="inline-flex items-center gap-2 text-sm text-cb-gray-500 hover:text-cb-blue transition-colors mb-6"
                >
                    <FiArrowLeft className="w-4 h-4" />
                    Back to explore
                </Link>

                {/* Asset Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8 animate-fade-in-up">
                    <div
                        className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold"
                        style={{ backgroundColor: asset.color }}
                    >
                        {asset.symbol.charAt(0)}
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-cb-dark">
                                {asset.name}
                            </h1>
                            <span className="px-2.5 py-1 bg-cb-gray-100 rounded-md text-sm font-semibold text-cb-gray-500">
                                {asset.symbol}
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-2xl sm:text-3xl font-bold text-cb-dark">
                                {formatPrice(asset.price)}
                            </span>
                            <span className={`flex items-center gap-1 text-lg font-semibold ${isPositive ? 'text-cb-green' : 'text-cb-red'}`}>
                                {isPositive ? <FiTrendingUp className="w-5 h-5" /> : <FiTrendingDown className="w-5 h-5" />}
                                {isPositive ? '+' : ''}{asset.change24h.toFixed(2)}%
                            </span>
                        </div>
                    </div>
                    <Button to="/signup" size="lg" className="mt-4 sm:mt-0">
                        Buy {asset.symbol}
                    </Button>
                </div>

                {/* Chart + Info */}
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                    {/* Chart */}
                    <div className="flex-1">
                        <div className="bg-cb-gray-50 rounded-2xl p-6 border border-cb-gray-100 mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
                            <div className="flex items-center gap-3 mb-6">
                                {['1H', '1D', '1W', '1M', '1Y', 'All'].map((period, i) => (
                                    <button
                                        key={period}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${i === 2 ? 'bg-cb-blue text-white' : 'text-cb-gray-500 hover:bg-cb-gray-100'
                                            }`}
                                    >
                                        {period}
                                    </button>
                                ))}
                            </div>
                            {generateChart()}
                        </div>

                        {/* About */}
                        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                            <h2 className="text-xl font-bold text-cb-dark mb-4">About {asset.name}</h2>
                            <p className="text-cb-gray-500 leading-relaxed mb-6">{asset.about}</p>
                        </div>
                    </div>

                    {/* Stats Sidebar */}
                    <div className="lg:w-80">
                        <div className="bg-cb-gray-50 rounded-2xl p-6 border border-cb-gray-100 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                            <h3 className="text-lg font-bold text-cb-dark mb-4">{asset.symbol} Statistics</h3>
                            <div className="space-y-4">
                                {stats.map((stat, index) => (
                                    <div key={index} className="flex items-center justify-between py-3 border-b border-cb-gray-100 last:border-b-0">
                                        <span className="text-sm text-cb-gray-500">{stat.label}</span>
                                        <span className={`text-sm font-semibold ${stat.isChange ? (isPositive ? 'text-cb-green' : 'text-cb-red') : 'text-cb-dark'
                                            }`}>
                                            {stat.value}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Buy CTA Card */}
                        <div className="mt-6 bg-cb-blue rounded-2xl p-6 text-white animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
                            <h3 className="text-lg font-bold mb-2">Start trading {asset.name}</h3>
                            <p className="text-blue-100 text-sm mb-4">
                                Buy, sell, and trade {asset.symbol} on Coinbase with zero fees.
                            </p>
                            <Button to="/signup" variant="white" fullWidth>
                                Get started
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AssetDetail;
