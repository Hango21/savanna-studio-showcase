import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import AdminLayout from '@/components/admin/AdminLayout';
import { API_ENDPOINTS, getAuthHeaders } from '@/config/api';
import { Images, Layers, FolderOpen, Eye } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    slides: 0,
    photos: 0,
    categories: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const headers = getAuthHeaders();
        const [slidesRes, photosRes, categoriesRes] = await Promise.all([
          axios.get(API_ENDPOINTS.slides, { headers }),
          axios.get(API_ENDPOINTS.photos, { headers }),
          axios.get(API_ENDPOINTS.categories, { headers }),
        ]);

        setStats({
          slides: slidesRes.data?.length || 0,
          photos: photosRes.data?.length || 0,
          categories: categoriesRes.data?.length || 0,
        });
      } catch (err) {
        console.log('Could not fetch stats - API may not be available');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { label: 'Slideshow Images', value: stats.slides, icon: Layers, color: 'text-gold' },
    { label: 'Portfolio Photos', value: stats.photos, icon: Images, color: 'text-gold' },
    { label: 'Categories', value: stats.categories, icon: FolderOpen, color: 'text-gold' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="heading-section mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your photo studio.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-card border border-border p-6 rounded-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div className="text-3xl font-heading mb-1">
                {loading ? '...' : stat.value}
              </div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-card border border-border p-6 rounded-lg">
          <h2 className="font-heading text-lg mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="/admin/slideshow"
              className="flex items-center p-4 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              <Layers className="w-5 h-5 mr-3 text-gold" />
              <span className="text-sm">Manage Slideshow</span>
            </a>
            <a
              href="/admin/photos"
              className="flex items-center p-4 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              <Images className="w-5 h-5 mr-3 text-gold" />
              <span className="text-sm">Manage Photos</span>
            </a>
            <a
              href="/admin/categories"
              className="flex items-center p-4 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              <FolderOpen className="w-5 h-5 mr-3 text-gold" />
              <span className="text-sm">Manage Categories</span>
            </a>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-4 border border-border rounded-lg hover:bg-muted transition-colors"
            >
              <Eye className="w-5 h-5 mr-3 text-gold" />
              <span className="text-sm">View Website</span>
            </a>
          </div>
        </div>

        {/* API Status */}
        <div className="bg-card border border-border p-6 rounded-lg">
          <h2 className="font-heading text-lg mb-4">API Configuration</h2>
          <p className="text-sm text-muted-foreground mb-2">
            Base URL: <code className="bg-muted px-2 py-1 rounded">{API_ENDPOINTS.slides.replace('/api/slides', '')}</code>
          </p>
          <p className="text-sm text-muted-foreground">
            Set <code className="bg-muted px-2 py-1 rounded">VITE_API_URL</code> environment variable to change the API endpoint.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
