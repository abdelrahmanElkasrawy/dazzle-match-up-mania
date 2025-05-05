
import React from 'react';
import { Button } from '@/components/ui/button';
import DazzifyLogo from '../logo/DazzifyLogo';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

interface ServicesScreenProps {
  onPlayAgain: () => void;
}

const ServicesScreen: React.FC<ServicesScreenProps> = ({ onPlayAgain }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light to-primary p-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center text-white mb-12 pt-8">
          <DazzifyLogo size="lg" className="mb-6" />
          <h1 className="text-4xl font-bold mb-4">Discover Dazzify Services</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Supercharge your event business with our powerful platform designed for service providers
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <ServiceCard 
            icon="📊"
            title="Business Analytics"
            description="Gain valuable insights into your business performance with comprehensive analytics and reporting tools."
          />
          <ServiceCard 
            icon="📅"
            title="Smart Scheduling"
            description="Never double-book again with our intelligent calendar system that synchronizes across all your devices."
          />
          <ServiceCard 
            icon="💳"
            title="Flexible Payments"
            description="Accept payments your way with support for installments, deposits, and multiple payment methods."
          />
          <ServiceCard 
            icon="🤝"
            title="Client Management"
            description="Build stronger relationships with a complete CRM system designed specifically for event professionals."
          />
          <ServiceCard 
            icon="📱"
            title="Mobile App"
            description="Manage your business on the go with our powerful mobile application available for iOS and Android."
          />
          <ServiceCard 
            icon="🔎"
            title="Enhanced Visibility"
            description="Get discovered by more clients with our advanced search and matching algorithms."
          />
        </div>
        
        <div className="text-center mb-16">
          <Button
            onClick={onPlayAgain}
            className="bg-secondary hover:bg-secondary-light text-primary font-bold text-lg px-8 py-4 rounded-full"
          >
            <span className="mr-2">🔁</span>
            Play Again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServicesScreen;
