import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import AdminLayout from '@/components/admin/AdminLayout';
import { API_ENDPOINTS, getAuthHeaders } from '@/config/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { cloudinaryService } from '@/services/cloudinary';

interface Photo {
  _id: string;
  imageUrl: string;
  category: string;
}

interface Category {
  _id: string;
  name: string;
}

const ManageSlideshow: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [portfolioPhotos, setPortfolioPhotos] = useState<Photo[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newSlide, setNewSlide] = useState({ title: '', imageUrl: '', order: 0 });
  const [file, setFile] = useState<File | null>(null);
  const [uploadMode, setUploadMode] = useState<'url' | 'file' | 'portfolio'>('portfolio');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchData = useCallback(async () => {
    try {
      const headers = getAuthHeaders();
      const [slidesRes, photosRes, categoriesRes] = await Promise.all([
        axios.get(API_ENDPOINTS.slides, { headers }),
        axios.get(API_ENDPOINTS.photos, { headers }),
        axios.get(API_ENDPOINTS.categories, { headers }),
      ]);
      setSlides(slidesRes.data);
      setPortfolioPhotos(photosRes.data);
      setCategories(categoriesRes.data);
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Could not load data.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddSlide = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let finalImageUrl = newSlide.imageUrl;

      if (uploadMode === 'file' && file) {
        if (file.size > 15 * 1024 * 1024) {
          toast({
            title: 'Error',
            description: 'File size too large. Maximum size is 15MB.',
            variant: 'destructive',
          });
          setSubmitting(false);
          return;
        }

        toast({
          title: 'Uploading...',
          description: 'Uploading slide image directly to Cloudinary...',
        });
        finalImageUrl = await cloudinaryService.uploadFile(file);
      }

      if (!finalImageUrl) {
        toast({
          title: 'Error',
          description: 'Please select a photo or upload a file.',
          variant: 'destructive',
        });
        setSubmitting(false);
        return;
      }

      await axios.post(
        API_ENDPOINTS.slides,
        {
          title: newSlide.title,
          imageUrl: finalImageUrl,
          order: newSlide.order,
          active: true,
        },
        {
          headers: getAuthHeaders(),
        }
      );

      toast({
        title: 'Success',
        description: 'Slide added successfully.',
      });
      setNewSlide({ title: '', imageUrl: '', order: slides.length + 1 });
      setFile(null);
      fetchData();
    } catch (err: any) {
      console.error(err);
      toast({
        title: 'Error',
        description: err.message || 'Could not add slide. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const filteredPhotos = activeCategory === 'all'
    ? portfolioPhotos
    : portfolioPhotos.filter(p => (p.category as any)._id === activeCategory || p.category === activeCategory);

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="heading-section mb-2">Manage Slideshow</h1>
          <p className="text-muted-foreground">
            Add, edit, or remove slides from your homepage slideshow.
          </p>
        </div>

        {/* Add New Slide */}
        <div className="bg-card border border-border p-6 rounded-lg">
          <h2 className="font-heading text-lg mb-4">Add New Slide</h2>
          <form onSubmit={handleAddSlide} className="space-y-4">
            <div className="flex flex-wrap gap-4 mb-4">
              <Button
                type="button"
                variant={uploadMode === 'portfolio' ? 'default' : 'outline'}
                onClick={() => setUploadMode('portfolio')}
              >
                Portfolio Selection
              </Button>
              <Button
                type="button"
                variant={uploadMode === 'file' ? 'default' : 'outline'}
                onClick={() => setUploadMode('file')}
              >
                Upload New File
              </Button>
              <Button
                type="button"
                variant={uploadMode === 'url' ? 'default' : 'outline'}
                onClick={() => setUploadMode('url')}
              >
                Custom URL
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Slide Title (Optional)</Label>
                <Input
                  id="title"
                  value={newSlide.title}
                  onChange={(e) => setNewSlide({ ...newSlide, title: e.target.value })}
                  placeholder="e.g. Wedding Photography"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="order">Display Order</Label>
                <Input
                  id="order"
                  type="number"
                  value={newSlide.order}
                  onChange={(e) =>
                    setNewSlide({ ...newSlide, order: parseInt(e.target.value) })
                  }
                  required
                />
              </div>
            </div>

            {/* Input Based on Mode */}
            <div className="pt-4 border-t border-border">
              {uploadMode === 'portfolio' ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Pick from Portfolio</Label>
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
                    </div>
                  </div>

                  <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 max-h-[300px] overflow-y-auto p-2 border border-border rounded bg-muted/30">
                    {filteredPhotos.map((photo) => (
                      <div
                        key={photo._id}
                        onClick={() => setNewSlide({ ...newSlide, imageUrl: photo.imageUrl })}
                        className={`aspect-square rounded overflow-hidden cursor-pointer border-2 transition-all ${newSlide.imageUrl === photo.imageUrl
                            ? 'border-primary scale-95 ring-2 ring-primary/20'
                            : 'border-transparent hover:border-muted-foreground/50'
                          }`}
                      >
                        <img
                          src={photo.imageUrl}
                          alt="Category photo"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  {newSlide.imageUrl && (
                    <div className="flex items-center gap-4 p-2 bg-secondary/50 rounded animate-in fade-in slide-in-from-top-1">
                      <div className="w-12 h-12 rounded overflow-hidden border border-border">
                        <img src={newSlide.imageUrl} className="w-full h-full object-cover" />
                      </div>
                      <p className="text-xs text-muted-foreground truncate flex-1">{newSlide.imageUrl}</p>
                      <Button variant="ghost" size="sm" onClick={() => setNewSlide({ ...newSlide, imageUrl: '' })}>Change</Button>
                    </div>
                  )}
                </div>
              ) : uploadMode === 'file' ? (
                <div className="space-y-2">
                  <Label htmlFor="imageInput">Select File</Label>
                  <Input
                    id="imageInput"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                    required={!newSlide.imageUrl}
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="urlInput">Image URL</Label>
                  <Input
                    id="urlInput"
                    value={newSlide.imageUrl}
                    onChange={(e) =>
                      setNewSlide({ ...newSlide, imageUrl: e.target.value })
                    }
                    placeholder="https://example.com/slide.jpg"
                    required
                  />
                </div>
              )}
            </div>

            <Button type="submit" disabled={submitting || !newSlide.imageUrl} className="w-full md:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              {submitting ? 'Adding...' : 'Add to Slideshow'}
            </Button>
          </form>
        </div>

        {/* Slides List */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="p-4 border-b border-border bg-muted/20">
            <h2 className="font-heading text-lg">Current Slideshow ({slides.length})</h2>
          </div>

          {loading ? (
            <div className="p-8 text-center text-muted-foreground">Loading slides...</div>
          ) : slides.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              Your slideshow is empty. Choose a photo from the portfolio above to start.
            </div>
          ) : (
            <div className="divide-y divide-border">
              {slides.map((slide) => (
                <div key={slide._id} className="flex items-center p-4 gap-4 group hover:bg-secondary/20 transition-colors">
                  <GripVertical className="w-5 h-5 text-muted-foreground cursor-move" />
                  <div className="w-24 h-16 bg-muted rounded overflow-hidden flex-shrink-0 border border-border shadow-sm">
                    <img
                      src={slide.imageUrl}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{slide.title || 'Untitled Slide'}</p>
                    <p className="text-xs text-muted-foreground truncate uppercase tracking-widest">Order: {slide.order}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteSlide(slide._id)}
                    className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageSlideshow;

export default ManageSlideshow;
