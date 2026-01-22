import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import Slideshow from '@/components/home/Slideshow';
import weddingImage from '@/assets/wedding-couple.jpg';
import maternityImage from '@/assets/maternity-portrait.jpg';
import familyImage from '@/assets/family-portrait.jpg';
import aboutImage from '@/assets/about-photographer.jpg';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const Index: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section with Slideshow */}
      <section className="relative">
        <div className="container-boxed py-8">
          <Slideshow />
          <div className="text-center mt-8">
            <motion.p 
              {...fadeInUp}
              className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4"
            >
              Wedding & Lifestyle Photographer
            </motion.p>
            <motion.h1 
              {...fadeInUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="heading-display mb-6"
            >
              Capturing the Beauty of Life
            </motion.h1>
            <motion.div 
              {...fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link to="/contact" className="btn-elegant">
                Inquire Now
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="section-padding bg-secondary">
        <div className="container-boxed">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
                Here's to Life
              </p>
              <h2 className="heading-section mb-6">
                It's time to let people know that you are the business they have been searching for.
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Every moment tells a story. From the gentle touch of morning light to the 
                whispered vows of eternal love, we capture the beauty that lives in between 
                the seconds. Our lens finds poetry in the ordinary and magic in the mundane.
              </p>
              <p className="text-elegant">
                Capturing the beauty of life's memories
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/5] image-frame">
                <img 
                  src={weddingImage} 
                  alt="Wedding photography" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding">
        <div className="container-boxed">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="heading-section">Our Services</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Weddings', image: weddingImage },
              { title: 'Maternity', image: maternityImage },
              { title: 'Family', image: familyImage },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="aspect-[3/4] overflow-hidden image-frame mb-4">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-heading text-lg tracking-widest uppercase text-center">
                  {service.title}
                </h3>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-12"
          >
            <Link to="/services" className="btn-gold">
              See Packages
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="relative py-24 md:py-32">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${weddingImage})` }}
        />
        <div className="absolute inset-0 bg-background/85" />
        <div className="container-boxed relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
              This is the Perfect Place for Your Business
            </p>
            <h2 className="heading-display mb-8">Mission Statement</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground leading-relaxed">
              To preserve the fleeting moments that define our lives, transforming them into 
              timeless works of art. We believe every love story deserves to be told with 
              authenticity, creativity, and an unwavering attention to the details that make 
              each moment uniquely yours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section-padding bg-secondary">
        <div className="container-boxed text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-8">
              <img 
                src={aboutImage} 
                alt="Client testimonial" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
              It Was Just Divine Working With Them!
            </p>
            <blockquote className="text-lg md:text-xl leading-relaxed text-muted-foreground mb-6">
              "From the very first meeting, we knew Savanna Photo Studio was special. They 
              captured our wedding day with such artistry and care. Every image tells our 
              story perfectly. We couldn't be happier with our photos!"
            </blockquote>
            <cite className="font-heading text-lg not-italic">— Sarah & Michael</cite>
          </motion.div>
        </div>
      </section>

      {/* About Preview */}
      <section className="section-padding">
        <div className="container-boxed">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1 relative"
            >
              <div className="aspect-[4/5] image-frame">
                <img 
                  src={aboutImage} 
                  alt="About the photographer" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
                Nice to Meet You
              </p>
              <h2 className="heading-section mb-6">
                Oh, Hello
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Welcome to Savanna Photo Studio. With over a decade of experience capturing 
                life's most precious moments, we've developed a signature style that blends 
                natural light, authentic emotion, and artistic vision. We believe in the 
                power of photography to preserve memories that will be treasured for generations.
              </p>
              <Link to="/about" className="btn-elegant">
                Learn More
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
