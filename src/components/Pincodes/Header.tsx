import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Search } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white shadow-2xl"
    >
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">BanksCart</h1>
              <p className="text-primary-100 text-sm font-medium">Pincode Finder</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="hidden md:flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Search className="h-5 w-5 text-primary-200" />
            <span className="text-primary-100 text-sm">Find any pincode in India</span>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;