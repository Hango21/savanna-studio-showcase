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

interface Slide {
  _id: string;
  title: string;
  imageUrl: string;
  order: number;
}

const ManageSlideshow: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [newSlide, setNewSlide] = useState({ title: '', imageUrl: '', order: 0 });
  const [file, setFile] = useState<File | null>(null);
  const [uploadMode, setUploadMode] = useState<'url' | 'file'>('file');
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchSlides = useCallback(async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.slides, {
        headers: getAuthHeaders(),
      });
      setSlides(response.data);
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Could not load slides.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchSlides();
  }, [fetchSlides]);

  const handleAddSlide = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let finalImageUrl = newSlide.imageUrl;

      if (uploadMode === 'file' && file) {
        // Enforce 15MB limit
        if (file.size > 15 * 1024 * 1024) {
          toast({
            title: 'Error',
            description: 'File size too large. Maximum size is 15MB.',
            variant: 'destructive',
          });
          setSubmitting(false);
          return;
        }

        // Upload directly to Cloudinary
        toast({
          title: 'Uploading...',
          description: 'Uploading slide image directly to Cloudinary...',
        });
        finalImageUrl = await cloudinaryService.uploadFile(file);
      }

      if (!finalImageUrl) {
        toast({
          title: 'Error',
          description: 'Please provide an image URL or upload a file.',
          variant: 'destructive',
        });
        setSubmitting(false);
        return;
      }

      // Send the resulting URL to our backend
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
      setNewSlide({ title: '', imageUrl: '', order: 0 });
      setFile(null);
      fetchSlides();
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

  const handleDeleteSlide = async (id: string) => {
    if (!confirm('Are you sure you want to delete this slide?')) return;

    try {
      await axios.delete(API_ENDPOINTS.slideById(id), {
        headers: getAuthHeaders(),
      });
      toast({
        title: 'Success',
        description: 'Slide deleted successfully.',
      });
      fetchSlides();
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Could not delete slide.',
        variant: 'destructive',
      });
    }
  };

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
            <div className="flex gap-4 mb-4">
              <Button
                type="button"
                variant={uploadMode === 'file' ? 'default' : 'outline'}
                onClick={() => setUploadMode('file')}
              >
                Upload File
              </Button>
              <Button
                type="button"
                variant={uploadMode === 'url' ? 'default' : 'outline'}
                onClick={() => setUploadMode('url')}
              >
                Image URL
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title (Optional)</Label>
                <Input
                  id="title"
                  value={newSlide.title}
                  onChange={(e) => setNewSlide({ ...newSlide, title: e.target.value })}
                  placeholder="Slide Title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageInput">
                  {uploadMode === 'file' ? 'Select Image' : 'Image URL'}
                </Label>
                {uploadMode === 'file' ? (
                  <Input
                    id="imageInput"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                    required={!newSlide.imageUrl}
                  />
                ) : (
                  <Input
                    id="imageInput"
                    value={newSlide.imageUrl}
                    onChange={(e) =>
                      setNewSlide({ ...newSlide, imageUrl: e.target.value })
                    }
                    placeholder="https://example.com/slide.jpg"
                    required
                  />
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="order">Order</Label>
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
            <Button type="submit" disabled={submitting}>
              <Plus className="w-4 h-4 mr-2" />
              {submitting ? 'Adding...' : 'Add Slide'}
            </Button>
          </form>
        </div>

        {/* Slides List */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="p-4 border-b border-border">
            <h2 className="font-heading text-lg">Current Slides</h2>
          </div>

          {loading ? (
            <div className="p-8 text-center text-muted-foreground">Loading...</div>
          ) : slides.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No slides found. Add your first slide above.
            </div>
          ) : (
            <div className="divide-y divide-border">
              {slides.map((slide) => (
                <div key={slide._id} className="flex items-center p-4 gap-4">
                  <GripVertical className="w-5 h-5 text-muted-foreground cursor-move" />
                  <div className="w-20 h-14 bg-muted rounded overflow-hidden flex-shrink-0">
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
                    <p className="font-medium truncate">{slide.title}</p>
                    <p className="text-sm text-muted-foreground truncate">{slide.imageUrl}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteSlide(slide._id)}
                    className="text-destructive hover:text-destructive"
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
