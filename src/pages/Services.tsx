import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { Camera, Heart, Users, Sun } from 'lucide-react';
import weddingImage from '@/assets/wedding-couple.jpg';
import maternityImage from '@/assets/maternity-portrait.jpg';
import familyImage from '@/assets/family-portrait.jpg';
import heroImage from '@/assets/hero-wedding.jpg';

const services = [
  {
    icon: Heart,
    title: 'Wedding Photography',
    description: 'Your love story deserves to be captured with artistry and authenticity. From the anticipation of getting ready to the last dance of the night, we document every precious moment of your special day.',
    image: weddingImage,
    features: ['Full day coverage', 'Second photographer', 'Online gallery', 'High-resolution images'],
  },
  {
    icon: Users,
    title: 'Event Coverage',
    description: 'From corporate gatherings to milestone celebrations, we capture the energy and essence of your events. Our unobtrusive approach ensures natural, candid moments are preserved.',
    image: heroImage,
    features: ['Flexible hours', 'Quick turnaround', 'Professional editing', 'Multiple formats'],
  },
  {
    icon: Camera,
    title: 'Studio Portraits',
    description: 'Professional headshots and creative portraits in our fully-equipped studio. Perfect lighting, beautiful backdrops, and expert direction to capture your best self.',
    image: maternityImage,
    features: ['Professional lighting', 'Multiple setups', 'Wardrobe consultation', 'Retouching included'],
  },
  {
    icon: Sun,
    title: 'Outdoor Shoots',
    description: 'There\'s nothing quite like natural light and beautiful outdoor locations. Whether it\'s a sun-drenched field or a dramatic mountain backdrop, we find the perfect setting for your story.',
    image: familyImage,
    features: ['Location scouting', 'Golden hour timing', 'Family sessions', 'Couples sessions'],
  },
];

const Services: React.FC = () => {
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
              What We Offer
            </p>
            <h1 className="heading-display mb-6">Our Services</h1>
            <p className="max-w-2xl mx-auto text-muted-foreground">
              From intimate portraits to grand celebrations, we offer a range of photography 
              services tailored to capture your most meaningful moments with artistry and care.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding">
        <div className="container-boxed">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 last:mb-0 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="inline-flex items-center justify-center w-12 h-12 border border-border rounded-full mb-6">
                  <service.icon className="w-5 h-5 text-gold" />
                </div>
                <h2 className="heading-section mb-6">{service.title}</h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  {service.description}
                </p>
                <ul className="grid grid-cols-2 gap-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                <div className="aspect-[4/5] image-frame">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-secondary">
        <div className="container-boxed text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="heading-section mb-6">Ready to Create Something Beautiful?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Let's discuss how we can capture your special moments. We'd love to hear about 
              your vision and create something truly memorable together.
            </p>
            <a href="/contact" className="btn-elegant">
              Get in Touch
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
