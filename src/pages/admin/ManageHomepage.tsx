import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import AdminLayout from '@/components/admin/AdminLayout';
import { API_ENDPOINTS, getAuthHeaders } from '@/config/api';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Save, RefreshCcw } from 'lucide-react';

interface Setting {
    _id: string;
    key: string;
    value: string;
    label: string;
    type: 'text' | 'image' | 'number';
}

interface Photo {
    _id: string;
    imageUrl: string;
    category: any;
}

interface Category {
    _id: string;
    name: string;
}

const ManageHomepage: React.FC = () => {
    const [settings, setSettings] = useState<Setting[]>([]);
    const [portfolioPhotos, setPortfolioPhotos] = useState<Photo[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [selectionTarget, setSelectionTarget] = useState<string | null>(null); // key of setting being changed
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const { toast } = useToast();

    const fetchData = useCallback(async () => {
        try {
            const headers = getAuthHeaders();
            const [settingsRes, photosRes, categoriesRes] = await Promise.all([
                axios.get(API_ENDPOINTS.settings, { headers }),
                axios.get(API_ENDPOINTS.photos, { headers }),
                axios.get(API_ENDPOINTS.categories, { headers }),
            ]);
            setSettings(settingsRes.data);
            setPortfolioPhotos(photosRes.data);
            setCategories(categoriesRes.data);
        } catch (err) {
            toast({
                title: 'Error',
                description: 'Could not load settings.',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    }, [toast]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleUpdateValue = (key: string, newValue: string) => {
        setSettings(prev => prev.map(s => s.key === key ? { ...s, value: newValue } : s));
    };

    const handleSave = async () => {
        setSubmitting(true);
        try {
            await axios.put(API_ENDPOINTS.settings, { settings }, {
                headers: getAuthHeaders(),
            });
            toast({
                title: 'Success',
                description: 'Homepage settings updated successfully.',
            });
        } catch (err) {
            toast({
                title: 'Error',
                description: 'Could not save settings.',
                variant: 'destructive',
            });
        } finally {
            setSubmitting(false);
        }
    };

    const filteredPhotos = activeCategory === 'all'
        ? portfolioPhotos
        : portfolioPhotos.filter(p => p.category?._id === activeCategory || p.category === activeCategory);

    return (
        <AdminLayout>
            <div className="space-y-8">
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="heading-section mb-2">Manage Homepage</h1>
                        <p className="text-muted-foreground">
                            Customize the images and content displayed on your main page.
                        </p>
                    </div>
                    <Button onClick={handleSave} disabled={submitting} className="mb-1">
                        <Save className="w-4 h-4 mr-2" />
                        {submitting ? 'Saving...' : 'Save All Changes'}
                    </Button>
                </div>

                {loading ? (
                    <div className="p-12 text-center text-muted-foreground bg-card border border-border rounded-lg">
                        <RefreshCcw className="w-8 h-8 mx-auto mb-4 animate-spin opacity-20" />
                        <p>Loading site settings...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {settings.map((setting) => (
                            <div key={setting.key} className="bg-card border border-border p-6 rounded-lg shadow-sm">
                                <div className="flex flex-col md:flex-row gap-6">
                                    {setting.type === 'image' && (
                                        <div className="w-full md:w-48 aspect-video md:aspect-square bg-muted rounded overflow-hidden border border-border flex-shrink-0">
                                            <img src={setting.value} alt={setting.label} className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                    <div className="flex-1 space-y-4">
                                        <div>
                                            <Label className="text-base font-heading mb-1 block">{setting.label}</Label>
                                            <p className="text-xs text-muted-foreground mb-4">Key: {setting.key}</p>
                                        </div>

                                        {selectionTarget === setting.key ? (
                                            <div className="space-y-4 border-t border-border pt-4 animate-in fade-in slide-in-from-top-2">
                                                <div className="flex items-center justify-between gap-4">
                                                    <Label className="text-xs uppercase tracking-widest text-gold font-bold">Select New Image</Label>
                                                    <div className="flex gap-2">
                                                        <select
                                                            className="bg-background border border-border rounded px-2 py-1 text-xs"
                                                            value={activeCategory}
                                                            onChange={(e) => setActiveCategory(e.target.value)}
                                                        >
                                                            <option value="all">All Categories</option>
                                                            {categories.map(cat => (
                                                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                                                            ))}
                                                        </select>
                                                        <Button variant="outline" size="sm" onClick={() => setSelectionTarget(null)}>Cancel</Button>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 max-h-[240px] overflow-y-auto p-2 border border-border rounded bg-muted/30">
                                                    {filteredPhotos.map((photo) => (
                                                        <div
                                                            key={photo._id}
                                                            onClick={() => {
                                                                handleUpdateValue(setting.key, photo.imageUrl);
                                                                setSelectionTarget(null);
                                                            }}
                                                            className={`aspect-square rounded overflow-hidden cursor-pointer border-2 transition-all ${setting.value === photo.imageUrl
                                                                ? 'border-primary ring-2 ring-primary/20 scale-95'
                                                                : 'border-transparent hover:border-muted-foreground/50'
                                                                }`}
                                                        >
                                                            <img src={photo.imageUrl} alt="Portfolio" className="w-full h-full object-cover" />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col sm:flex-row gap-2">
                                                <input
                                                    type="text"
                                                    value={setting.value}
                                                    onChange={(e) => handleUpdateValue(setting.key, e.target.value)}
                                                    className="flex-1 bg-muted/50 border border-border rounded px-3 py-2 text-sm font-mono truncate"
                                                    readOnly
                                                />
                                                <Button
                                                    variant="secondary"
                                                    onClick={() => setSelectionTarget(setting.key)}
                                                    className="sm:w-32"
                                                >
                                                    Change Image
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default ManageHomepage;
