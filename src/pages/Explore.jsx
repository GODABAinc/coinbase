import React, { useState, useMemo } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CryptoRow from '../components/crypto/CryptoRow';
import { cryptoAssets } from '../data/cryptoData';
import { FiSearch } from 'react-icons/fi';

const Explore = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('rank');
    const [sortOrder, setSortOrder] = useState('asc');
    const [activeFilter, setActiveFilter] = useState('all');

    const filters = [
        { id: 'all', label: 'All Assets' },
        { id: 'gainers', label: 'Top Gainers' },
        { id: 'losers', label: 'Top Losers' },
        { id: 'stable', label: 'Stablecoins' },
    ];

    const filteredAssets = useMemo(() => {
        let assets = [...cryptoAssets];

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            assets = assets.filter(
                (a) =>
                    a.name.toLowerCase().includes(query) ||
                    a.symbol.toLowerCase().includes(query)
            );
        }

        // Category filter
        if (activeFilter === 'gainers') {
            assets = assets.filter((a) => a.change24h > 0);
        } else if (activeFilter === 'losers') {
            assets = assets.filter((a) => a.change24h < 0);
        } else if (activeFilter === 'stable') {
            assets = assets.filter((a) => Math.abs(a.change24h) < 0.1);
        }

        // Sort
        assets.sort((a, b) => {
            let comparison = 0;
            switch (sortBy) {
                case 'rank':
                    comparison = a.rank - b.rank;
                    break;
                case 'price':
                    comparison = a.price - b.price;
                    break;
                case 'change':
                    comparison = a.change24h - b.change24h;
                    break;
                case 'marketCap':
                    comparison = a.marketCap - b.marketCap;
                    break;
                default:
                    comparison = a.rank - b.rank;
            }
            return sortOrder === 'asc' ? comparison : -comparison;
        });

        return assets;
    }, [searchQuery, sortBy, sortOrder, activeFilter]);

    const handleSort = (field) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
    };

    const SortIcon = ({ field }) => (
        <span className="ml-1 inline-block">
            {sortBy === field ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
        </span>
    );

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Header */}
            <section className="bg-cb-gray-50 py-12 lg:py-16">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-cb-dark mb-4 tracking-tight animate-fade-in-up">
                        Explore crypto assets
                    </h1>
                    <p className="text-lg text-cb-gray-500 max-w-2xl animate-fade-in-up animate-delay-100" style={{ animationFillMode: 'both' }}>
                        Browse the top cryptocurrencies by market cap, price, volume, and more.
                    </p>
                </div>
            </section>

            {/* Search + Filters */}
            <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Search Bar */}
                <div className="relative mb-6">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cb-gray-300" />
                    <input
                        type="text"
                        placeholder="Search all assets..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 border-2 border-cb-gray-100 rounded-xl text-sm focus:outline-none focus:border-cb-blue transition-colors bg-white text-cb-dark placeholder-cb-gray-300"
                    />
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-1 px-1">
                    {filters.map((filter) => (
                        <button
                            key={filter.id}
                            onClick={() => setActiveFilter(filter.id)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${activeFilter === filter.id
                                    ? 'bg-cb-blue text-white'
                                    : 'bg-cb-gray-50 text-cb-gray-700 hover:bg-cb-gray-100'
                                }`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>
            </section>

            {/* Table */}
            <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                {/* Table Header */}
                <div className="flex items-center px-4 py-3 text-xs font-semibold text-cb-gray-500 uppercase tracking-wider border-b-2 border-cb-gray-100">
                    <button
                        onClick={() => handleSort('rank')}
                        className="w-8 hidden sm:block cursor-pointer hover:text-cb-dark transition-colors"
                    >
                        #<SortIcon field="rank" />
                    </button>
                    <span className="flex-1 min-w-[140px]">Name</span>
                    <span className="hidden md:flex w-[120px] justify-center">Chart</span>
                    <button
                        onClick={() => handleSort('price')}
                        className="w-[100px] sm:w-[120px] text-right cursor-pointer hover:text-cb-dark transition-colors"
                    >
                        Price<SortIcon field="price" />
                    </button>
                    <button
                        onClick={() => handleSort('change')}
                        className="w-[80px] sm:w-[100px] text-right cursor-pointer hover:text-cb-dark transition-colors"
                    >
                        24h<SortIcon field="change" />
                    </button>
                    <button
                        onClick={() => handleSort('marketCap')}
                        className="hidden lg:block w-[140px] text-right cursor-pointer hover:text-cb-dark transition-colors"
                    >
                        Market Cap<SortIcon field="marketCap" />
                    </button>
                </div>

                {/* Table Body */}
                <div>
                    {filteredAssets.length > 0 ? (
                        filteredAssets.map((asset) => (
                            <CryptoRow key={asset.id} asset={asset} />
                        ))
                    ) : (
                        <div className="text-center py-16">
                            <p className="text-cb-gray-500 text-lg">No assets found matching your search.</p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Explore;
