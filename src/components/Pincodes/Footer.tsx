import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Globe, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-1 md:col-span-2"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-primary-600 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">BanksCart</h3>
                <p className="text-gray-300">Pincode Finder</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your trusted source for accurate and comprehensive pincode information across India. 
              Find any pincode instantly with our advanced search technology.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Mail, href: 'mailto:info@bankscart.com' },
                { icon: Phone, href: 'tel:+911234567890' },
                { icon: Globe, href: 'https://bankscart.com' }
              ].map((contact, index) => (
                <motion.a
                  key={index}
                  href={contact.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-gray-700 p-3 rounded-full hover:bg-primary-600 transition-colors duration-300"
                >
                  <contact.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                'Search Pincode',
                'All States',
                'Popular Cities',
                'About Us',
                'Contact',
                'Privacy Policy'
              ].map((link, index) => (
                <motion.li key={link}>
                  <motion.a
                    href="#"
                    whileHover={{ x: 5 }}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200 block py-1"
                  >
                    {link}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Popular States */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4">Popular States</h4>
            <ul className="space-y-2">
              {[
                'Maharashtra',
                'Delhi',
                'Karnataka',
                'Tamil Nadu',
                'West Bengal',
                'Gujarat'
              ].map((state, index) => (
                <motion.li key={state}>
                  <motion.a
                    href="#"
                    whileHover={{ x: 5 }}
                    className="text-gray-300 hover:text-primary-400 transition-colors duration-200 block py-1"
                  >
                    {state}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-gray-700 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm mb-4 md:mb-0">
              © {currentYear} BanksCart. All rights reserved.
            </p>
            <motion.div 
              className="flex items-center space-x-2 text-gray-300 text-sm"
              whileHover={{ scale: 1.05 }}
            >
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="h-4 w-4 text-red-500 fill-current" />
              </motion.div>
              <span>in India</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;