import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/signin');
  };

  if (!user) return null;

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <section className="flex-1 bg-cb-gray-50 py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-cb-dark mb-2 tracking-tight">
            My Profile
          </h1>
          <p className="text-cb-gray-500 mb-8">Manage your account information</p>

          <div className="bg-white rounded-2xl shadow-lg border border-cb-gray-100 p-8 sm:p-10">
            {/* Avatar */}
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-cb-gray-100">
              <div className="w-16 h-16 rounded-full bg-cb-blue text-white flex items-center justify-center text-2xl font-bold uppercase">
                {user.name?.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-bold text-cb-dark">{user.name}</h2>
                <p className="text-cb-gray-500 text-sm">{user.email}</p>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-semibold text-cb-gray-500 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <p className="text-cb-dark text-base">{user.name}</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-cb-gray-500 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <p className="text-cb-dark text-base">{user.email}</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-cb-gray-500 uppercase tracking-wider mb-2">
                  Member Since
                </label>
                <p className="text-cb-dark text-base">{formatDate(user.createdAt)}</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-cb-gray-500 uppercase tracking-wider mb-2">
                  User ID
                </label>
                <p className="text-cb-gray-500 text-sm font-mono">{user.id}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 pt-8 border-t border-cb-gray-100 flex flex-col sm:flex-row gap-3">
              <Button onClick={() => navigate('/add-crypto')} fullWidth>
                Add a Cryptocurrency
              </Button>
              <button
                onClick={handleLogout}
                className="w-full px-6 py-3 border-2 border-cb-gray-100 rounded-xl text-sm font-semibold text-cb-dark hover:bg-cb-gray-50 transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Profile;
