import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Card from '../components/common/Card';
import { learnArticles } from '../data/cryptoData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Learn = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [headerRef, headerVisible] = useScrollAnimation();

    const categories = ['All', 'Beginner', 'Intermediate', 'Advanced'];

    const filteredArticles = activeCategory === 'All'
        ? learnArticles
        : learnArticles.filter((a) => a.category === activeCategory);

    // Featured article = first one
    const featuredArticle = learnArticles[0];

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Header */}
            <section className="bg-cb-dark text-white py-16 lg:py-24">
                <div
                    ref={headerRef}
                    className={`max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                >
                    <span className="inline-block text-cb-blue text-sm font-semibold uppercase tracking-wider mb-4">
                        Learn
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight">
                        Learn about crypto
                    </h1>
                    <p className="text-lg text-cb-gray-300 max-w-2xl leading-relaxed">
                        Explore the world of cryptocurrency with our beginner-friendly guides,
                        tutorials, and in-depth articles.
                    </p>
                </div>
            </section>

            {/* Featured Article */}
            <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
                <div className="bg-white rounded-2xl shadow-xl border border-cb-gray-100 overflow-hidden flex flex-col lg:flex-row hover:shadow-2xl transition-shadow duration-300">
                    <div className="lg:w-1/2">
                        <img
                            src={featuredArticle.image}
                            alt={featuredArticle.title}
                            className="w-full h-64 lg:h-full object-cover"
                        />
                    </div>
                    <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                        <span className="inline-block bg-cb-blue-light text-cb-blue text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4 w-fit">
                            Featured
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-cb-dark mb-4">
                            {featuredArticle.title}
                        </h2>
                        <p className="text-cb-gray-500 leading-relaxed mb-6">
                            {featuredArticle.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-cb-gray-500">
                            <span className="bg-cb-gray-50 px-3 py-1 rounded-full font-medium">{featuredArticle.category}</span>
                            <span>{featuredArticle.readTime}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Category Filters */}
            <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${activeCategory === cat
                                    ? 'bg-cb-blue text-white shadow-sm'
                                    : 'bg-cb-gray-50 text-cb-gray-700 hover:bg-cb-gray-100'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* Articles Grid */}
            <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArticles.map((article) => (
                        <Card
                            key={article.id}
                            padding="p-0"
                            className="overflow-hidden group"
                        >
                            <div className="overflow-hidden">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-3 mb-3">
                                    <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${article.category === 'Beginner'
                                            ? 'bg-green-50 text-green-600'
                                            : article.category === 'Intermediate'
                                                ? 'bg-yellow-50 text-yellow-600'
                                                : 'bg-red-50 text-red-600'
                                        }`}>
                                        {article.category}
                                    </span>
                                    <span className="text-xs text-cb-gray-500">{article.readTime}</span>
                                </div>
                                <h3 className="text-lg font-bold text-cb-dark mb-2 group-hover:text-cb-blue transition-colors">
                                    {article.title}
                                </h3>
                                <p className="text-sm text-cb-gray-500 line-clamp-2 leading-relaxed">
                                    {article.description}
                                </p>
                            </div>
                        </Card>
                    ))}
                </div>

                {filteredArticles.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-cb-gray-500 text-lg">No articles found in this category.</p>
                    </div>
                )}
            </section>

            {/* CTA Section */}
            <section className="bg-cb-gray-50 py-16">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-cb-dark mb-4">
                        Ready to start your crypto journey?
                    </h2>
                    <p className="text-cb-gray-500 mb-8 max-w-lg mx-auto">
                        Coinbase makes it simple and safe to buy, sell, and hold cryptocurrency.
                    </p>
                    <Link
                        to="/signup"
                        className="inline-flex bg-cb-blue text-white px-8 py-3 rounded-full font-semibold hover:bg-cb-blue-hover transition-colors"
                    >
                        Get started
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Learn;
