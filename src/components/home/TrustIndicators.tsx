import React from 'react';
import { Shield, Users, Award, CheckCircle, Clock, Star } from 'lucide-react';

const TrustIndicators: React.FC = () => {
  const stats = [
    {
      icon: Users,
      value: '50L+',
      label: 'Happy Customers',
      description: 'Served across India',
    },
    {
      icon: Award,
      value: '₹10,000Cr+',
      label: 'Loans Facilitated',
      description: 'Total loan amount processed',
    },
    {
      icon: CheckCircle,
      value: '95%',
      label: 'Approval Rate',
      description: 'Successful loan approvals',
    },
    {
      icon: Clock,
      value: '24 Hours',
      label: 'Quick Processing',
      description: 'Average approval time',
    },
  ];

  const certifications = [
    {
      icon: Shield,
      title: 'SSL Secured',
      description: '256-bit encryption',
    },
    {
      icon: Star,
      title: 'ISO Certified',
      description: 'Quality management',
    },
    {
      icon: CheckCircle,
      title: 'RBI Guidelines',
      description: 'Compliant platform',
    },
  ];

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Trusted by Millions
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            India's most reliable loan comparison platform with industry-leading security
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center group">
                <div className="bg-primary-600 p-4 rounded-full w-16 h-16 mx-auto mb-4 group-hover:bg-secondary-600 transition-colors">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-gray-300 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-400">{stat.description}</div>
              </div>
            );
          })}
        </div>

        {/* Certifications */}
        <div className="border-t border-gray-800 pt-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">
              Security & Certifications
            </h3>
            <p className="text-gray-300">
              Your data and privacy are our top priority
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certifications.map((cert, index) => {
              const Icon = cert.icon;
              return (
                <div key={index} className="flex items-center space-x-4 bg-gray-800 p-6 rounded-lg">
                  <div className="bg-primary-600 p-3 rounded-lg">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-white">{cert.title}</div>
                    <div className="text-gray-400">{cert.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-100 mb-6">
              Join millions of Indians who trust BanksCart for their loan needs
            </p>
            <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Your Loan Journey
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;