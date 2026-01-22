import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import GalleryGrid from '@/components/portfolio/GalleryGrid';

const Portfolio: React.FC = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="section-padding bg-secondary">
        <div className="container-boxed text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
              Our Work
            </p>
            <h1 className="heading-display mb-6">Portfolio</h1>
            <p className="max-w-2xl mx-auto text-muted-foreground">
              Browse through our collection of cherished moments. Each photograph tells a 
              unique story of love, joy, and the beauty of life's most precious occasions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding">
        <div className="container-boxed">
          <GalleryGrid />
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;
