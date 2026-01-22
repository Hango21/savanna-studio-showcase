import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { API_ENDPOINTS } from '@/config/api';
import { X } from 'lucide-react';

interface Category {
  _id: string;
  name: string;
}

interface Photo {
  _id: string;
  imageUrl: string;
  category: string;
}

// Import fallback images
import weddingImage from '@/assets/wedding-couple.jpg';
import maternityImage from '@/assets/maternity-portrait.jpg';
import familyImage from '@/assets/family-portrait.jpg';

// Fallback data
const fallbackCategories: Category[] = [
  { _id: 'all', name: 'All' },
  { _id: 'wedding', name: 'Wedding' },
  { _id: 'maternity', name: 'Maternity' },
  { _id: 'family', name: 'Family' },
];

const fallbackPhotos: Photo[] = [
  { _id: '1', imageUrl: weddingImage, category: 'wedding' },
  { _id: '2', imageUrl: maternityImage, category: 'maternity' },
  { _id: '3', imageUrl: familyImage, category: 'family' },
];

const GalleryGrid: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(fallbackCategories);
  const [photos, setPhotos] = useState<Photo[]>(fallbackPhotos);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.categories);
        setCategories([{ _id: 'all', name: 'All' }, ...response.data]);
      } catch (err) {
        console.log('Using fallback categories');
      }
    };

    fetchCategories();
  }, []);

  // Fetch photos based on category
  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      try {
        const url = activeCategory === 'all' 
          ? API_ENDPOINTS.photos 
          : API_ENDPOINTS.photosByCategory(activeCategory);
        const response = await axios.get(url);
        if (response.data.length > 0) {
          setPhotos(response.data);
        } else {
          // Filter fallback photos by category
          const filtered = activeCategory === 'all' 
            ? fallbackPhotos 
            : fallbackPhotos.filter(p => p.category === activeCategory);
          setPhotos(filtered.length > 0 ? filtered : fallbackPhotos);
        }
      } catch (err) {
        console.log('Using fallback photos');
        const filtered = activeCategory === 'all' 
          ? fallbackPhotos 
          : fallbackPhotos.filter(p => p.category === activeCategory);
        setPhotos(filtered.length > 0 ? filtered : fallbackPhotos);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [activeCategory]);

  return (
    <div>
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => (
          <button
            key={category._id}
            onClick={() => setActiveCategory(category._id)}
            className={`px-6 py-2 text-sm tracking-widest uppercase border transition-all duration-300 ${
              activeCategory === category._id
                ? 'bg-foreground text-background border-foreground'
                : 'bg-transparent text-foreground border-border hover:border-foreground'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-[4/5] bg-muted animate-pulse" />
          ))}
        </div>
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {photos.map((photo) => (
              <motion.div
                key={photo._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedPhoto(photo)}
                className="aspect-[4/5] overflow-hidden cursor-pointer group image-frame"
              >
                <img
                  src={photo.imageUrl}
                  alt="Portfolio photo"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-6 right-6 p-2 text-foreground hover:text-muted-foreground transition-colors"
              aria-label="Close lightbox"
            >
              <X className="h-8 w-8" />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedPhoto.imageUrl}
              alt="Portfolio photo"
              className="max-w-full max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryGrid;
