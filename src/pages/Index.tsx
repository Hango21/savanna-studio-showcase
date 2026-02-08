import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import Slideshow from '@/components/home/Slideshow';
import weddingImage from '@/assets/wedding-couple.jpg';
import maternityImage from '@/assets/maternity-portrait.jpg';
import familyImage from '@/assets/family-portrait.jpg';
import aboutImage from '@/assets/about-photographer.jpg';

import { API_ENDPOINTS } from '@/config/api';
import axios from 'axios';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const Index: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const [settings, setSettings] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.settings);
        const settingsMap = response.data.reduce((acc: any, curr: any) => {
          acc[curr.key] = curr.value;
          return acc;
        }, {});
        setSettings(settingsMap);
      } catch (err) {
        console.error('Error fetching settings:', err);
      }
    };
    fetchSettings();
  }, []);

  // Parallax transforms
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  const missionY = useTransform(scrollYProgress, [0.3, 0.6], [0, -80]);
  const missionScale = useTransform(scrollYProgress, [0.35, 0.5], [1, 1.05]);

  return (
    <Layout>
      {/* Hero Section with Slideshow */}
      <section className="relative overflow-hidden">
        {settings.home_hero_top && (
          <div
            className="absolute inset-0 z-0 opacity-20 blur-sm pointer-events-none"
            style={{
              backgroundImage: `url(${settings.home_hero_top})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        )}
        <motion.div
          style={{ y: heroY }}
          className="container-boxed py-8 relative z-10"
        >
          <Slideshow />
          <motion.div
            className="text-center mt-8"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.p
              variants={fadeInUp}
              className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4"
            >
              Wedding & Lifestyle Photographer
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="heading-display mb-6"
            >
              Capturing the Beauty of Life
            </motion.h1>
            <motion.div variants={fadeInUp}>
              <Link to="/contact" className="btn-elegant">
                Inquire Now
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Intro Section */}
      <section className="section-padding bg-secondary overflow-hidden">
        <div className="container-boxed">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4"
              >
                Here's to Life
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="heading-section mb-6"
              >
                It's time to let people know that you are the business they have been searching for.
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-muted-foreground leading-relaxed mb-8"
              >
                Every moment tells a story. From the gentle touch of morning light to the
                whispered vows of eternal love, we capture the beauty that lives in between
                the seconds. Our lens finds poetry in the ordinary and magic in the mundane.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-elegant"
              >
                Capturing the beauty of life's memories
              </motion.p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="relative"
            >
              <motion.div
                className="aspect-[4/5] image-frame"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src={settings.home_intro_image || weddingImage}
                  alt="Wedding photography"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              {/* Decorative element */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -bottom-4 -right-4 w-24 h-24 border border-gold/30 -z-10"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section-padding overflow-hidden">
        <div className="container-boxed">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <h2 className="heading-section">Our Services</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Weddings', image: settings.home_service_weddings || weddingImage },
              { title: 'Maternity', image: settings.home_service_maternity || maternityImage },
              { title: 'Family', image: settings.home_service_family || familyImage },
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="group cursor-pointer"
              >
                <motion.div
                  className="aspect-[3/4] overflow-hidden image-frame mb-4"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.div>
                <motion.h3
                  className="font-heading text-lg tracking-widest uppercase text-center"
                  whileHover={{ letterSpacing: '0.2em' }}
                  transition={{ duration: 0.3 }}
                >
                  {service.title}
                </motion.h3>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link to="/services" className="btn-gold">
              See Packages
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement - Parallax Section */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${settings.home_mission_bg || weddingImage})`,
            y: missionY,
            scale: missionScale
          }}
        />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px]" />
        <div className="container-boxed relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4"
            >
              This is the Perfect Place for Your Business
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="heading-display mb-8"
            >
              Mission Statement
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-2xl mx-auto text-muted-foreground leading-relaxed"
            >
              To preserve the fleeting moments that define our lives, transforming them into
              timeless works of art. We believe every love story deserves to be told with
              authenticity, creativity, and an unwavering attention to the details that make
              each moment uniquely yours.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section-padding bg-secondary overflow-hidden">
        <div className="container-boxed text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-8 ring-2 ring-gold/20 ring-offset-4 ring-offset-secondary"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={settings.home_testimonial_avatar || aboutImage}
                alt="Client testimonial"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4"
            >
              It Was Just Divine Working With Them!
            </motion.p>
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-xl leading-relaxed text-muted-foreground mb-6 italic"
            >
              "From the very first meeting, we knew Savanna Photo Studio was special. They
              captured our wedding day with such artistry and care. Every image tells our
              story perfectly. We couldn't be happier with our photos!"
            </motion.blockquote>
            <motion.cite
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-heading text-lg not-italic"
            >
              — Sarah & Michael
            </motion.cite>
          </motion.div>
        </div>
      </section>

      {/* About Preview */}
      <section className="section-padding overflow-hidden">
        <div className="container-boxed">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60, rotate: -2 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="order-2 lg:order-1 relative"
            >
              <motion.div
                className="aspect-[4/5] image-frame"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <img
                  src={settings.home_about_image || aboutImage}
                  alt="About the photographer"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              {/* Decorative element */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -top-4 -left-4 w-32 h-32 border border-gold/30 -z-10"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4"
              >
                Nice to Meet You
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="heading-section mb-6"
              >
                Oh, Hello
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-muted-foreground leading-relaxed mb-8"
              >
                Welcome to Savanna Photo Studio. With over a decade of experience capturing
                life's most precious moments, we've developed a signature style that blends
                natural light, authentic emotion, and artistic vision. We believe in the
                power of photography to preserve memories that will be treasured for generations.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Link to="/about" className="btn-elegant">
                  Learn More
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
