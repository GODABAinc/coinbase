import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice, formatNumber } from '../../data/cryptoData';

/**
 * A single row in the crypto price table.
 * Displays rank, name, symbol, price, 24h change, and market cap.
 */
const CryptoRow = ({ asset, showMarketCap = true }) => {
    const isPositive = asset.change24h >= 0;

    // Generate a simple SVG sparkline
    const generateSparkline = () => {
        const points = [];
        const width = 100;
        const height = 32;
        const numPoints = 20;

        // Generate a somewhat random but trending line based on change
        let y = height / 2;
        for (let i = 0; i < numPoints; i++) {
            const randomDelta = (Math.random() - 0.5) * 8;
            const trendDelta = isPositive ? -0.5 : 0.5;
            y = Math.max(4, Math.min(height - 4, y + randomDelta + trendDelta));
            points.push(`${(i / (numPoints - 1)) * width},${y}`);
        }

        return (
            <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="inline-block">
                <polyline
                    points={points.join(' ')}
                    fill="none"
                    stroke={isPositive ? '#05B169' : '#DF3347'}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        );
    };

    return (
        <Link
            to={`/asset/${asset.id}`}
            className="flex items-center px-4 py-4 hover:bg-cb-gray-50 transition-colors duration-150 border-b border-cb-gray-100 last:border-b-0 group"
        >
            {/* Rank */}
            <span className="w-8 text-sm text-cb-gray-500 font-medium hidden sm:block">
                {asset.rank}
            </span>

            {/* Icon + Name */}
            <div className="flex items-center gap-3 flex-1 min-w-[140px]">
                <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                    style={{ backgroundColor: asset.color }}
                >
                    {asset.symbol.charAt(0)}
                </div>
                <div className="flex flex-col">
                    <span className="font-semibold text-sm text-cb-dark group-hover:text-cb-blue transition-colors">
                        {asset.name}
                    </span>
                    <span className="text-xs text-cb-gray-500">{asset.symbol}</span>
                </div>
            </div>

            {/* Sparkline - hidden on small screens */}
            <div className="hidden md:flex w-[120px] justify-center px-2">
                {generateSparkline()}
            </div>

            {/* Price */}
            <div className="w-[100px] sm:w-[120px] text-right">
                <span className="font-medium text-sm text-cb-dark">
                    {formatPrice(asset.price)}
                </span>
            </div>

            {/* 24h Change */}
            <div className="w-[80px] sm:w-[100px] text-right">
                <span
                    className={`text-sm font-medium ${isPositive ? 'text-cb-green' : 'text-cb-red'}`}
                >
                    {isPositive ? '+' : ''}{asset.change24h.toFixed(2)}%
                </span>
            </div>

            {/* Market Cap - hidden on small screens */}
            {showMarketCap && (
                <div className="hidden lg:block w-[140px] text-right">
                    <span className="text-sm text-cb-gray-700">
                        {formatNumber(asset.marketCap)}
                    </span>
                </div>
            )}
        </Link>
    );
};

export default CryptoRow;
