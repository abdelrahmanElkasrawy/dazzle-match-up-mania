
export interface Provider {
  id: string;
  name: string;
  icon: string;
}

export interface Feature {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  providers: Provider[];
  features: Feature[];
  correctMatches: Record<string, string>; // providerId: featureId
}

export interface Medal {
  type: 'dazzify-star' | 'smart-planner' | 'first-booking';
  threshold: number; // minimum correct matches needed
}

// Available service providers
export const providers: Provider[] = [
  { id: 'florist', name: 'Florist', icon: '🌸' },
  { id: 'caterer', name: 'Caterer', icon: '🍽️' },
  { id: 'dj', name: 'DJ', icon: '🎧' },
  { id: 'photographer', name: 'Photographer', icon: '📸' },
  { id: 'venue', name: 'Venue', icon: '🏛️' },
  { id: 'planner', name: 'Wedding Planner', icon: '📋' },
  { id: 'decorator', name: 'Decorator', icon: '🎨' },
  { id: 'bakery', name: 'Bakery', icon: '🎂' },
  { id: 'transport', name: 'Transportation', icon: '🚗' },
];

// Available Dazzify features
export const features: Feature[] = [
  { 
    id: 'portfolio', 
    name: 'Portfolio with Videos', 
    description: 'Showcase your work with high-quality photos and videos',
    icon: '📷'
  },
  { 
    id: 'payments', 
    name: 'Installment Payments', 
    description: 'Allow clients to pay in convenient installments',
    icon: '💳'
  },
  { 
    id: 'calendar', 
    name: 'Availability Calendar', 
    description: 'Show clients your open dates in real-time',
    icon: '📅'
  },
  { 
    id: 'messaging', 
    name: 'Client Messaging', 
    description: 'Communicate directly with clients through the platform',
    icon: '💬'
  },
  { 
    id: 'reviews', 
    name: 'Verified Reviews', 
    description: 'Build trust with authentic client testimonials',
    icon: '⭐'
  },
  { 
    id: 'contracts', 
    name: 'Digital Contracts', 
    description: 'Create and sign contracts online',
    icon: '📝'
  },
  { 
    id: 'packages', 
    name: 'Custom Packages', 
    description: 'Create tailored service bundles for different client needs',
    icon: '🎁'
  },
  { 
    id: 'inventory', 
    name: 'Inventory Management', 
    description: 'Track your inventory in real-time',
    icon: '📦'
  },
  { 
    id: 'analytics', 
    name: 'Business Analytics', 
    description: 'Gain insights into your business performance',
    icon: '📊'
  },
];

