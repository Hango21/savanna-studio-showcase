import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import AdminLayout from '@/components/admin/AdminLayout';
import { API_ENDPOINTS, getAuthHeaders } from '@/config/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2 } from 'lucide-react';
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

const ManagePhotos: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPhoto, setNewPhoto] = useState({ imageUrl: '', category: '' });
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploadMode, setUploadMode] = useState<'url' | 'file'>('file');
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchData = useCallback(async () => {
    try {
      const headers = getAuthHeaders();
      const [photosRes, categoriesRes] = await Promise.all([
        axios.get(API_ENDPOINTS.photos, { headers }),
        axios.get(API_ENDPOINTS.categories, { headers }),
      ]);
      setPhotos(photosRes.data);
      setCategories(categoriesRes.data);
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Could not load data. API may not be available.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (uploadMode === 'file' && files && files.length > 0) {
        const fileArray = Array.from(files);
        let successCount = 0;
        const BATCH_SIZE = 3; // Upload 3 at a time for speed vs stability balance

        for (let i = 0; i < fileArray.length; i += BATCH_SIZE) {
          const batch = fileArray.slice(i, i + BATCH_SIZE);

          await Promise.all(batch.map(async (file, batchIndex) => {
            const overallIndex = i + batchIndex;

            // Enforce 15MB limit per file
            if (file.size > 15 * 1024 * 1024) {
              toast({
                title: 'Skip File',
                description: `File "${file.name}" is too large (>15MB).`,
                variant: 'destructive',
              });
              return;
            }

            toast({
              title: `Processing (${overallIndex + 1}/${fileArray.length})`,
              description: `Uploading "${file.name}"...`,
            });

            try {
              const uploadedUrl = await cloudinaryService.uploadFile(file);

              await axios.post(
                API_ENDPOINTS.photos,
                {
                  imageUrl: uploadedUrl,
                  category: newPhoto.category,
                },
                {
                  headers: getAuthHeaders(),
                }
              );
              successCount++;
            } catch (uploadErr: any) {
              console.error(`Error uploading ${file.name}:`, uploadErr);
              toast({
                title: 'Upload Failed',
                description: `Failed to upload "${file.name}".`,
                variant: 'destructive',
              });
            }
          }));
        }

        toast({
          title: 'Bulk Upload Complete',
          description: `Successfully added ${successCount} photos.`,
        });
        setFiles(null);
      } else if (uploadMode === 'url' && newPhoto.imageUrl) {
        await axios.post(
          API_ENDPOINTS.photos,
          {
            imageUrl: newPhoto.imageUrl,
            category: newPhoto.category,
          },
          {
            headers: getAuthHeaders(),
          }
        );
        toast({
          title: 'Success',
          description: 'Photo added successfully.',
        });
      } else {
        toast({
          title: 'Error',
          description: 'Please provide an image URL or upload file(s).',
          variant: 'destructive',
        });
        setSubmitting(false);
        return;
      }

      setNewPhoto({ ...newPhoto, imageUrl: '' });
      fetchData();
    } catch (err: any) {
      console.error(err);
      toast({
        title: 'Error',
        description: err.message || 'Could not complete the request.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeletePhoto = async (id: string) => {
    if (!confirm('Are you sure you want to delete this photo?')) return;

    try {
      await axios.delete(API_ENDPOINTS.photoById(id), {
        headers: getAuthHeaders(),
      });
      toast({
        title: 'Success',
        description: 'Photo deleted successfully.',
      });
      fetchData();
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Could not delete photo.',
        variant: 'destructive',
      });
    }
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find((c) => c._id === categoryId)?.name || 'Unknown';
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="heading-section mb-2">Manage Photos</h1>
          <p className="text-muted-foreground">
            Add or remove photos from your portfolio.
          </p>
        </div>

        {/* Add New Photo */}
        <div className="bg-card border border-border p-6 rounded-lg">
          <h2 className="font-heading text-lg mb-4">Add New Photo</h2>
          <form onSubmit={handleAddPhoto} className="space-y-4">
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
                <Label htmlFor="imageInput">
                  {uploadMode === 'file'
                    ? `Select Images ${files ? `(${files.length} selected)` : ''}`
                    : 'Image URL'}
                </Label>
                {uploadMode === 'file' ? (
                  <Input
                    id="imageInput"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => setFiles(e.target.files)}
                    required={!files}
                  />
                ) : (
                  <Input
                    id="imageInput"
                    value={newPhoto.imageUrl}
                    onChange={(e) =>
                      setNewPhoto({ ...newPhoto, imageUrl: e.target.value })
                    }
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newPhoto.category}
                  onValueChange={(value) =>
                    setNewPhoto({ ...newPhoto, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit" disabled={submitting || !newPhoto.category}>
              <Plus className="w-4 h-4 mr-2" />
              {submitting ? 'Adding...' : 'Add Photo'}
            </Button>
          </form>
        </div>

        {/* Photos Grid */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="p-4 border-b border-border">
            <h2 className="font-heading text-lg">Portfolio Photos ({photos.length})</h2>
          </div>

          {loading ? (
            <div className="p-8 text-center text-muted-foreground">Loading...</div>
          ) : photos.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No photos found. Add your first photo above.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
              {photos.map((photo) => (
                <div key={photo._id} className="relative group">
                  <div className="aspect-square bg-muted rounded overflow-hidden">
                    <img
                      src={photo.imageUrl}
                      alt="Portfolio"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {getCategoryName(photo.category)}
                    </span>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeletePhoto(photo._id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManagePhotos;
