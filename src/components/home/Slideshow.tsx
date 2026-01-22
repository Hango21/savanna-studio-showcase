import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { API_ENDPOINTS } from '@/config/api';
import heroImage from '@/assets/hero-wedding.jpg';

interface Slide {
  _id: string;
  title: string;
  imageUrl: string;
  order: number;
}

// Fallback slides for when API is not available
const fallbackSlides: Slide[] = [
  { _id: '1', title: 'Capturing Love Stories', imageUrl: heroImage, order: 1 },
];

const Slideshow: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>(fallbackSlides);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch slides from API
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.slides);
        const sortedSlides = response.data.sort((a: Slide, b: Slide) => a.order - b.order);
        if (sortedSlides.length > 0) {
          setSlides(sortedSlides);
        }
        setError(null);
      } catch (err) {
        console.log('Using fallback slides - API not available');
        setError('API not available');
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  // Auto-play every 5 seconds
  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;
    
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, slides.length]);

  if (loading) {
    return (
      <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-muted flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden image-frame">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <img
            src={slides[currentIndex]?.imageUrl || heroImage}
            alt={slides[currentIndex]?.title || 'Photography slideshow'}
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Slide Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-primary-foreground w-8' 
                  : 'bg-primary-foreground/50 hover:bg-primary-foreground/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Slideshow;
