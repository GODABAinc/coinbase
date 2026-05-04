import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import { addCrypto } from '../api/api';

const AddCrypto = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    price: '',
    image: '',
    change24h: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await addCrypto({
        name: formData.name,
        symbol: formData.symbol,
        price: parseFloat(formData.price),
        image: formData.image,
        change24h: parseFloat(formData.change24h),
      });
      setSuccess('Cryptocurrency added successfully!');
      setFormData({ name: '', symbol: '', price: '', image: '', change24h: '' });
      setTimeout(() => navigate('/explore'), 1500);
    } catch (err) {
      setError(err.message || 'Failed to add cryptocurrency');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <section className="flex-1 bg-cb-gray-50 py-12 lg:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-cb-dark mb-2 tracking-tight">
            Add Cryptocurrency
          </h1>
          <p className="text-cb-gray-500 mb-8">List a new cryptocurrency on the platform</p>

          <div className="bg-white rounded-2xl shadow-lg border border-cb-gray-100 p-8 sm:p-10">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-cb-dark mb-2">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Bitcoin"
                  className="w-full px-4 py-3 border-2 border-cb-gray-100 rounded-xl text-sm focus:outline-none focus:border-cb-blue transition-colors bg-white text-cb-dark placeholder-cb-gray-300"
                  required
                />
              </div>

              <div>
                <label htmlFor="symbol" className="block text-sm font-semibold text-cb-dark mb-2">
                  Symbol
                </label>
                <input
                  id="symbol"
                  name="symbol"
                  type="text"
                  value={formData.symbol}
                  onChange={handleChange}
                  placeholder="BTC"
                  className="w-full px-4 py-3 border-2 border-cb-gray-100 rounded-xl text-sm focus:outline-none focus:border-cb-blue transition-colors bg-white text-cb-dark placeholder-cb-gray-300 uppercase"
                  required
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-semibold text-cb-dark mb-2">
                  Price (USD)
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  step="any"
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="65000.00"
                  className="w-full px-4 py-3 border-2 border-cb-gray-100 rounded-xl text-sm focus:outline-none focus:border-cb-blue transition-colors bg-white text-cb-dark placeholder-cb-gray-300"
                  required
                />
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-semibold text-cb-dark mb-2">
                  Image URL
                </label>
                <input
                  id="image"
                  name="image"
                  type="url"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full px-4 py-3 border-2 border-cb-gray-100 rounded-xl text-sm focus:outline-none focus:border-cb-blue transition-colors bg-white text-cb-dark placeholder-cb-gray-300"
                  required
                />
              </div>

              <div>
                <label htmlFor="change24h" className="block text-sm font-semibold text-cb-dark mb-2">
                  24h Change (%)
                </label>
                <input
                  id="change24h"
                  name="change24h"
                  type="number"
                  step="any"
                  value={formData.change24h}
                  onChange={handleChange}
                  placeholder="2.5"
                  className="w-full px-4 py-3 border-2 border-cb-gray-100 rounded-xl text-sm focus:outline-none focus:border-cb-blue transition-colors bg-white text-cb-dark placeholder-cb-gray-300"
                  required
                />
                <p className="text-xs text-cb-gray-500 mt-1">Use a positive number for gain, negative for loss (e.g. -1.5)</p>
              </div>

              <Button type="submit" fullWidth size="lg" disabled={loading}>
                {loading ? 'Adding...' : 'Add Cryptocurrency'}
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AddCrypto;
