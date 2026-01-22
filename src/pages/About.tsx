import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import aboutImage from '@/assets/about-photographer.jpg';
import weddingImage from '@/assets/wedding-couple.jpg';

const About: React.FC = () => {
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
              Our Story
            </p>
            <h1 className="heading-display mb-6">About Us</h1>
            <p className="max-w-2xl mx-auto text-muted-foreground">
              Passion meets artistry in every frame we capture.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Studio Description */}
      <section className="section-padding">
        <div className="container-boxed">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="aspect-[4/5] image-frame">
                <img 
                  src={aboutImage} 
                  alt="About Savanna Photo Studio" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
                Welcome to
              </p>
              <h2 className="heading-section mb-6">Savanna Photo Studio</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Nestled in the heart of creativity, Savanna Photo Studio has been telling 
                visual stories for over a decade. What started as a passion project has 
                blossomed into a full-service photography studio dedicated to capturing 
                life's most precious moments.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Our team of skilled photographers brings together diverse perspectives 
                and techniques, united by a shared commitment to excellence. We believe 
                that every client deserves photographs that not only document moments 
                but truly capture the essence of who they are and the love they share.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="section-padding bg-secondary">
        <div className="container-boxed">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="heading-section mb-6">Our Experience</h2>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '10+', label: 'Years Experience' },
              { number: '500+', label: 'Weddings Captured' },
              { number: '1000+', label: 'Happy Clients' },
              { number: '50K+', label: 'Photos Delivered' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="font-heading text-4xl md:text-5xl text-gold mb-2">
                  {stat.number}
                </div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding">
        <div className="container-boxed">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
                Our Approach
              </p>
              <h2 className="heading-section mb-6">Photography Philosophy</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We believe in the power of authenticity. Our approach is to blend into the 
                background, becoming a silent observer who captures genuine moments as they 
                unfold. No forced poses, no artificial smiles—just real emotions and 
                authentic connections.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Light is our medium, and emotion is our subject. We chase the golden hour 
                and embrace the soft shadows. We find beauty in the quiet moments—a stolen 
                glance, a gentle touch, a tear of joy.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Every photograph we create is a collaboration between us and our clients. 
                We take the time to understand your story, your vision, and your dreams, 
                ensuring that each image reflects who you truly are.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <div className="aspect-[4/5] image-frame">
                <img 
                  src={weddingImage} 
                  alt="Our photography philosophy" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-secondary">
        <div className="container-boxed text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="heading-section mb-6">What We Value</h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Authenticity',
                description: 'We capture real moments, real emotions, and real connections. No pretense, just pure, genuine photography.',
              },
              {
                title: 'Artistry',
                description: 'Each photograph is crafted with intention and care, blending technical excellence with creative vision.',
              },
              {
                title: 'Connection',
                description: 'We build relationships with our clients, ensuring a comfortable experience that translates into natural, beautiful images.',
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-8 border border-border"
              >
                <h3 className="font-heading text-xl mb-4">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
