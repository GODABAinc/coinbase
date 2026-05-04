import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { FiSearch, FiPlus } from 'react-icons/fi';
import { fetchAllCryptos, fetchTopGainers, fetchNewListings } from '../api/api';
import { useAuth } from '../context/AuthContext';

const Explore = () => {
    const { user } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const filters = [
        { id: 'all', label: 'All Assets' },
        { id: 'gainers', label: 'Top Gainers' },
        { id: 'new', label: 'New Listings' },
    ];

    // Fetch crypto data based on active filter
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            setError('');
            try {
                let data;
                if (activeFilter === 'gainers') {
                    data = await fetchTopGainers();
                } else if (activeFilter === 'new') {
                    data = await fetchNewListings();
                } else {
                    data = await fetchAllCryptos();
                }
                setAssets(data.data || []);
            } catch (err) {
                setError(err.message || 'Failed to load cryptocurrencies');
                setAssets([]);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [activeFilter]);

    const filteredAssets = useMemo(() => {
        if (!searchQuery) return assets;
        const query = searchQuery.toLowerCase();
        return assets.filter(
            (a) =>
                a.name.toLowerCase().includes(query) ||
                a.symbol.toLowerCase().includes(query)
        );
    }, [assets, searchQuery]);

    const formatPrice = (price) => {
        if (price >= 1) return `$${price.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
        return `$${price.toFixed(6)}`;
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Header */}
            <section className="bg-cb-gray-50 py-12 lg:py-16 pt-32">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-cb-dark mb-4 tracking-tight animate-fade-in-up">
                                Explore crypto assets
                            </h1>
                            <p className="text-lg text-cb-gray-500 max-w-2xl animate-fade-in-up animate-delay-100" style={{ animationFillMode: 'both' }}>
                                Browse cryptocurrencies listed on the platform.
                            </p>
                        </div>
                        {user && (
                            <Link
                                to="/add-crypto"
                                className="inline-flex items-center gap-2 bg-cb-blue text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-cb-blue-hover transition-colors whitespace-nowrap"
                            >
                                <FiPlus className="w-4 h-4" />
                                Add Crypto
                            </Link>
                        )}
                    </div>
                </div>
            </section>

            {/* Search + Filters */}
            <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
                    <span className="flex-1 min-w-[140px]">Name</span>
                    <span className="w-[120px] sm:w-[150px] text-right">Price</span>
                    <span className="w-[80px] sm:w-[100px] text-right">24h</span>
                </div>

                {/* Table Body */}
                <div>
                    {loading ? (
                        <div className="text-center py-16">
                            <p className="text-cb-gray-500 text-base">Loading cryptocurrencies...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-16">
                            <p className="text-cb-red text-base">{error}</p>
                        </div>
                    ) : filteredAssets.length > 0 ? (
                        filteredAssets.map((asset) => (
                            <div
                                key={asset._id}
                                className="flex items-center px-4 py-4 hover:bg-cb-gray-50 transition-colors border-b border-cb-gray-100"
                            >
                                <div className="flex-1 min-w-[140px] flex items-center gap-3">
                                    <img
                                        src={asset.image}
                                        alt={asset.name}
                                        className="w-10 h-10 rounded-full object-cover bg-cb-gray-100"
                                        onError={(e) => { e.target.style.display = 'none'; }}
                                    />
                                    <div>
                                        <p className="font-semibold text-cb-dark text-sm">{asset.name}</p>
                                        <p className="text-xs text-cb-gray-500 uppercase">{asset.symbol}</p>
                                    </div>
                                </div>
                                <div className="w-[120px] sm:w-[150px] text-right">
                                    <p className="font-semibold text-cb-dark text-sm">{formatPrice(asset.price)}</p>
                                </div>
                                <div className="w-[80px] sm:w-[100px] text-right">
                                    <p className={`font-semibold text-sm ${asset.change24h >= 0 ? 'text-cb-green' : 'text-cb-red'}`}>
                                        {asset.change24h >= 0 ? '+' : ''}{asset.change24h.toFixed(2)}%
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-16">
                            <p className="text-cb-gray-500 text-lg mb-3">
                                {searchQuery ? 'No assets found matching your search.' : 'No cryptocurrencies listed yet.'}
                            </p>
                            {user && !searchQuery && (
                                <Link
                                    to="/add-crypto"
                                    className="inline-flex items-center gap-2 text-cb-blue text-sm font-semibold hover:text-cb-blue-hover"
                                >
                                    <FiPlus className="w-4 h-4" />
                                    Add the first cryptocurrency
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Explore;