// Game scenarios
export const scenarios: Scenario[] = [
  {
    id: 'wedding-desert',
    title: 'Wedding in the Desert',
    description: 'A couple wants a sunset desert wedding with romantic vibes.',
    providers: [
      providers.find(p => p.id === 'florist')!,
      providers.find(p => p.id === 'photographer')!,
      providers.find(p => p.id === 'venue')!,
    ],
    features: [
      features.find(f => f.id === 'portfolio')!,
      features.find(f => f.id === 'calendar')!,
      features.find(f => f.id === 'payments')!,
      features.find(f => f.id === 'messaging')!,
      features.find(f => f.id === 'reviews')!,
    ],
    correctMatches: {
      'florist': 'portfolio',
      'photographer': 'calendar',
      'venue': 'reviews',
    }
  },
  {
    id: 'corporate-launch',
    title: 'Corporate Launch Party',
    description: 'A tech startup wants to make a splash with their product launch event.',
    providers: [
      providers.find(p => p.id === 'caterer')!,
      providers.find(p => p.id === 'dj')!,
      providers.find(p => p.id === 'venue')!,
    ],
    features: [
      features.find(f => f.id === 'packages')!,
      features.find(f => f.id === 'contracts')!,
      features.find(f => f.id === 'portfolio')!,
      features.find(f => f.id === 'messaging')!,
      features.find(f => f.id === 'calendar')!,
    ],
    correctMatches: {
      'caterer': 'packages',
      'dj': 'portfolio',
      'venue': 'contracts',
    }
  },
  {
    id: 'birthday-celebration',
    title: 'Birthday Celebration',
    description: 'A milestone birthday party with 100 guests and a themed evening.',
    providers: [
      providers.find(p => p.id === 'bakery')!,
      providers.find(p => p.id === 'decorator')!,
      providers.find(p => p.id === 'dj')!,
    ],
    features: [
      features.find(f => f.id === 'portfolio')!,
      features.find(f => f.id === 'payments')!,
      features.find(f => f.id === 'calendar')!,
      features.find(f => f.id === 'inventory')!,
      features.find(f => f.id === 'packages')!,
    ],
    correctMatches: {
      'bakery': 'portfolio',
      'decorator': 'inventory',
      'dj': 'packages',
    }
  },
  {
    id: 'outdoor-festival',
    title: 'Outdoor Music Festival',
    description: 'A weekend music festival with multiple stages and food vendors.',
    providers: [
      providers.find(p => p.id === 'caterer')!,
      providers.find(p => p.id === 'transport')!,
      providers.find(p => p.id === 'venue')!,
    ],
    features: [
      features.find(f => f.id === 'inventory')!,
      features.find(f => f.id === 'calendar')!,
      features.find(f => f.id === 'analytics')!,
      features.find(f => f.id === 'contracts')!,
      features.find(f => f.id === 'payments')!,
    ],
    correctMatches: {
      'caterer': 'inventory',
      'transport': 'calendar',
      'venue': 'contracts',
    }
  },
  {
    id: 'elegant-wedding',
    title: 'Elegant Ballroom Wedding',
    description: 'A sophisticated wedding in a historic ballroom with 200 guests.',
    providers: [
      providers.find(p => p.id === 'planner')!,
      providers.find(p => p.id === 'florist')!,
      providers.find(p => p.id === 'caterer')!,
    ],
    features: [
      features.find(f => f.id === 'messaging')!,
      features.find(f => f.id === 'packages')!,
      features.find(f => f.id === 'reviews')!,
      features.find(f => f.id === 'portfolio')!,
      features.find(f => f.id === 'analytics')!,
    ],
    correctMatches: {
      'planner': 'messaging',
      'florist': 'portfolio',
      'caterer': 'reviews',
    }
  },
  {
    id: 'charity-gala',
    title: 'Charity Fundraising Gala',
    description: 'An upscale evening event raising money for a local charity.',
    providers: [
      providers.find(p => p.id === 'venue')!,
      providers.find(p => p.id === 'caterer')!,
      providers.find(p => p.id === 'planner')!,
    ],
    features: [
      features.find(f => f.id === 'contracts')!,
      features.find(f => f.id === 'analytics')!,
      features.find(f => f.id === 'packages')!,
      features.find(f => f.id === 'payments')!,
      features.find(f => f.id === 'portfolio')!,
    ],
    correctMatches: {
      'venue': 'contracts',
      'caterer': 'packages',
      'planner': 'analytics',
    }
  },
  {
    id: 'destination-wedding',
    title: 'Destination Beach Wedding',
    description: 'An intimate beachfront wedding with a small group of family and friends.',
    providers: [
      providers.find(p => p.id === 'photographer')!,
      providers.find(p => p.id === 'planner')!,
      providers.find(p => p.id === 'venue')!,
    ],
    features: [
      features.find(f => f.id === 'portfolio')!,
      features.find(f => f.id === 'calendar')!,
      features.find(f => f.id === 'messaging')!,
      features.find(f => f.id === 'payments')!,
      features.find(f => f.id === 'reviews')!,
    ],
    correctMatches: {
      'photographer': 'portfolio',
      'planner': 'messaging',
      'venue': 'reviews',
    }
  },
];

// Medal thresholds
export const medals: Medal[] = [
  { type: 'dazzify-star', threshold: 7 }, // Perfect score
  { type: 'smart-planner', threshold: 5 }, // 5-6 correct
  { type: 'first-booking', threshold: 0 }, // 4 or fewer correct
];

// Get medal based on score
export const getMedalForScore = (score: number): Medal['type'] => {
  if (score >= medals[0].threshold) return medals[0].type;
  if (score >= medals[1].threshold) return medals[1].type;
  return medals[2].type;
};
