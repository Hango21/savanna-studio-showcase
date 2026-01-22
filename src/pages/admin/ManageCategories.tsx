import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '@/components/admin/AdminLayout';
import { API_ENDPOINTS, getAuthHeaders } from '@/config/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2, FolderOpen } from 'lucide-react';

interface Category {
  _id: string;
  name: string;
}

const ManageCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const fetchCategories = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.categories, {
        headers: getAuthHeaders(),
      });
      setCategories(response.data);
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Could not load categories. API may not be available.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await axios.post(
        API_ENDPOINTS.categories,
        { name: newCategoryName },
        { headers: getAuthHeaders() }
      );
      toast({
        title: 'Success',
        description: 'Category added successfully.',
      });
      setNewCategoryName('');
      fetchCategories();
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Could not add category.',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category? Photos in this category may become orphaned.')) return;

    try {
      await axios.delete(API_ENDPOINTS.categoryById(id), {
        headers: getAuthHeaders(),
      });
      toast({
        title: 'Success',
        description: 'Category deleted successfully.',
      });
      fetchCategories();
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Could not delete category.',
        variant: 'destructive',
      });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="heading-section mb-2">Manage Categories</h1>
          <p className="text-muted-foreground">
            Create and manage categories for organizing your portfolio photos.
          </p>
        </div>

        {/* Add New Category */}
        <div className="bg-card border border-border p-6 rounded-lg">
          <h2 className="font-heading text-lg mb-4">Add New Category</h2>
          <form onSubmit={handleAddCategory} className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="name" className="sr-only">Category Name</Label>
              <Input
                id="name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Category name (e.g., Wedding, Portrait)"
                required
              />
            </div>
            <Button type="submit" disabled={submitting}>
              <Plus className="w-4 h-4 mr-2" />
              {submitting ? 'Adding...' : 'Add'}
            </Button>
          </form>
        </div>

        {/* Categories List */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="p-4 border-b border-border">
            <h2 className="font-heading text-lg">Categories ({categories.length})</h2>
          </div>
          
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">Loading...</div>
          ) : categories.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No categories found. Create your first category above.
            </div>
          ) : (
            <div className="divide-y divide-border">
              {categories.map((category) => (
                <div key={category._id} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <FolderOpen className="w-5 h-5 text-gold" />
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteCategory(category._id)}
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

export default ManageCategories;
