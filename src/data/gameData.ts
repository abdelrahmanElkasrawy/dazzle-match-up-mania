
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
  { id: 'photographer', name: 'Photographer', icon: '📸' },
  { id: 'venue', name: 'Venue', icon: '🏛️' },
  { id: 'planner', name: 'Wedding Planner', icon: '📋' },
  { id: 'decorator', name: 'Decorator', icon: '🎨' },
  { id: 'bakery', name: 'Bakery', icon: '🎂' },
  { id: 'transport', name: 'Transportation', icon: '🚗' },
  { id: 'makeup', name: 'Makeup Artist', icon: '💄' },
  { id: 'jewelry', name: 'Jeweler', icon: '💍' },
  { id: 'stationery', name: 'Stationery Designer', icon: '✉️' },
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
  { 
    id: 'crm', 
    name: 'Client Relationship Manager', 
    description: 'Track client interactions and follow-ups',
    icon: '👥'
  },
  { 
    id: 'onlineBooking', 
    name: 'Online Booking System', 
    description: 'Let clients book appointments directly',
    icon: '🗓️'
  },
];

// Game scenarios - updated to be more realistic
export const scenarios: Scenario[] = [
  {
    id: 'wedding-luxury',
    title: 'Luxury Destination Wedding',
    description: 'A couple is planning a lavish wedding at a luxury resort in Bali with 150 guests.',
    providers: [
      providers.find(p => p.id === 'planner')!,
      providers.find(p => p.id === 'photographer')!,
      providers.find(p => p.id === 'venue')!,
    ],
    features: [
      features.find(f => f.id === 'portfolio')!,
      features.find(f => f.id === 'calendar')!,
      features.find(f => f.id === 'messaging')!,
      features.find(f => f.id === 'reviews')!,
      features.find(f => f.id === 'contracts')!,
    ],
    correctMatches: {
      'planner': 'messaging',
      'photographer': 'portfolio',
      'venue': 'calendar',
    }
  },
  {
    id: 'corporate-product-launch',
    title: 'Tech Product Launch Event',
    description: 'A major tech company is unveiling their new flagship product with a high-profile event for 300 attendees.',
    providers: [
      providers.find(p => p.id === 'caterer')!,
      providers.find(p => p.id === 'venue')!,
      providers.find(p => p.id === 'decorator')!,
    ],
    features: [
      features.find(f => f.id === 'packages')!,
      features.find(f => f.id === 'inventory')!,
      features.find(f => f.id === 'contracts')!,
      features.find(f => f.id === 'analytics')!,
      features.find(f => f.id === 'portfolio')!,
    ],
    correctMatches: {
      'caterer': 'inventory',
      'venue': 'contracts',
      'decorator': 'portfolio',
    }
  },
  {
    id: 'milestone-birthday',
    title: '50th Birthday Celebration',
    description: 'A surprise 50th birthday party at an upscale restaurant with custom decor and catering for 75 guests.',
    providers: [
      providers.find(p => p.id === 'bakery')!,
      providers.find(p => p.id === 'decorator')!,
      providers.find(p => p.id === 'caterer')!,
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
      'decorator': 'packages',
      'caterer': 'inventory',
    }
  },
  {
    id: 'charity-gala',
    title: 'Annual Charity Fundraiser',
    description: 'A black-tie charity gala aiming to raise $500,000 for a local children\'s hospital with 400 attendees.',
    providers: [
      providers.find(p => p.id === 'venue')!,
      providers.find(p => p.id === 'caterer')!,
      providers.find(p => p.id === 'planner')!,
    ],
    features: [
      features.find(f => f.id === 'analytics')!,
      features.find(f => f.id === 'messaging')!,
      features.find(f => f.id === 'contracts')!,
      features.find(f => f.id === 'reviews')!,
      features.find(f => f.id === 'crm')!,
    ],
    correctMatches: {
      'venue': 'contracts',
      'caterer': 'analytics',
      'planner': 'crm',
    }
  },
  {
    id: 'intimate-wedding',
    title: 'Intimate Garden Wedding',
    description: 'A couple is planning a romantic garden wedding with only 30 close family members and friends.',
    providers: [
      providers.find(p => p.id === 'florist')!,
      providers.find(p => p.id === 'photographer')!,
      providers.find(p => p.id === 'makeup')!,
    ],
    features: [
      features.find(f => f.id === 'portfolio')!,
      features.find(f => f.id === 'onlineBooking')!,
      features.find(f => f.id === 'payments')!,
      features.find(f => f.id === 'messaging')!,
      features.find(f => f.id === 'reviews')!,
    ],
    correctMatches: {
      'florist': 'portfolio',
      'photographer': 'onlineBooking',
      'makeup': 'reviews',
    }
  },
  {
    id: 'corporate-retreat',
    title: 'Corporate Team Retreat',
    description: 'A tech startup is planning a 3-day team-building retreat with activities and workshops for 50 employees.',
    providers: [
      providers.find(p => p.id === 'venue')!,
      providers.find(p => p.id === 'caterer')!,
      providers.find(p => p.id === 'transport')!,
    ],
    features: [
      features.find(f => f.id === 'packages')!,
      features.find(f => f.id === 'calendar')!,
      features.find(f => f.id === 'contracts')!,
      features.find(f => f.id === 'analytics')!,
      features.find(f => f.id === 'messaging')!,
    ],
    correctMatches: {
      'venue': 'packages',
      'caterer': 'calendar',
      'transport': 'contracts',
    }
  },
  {
    id: 'wedding-traditional',
    title: 'Traditional Cultural Wedding',
    description: 'A couple is planning a large traditional wedding that honors their cultural heritage with 250 guests.',
    providers: [
      providers.find(p => p.id === 'stationery')!,
      providers.find(p => p.id === 'jewelry')!,
      providers.find(p => p.id === 'decorator')!,
    ],
    features: [
      features.find(f => f.id === 'portfolio')!,
      features.find(f => f.id === 'calendar')!,
      features.find(f => f.id === 'payments')!,
      features.find(f => f.id === 'crm')!,
      features.find(f => f.id === 'packages')!,
    ],
    correctMatches: {
      'stationery': 'crm',
      'jewelry': 'portfolio',
      'decorator': 'packages',
    }
  },
];

// Medal thresholds
export const medals: Medal[] = [
  { type: 'dazzify-star', threshold: 6 }, // 6-7 correct
  { type: 'smart-planner', threshold: 3 }, // 3-5 correct
  { type: 'first-booking', threshold: 0 }, // 0-2 correct
];

// Get medal based on score
export const getMedalForScore = (score: number): Medal['type'] => {
  if (score >= medals[0].threshold) return medals[0].type;
  if (score >= medals[1].threshold) return medals[1].type;
  return medals[2].type;
};
