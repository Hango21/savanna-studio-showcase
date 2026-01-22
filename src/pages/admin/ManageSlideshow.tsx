import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '@/components/admin/AdminLayout';
import { API_ENDPOINTS, getAuthHeaders } from '@/config/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2, GripVertical } from 'lucide-react';

interface Slide {
  _id: string;
  title: string;
  imageUrl: string;
  order: number;
}

const ManageSlideshow: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);
  const [newSlide, setNewSlide] = useState({ title: '', imageUrl: '' });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchSlides = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.slides, {
        headers: getAuthHeaders(),
      });
      setSlides(response.data.sort((a: Slide, b: Slide) => a.order - b.order));
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Could not load slides. API may not be available.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const handleAddSlide = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await axios.post(
        API_ENDPOINTS.slides,
        { ...newSlide, order: slides.length + 1 },
        { headers: getAuthHeaders() }
      );
      toast({
        title: 'Success',
        description: 'Slide added successfully.',
      });
      setNewSlide({ title: '', imageUrl: '' });
      fetchSlides();
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Could not add slide.',
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newSlide.title}
                  onChange={(e) => setNewSlide({ ...newSlide, title: e.target.value })}
                  placeholder="Slide title"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  value={newSlide.imageUrl}
                  onChange={(e) => setNewSlide({ ...newSlide, imageUrl: e.target.value })}
                  placeholder="https://example.com/image.jpg"
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
