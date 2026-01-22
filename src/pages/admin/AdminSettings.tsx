import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { API_BASE_URL } from '@/config/api';
import { Sun, Moon, ExternalLink } from 'lucide-react';

const AdminSettings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="heading-section mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Configure your admin panel and website settings.
          </p>
        </div>

        {/* Appearance */}
        <div className="bg-card border border-border p-6 rounded-lg">
          <h2 className="font-heading text-lg mb-4">Appearance</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {theme === 'light' ? (
                <Sun className="w-5 h-5 text-gold" />
              ) : (
                <Moon className="w-5 h-5 text-gold" />
              )}
              <div>
                <Label htmlFor="theme-toggle" className="text-base">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Toggle between light and dark theme
                </p>
              </div>
            </div>
            <Switch
              id="theme-toggle"
              checked={theme === 'dark'}
              onCheckedChange={toggleTheme}
            />
          </div>
        </div>

        {/* API Configuration */}
        <div className="bg-card border border-border p-6 rounded-lg">
          <h2 className="font-heading text-lg mb-4">API Configuration</h2>
          <div className="space-y-4">
            <div>
              <Label className="text-muted-foreground">Current API Base URL</Label>
              <code className="block mt-2 p-3 bg-muted rounded text-sm break-all">
                {API_BASE_URL}
              </code>
            </div>
            <p className="text-sm text-muted-foreground">
              To change the API URL, set the <code className="bg-muted px-1 rounded">VITE_API_URL</code> environment variable before building the application.
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-card border border-border p-6 rounded-lg">
          <h2 className="font-heading text-lg mb-4">Quick Links</h2>
          <div className="space-y-3">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 border border-border rounded hover:bg-muted transition-colors"
            >
              <span>View Public Website</span>
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </a>
            <a
              href="/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 border border-border rounded hover:bg-muted transition-colors"
            >
              <span>View Portfolio</span>
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </a>
          </div>
        </div>

        {/* About */}
        <div className="bg-card border border-border p-6 rounded-lg">
          <h2 className="font-heading text-lg mb-4">About</h2>
          <p className="text-sm text-muted-foreground">
            Savanna Photo Studio Admin Panel<br />
            Built with React, TypeScript, and Tailwind CSS.<br />
            Backend: Node.js + Express + MongoDB
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
