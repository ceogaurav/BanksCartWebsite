import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Building, Globe, Users } from 'lucide-react';

const StatsSection: React.FC = () => {
  const stats = [
    {
      icon: Globe,
      number: '36',
      label: 'States & UTs',
      description: 'Complete coverage across India',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Building,
      number: '700+',
      label: 'Districts',
      description: 'All districts included',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: MapPin,
      number: '19,000+',
      label: 'Pincodes',
      description: 'Comprehensive database',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Users,
      number: '1M+',
      label: 'Searches',
      description: 'Trusted by users daily',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Pincode Database
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Access the most complete and up-to-date pincode information for all of India
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="relative group"
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-center border border-gray-100 overflow-hidden">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${stat.color} text-white mb-4 shadow-lg`}
                >
                  <stat.icon className="h-8 w-8" />
                </motion.div>

                {/* Number */}
                <motion.h3
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  className="text-4xl font-bold text-gray-900 mb-2"
                >
                  {stat.number}
                </motion.h3>

                {/* Label */}
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  {stat.label}
                </h4>

                {/* Description */}
                <p className="text-gray-600 text-sm">
                  {stat.description}
                </p>

                {/* Hover Effect */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  layoutId={`stat-${index}`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Why Choose BanksCart Pincode Finder?
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="flex items-start space-x-3">
                <div className="bg-primary-100 p-2 rounded-lg flex-shrink-0">
                  <MapPin className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Accurate Data</h4>
                  <p className="text-gray-600 text-sm">Regularly updated and verified pincode information</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 p-2 rounded-lg flex-shrink-0">
                  <Building className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Fast Search</h4>
                  <p className="text-gray-600 text-sm">Lightning-fast search across millions of records</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-purple-100 p-2 rounded-lg flex-shrink-0">
                  <Globe className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Complete Coverage</h4>
                  <p className="text-gray-600 text-sm">Every state, district, and city across India</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;