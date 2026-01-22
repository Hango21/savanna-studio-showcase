import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { Phone, Mail, MapPin, MessageCircle, Instagram, Facebook } from 'lucide-react';

const Contact: React.FC = () => {
  const phoneNumber = '+1 (555) 123-4567';
  const whatsappNumber = '15551234567';
  const email = 'hello@savannaphoto.com';

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
              Get in Touch
            </p>
            <h1 className="heading-display mb-6">Contact Us</h1>
            <p className="max-w-2xl mx-auto text-muted-foreground">
              We'd love to hear from you. Reach out to discuss your photography needs 
              or simply say hello.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="section-padding">
        <div className="container-boxed">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact Details */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="heading-section mb-8">Reach Out</h2>
                
                <div className="space-y-6">
                  {/* Phone */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 border border-border rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Phone</h3>
                      <a 
                        href={`tel:${phoneNumber}`}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {phoneNumber}
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 border border-border rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">WhatsApp</h3>
                      <a 
                        href={`https://wa.me/${whatsappNumber}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-[#25D366] text-primary-foreground text-sm rounded transition-opacity hover:opacity-90"
                      >
                        Chat on WhatsApp
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 border border-border rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <a 
                        href={`mailto:${email}`}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {email}
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 border border-border rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Studio Location</h3>
                      <p className="text-muted-foreground">
                        123 Photography Lane<br />
                        Creative District, CD 12345
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Social & Hours */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="heading-section mb-8">Connect</h2>
                
                {/* Social Links */}
                <div className="mb-12">
                  <h3 className="font-medium mb-4">Follow Us</h3>
                  <div className="flex items-center space-x-4">
                    <a 
                      href="https://instagram.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a 
                      href="https://facebook.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Studio Hours */}
                <div>
                  <h3 className="font-medium mb-4">Studio Hours</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span>10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span>By Appointment</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
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
            <h2 className="heading-section mb-6">Let's Create Something Beautiful</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Whether you're planning a wedding, looking for family portraits, or need 
              professional event coverage, we're here to bring your vision to life.
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
