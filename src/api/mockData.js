export const MOCK_DATABASE = {
  stats: {
    equipmentCount: '500+',
    areaSqFt: '15,000',
    rating: '4.9 ★',
    activeMembers: '3,200+'
  },
  classes: [
    {
      id: 'c1',
      title: 'Hypertrophy & Heavy Iron',
      category: 'Strength',
      intensity: 'Hardcore',
      duration: '60 min',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
      description: 'Targeted hypertrophy programming featuring custom hammer strength cages and Olympic platforms.'
    },
    {
      id: 'c2',
      title: 'Crossfit Power Arena',
      category: 'Crossfit',
      intensity: 'Extreme',
      duration: '45 min',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=800',
      description: 'High-intensity functional movements with bumper plates, plyo boxes, and rowers.'
    },
    {
      id: 'c3',
      title: 'Combat & Striking Boxing',
      category: 'Combat',
      intensity: 'High',
      duration: '50 min',
      image: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&q=80&w=800',
      description: 'Heavy bag drills, pad work, and agility conditioning for ultimate endurance.'
    },
    {
      id: 'c4',
      title: 'Olympic Powerlifting',
      category: 'Strength',
      intensity: 'Hardcore',
      duration: '75 min',
      image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=800',
      description: 'Master the squat, bench, and deadlift with competition-grade Eleiko steel plates.'
    }
  ],
  equipment: [
    {
      id: 'e1',
      title: '500+ Heavy Duty Machines',
      count: 'Full Floor Coverage',
      desc: 'Plate-loaded hammer strength machines, iso-lateral chest presses, cable crossovers, and hack squats.',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'e2',
      title: '12 Olympic Power Cages',
      count: 'Eleiko Calibrated Steel',
      desc: 'Competition bench racks, deadlift wooden platforms, and competition bumper plates up to 70kg.',
      image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'e3',
      title: 'Dumbbell Heavy Racks',
      count: 'Up to 70 KG',
      desc: 'Dual urethane dumbbell sets ranging from 2.5kg to 70kg with custom ergonomic knurling grips.',
      image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&q=80&w=800'
    }
  ],
  trainers: [
    {
      id: 't1',
      name: 'Vikram Singh',
      role: 'Head Strength & Powerlifting Coach',
      cert: 'CSCS® / Powerlifting Champion',
      exp: '12+ Years',
      image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&q=80&w=600',
      specialties: ['Hypertrophy', 'Squat/Bench Mechanics', 'Powerlifting']
    },
    {
      id: 't2',
      name: 'Priya Sharma',
      role: 'HIIT & Functional Fitness Specialist',
      cert: 'ACE Certified / Kettlebell Master',
      exp: '8 Years',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
      specialties: ['Metabolic Conditioning', 'Agility', 'Fat Loss']
    },
    {
      id: 't3',
      name: 'Rohan Verma',
      role: 'Mobility & Recovery Director',
      cert: 'M.Sc. Kinesiology / FRC®',
      exp: '10 Years',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
      specialties: ['Joint Health', 'Injury Rehabilitation', 'Flexibility']
    },
    {
      id: 't4',
      name: 'Ananya Iyer',
      role: 'Combat & Boxing Specialist',
      cert: 'National Boxing Gold Medalist',
      exp: '7 Years',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
      specialties: ['Boxing Technique', 'Footwork', 'High-Endurance Cardio']
    }
  ],
  pricing: [
    {
      id: 'p1',
      title: 'SILVER PASS',
      monthlyPrice: '₹1,999',
      annualPrice: '₹1,599',
      popular: false,
      perks: ['Full Gym Floor & Equipment Access', 'Standard Locker Room', 'App Workout Tracker', 'Open Floor Guidance']
    },
    {
      id: 'p2',
      title: 'GOLD PRO PASS',
      monthlyPrice: '₹3,999',
      annualPrice: '₹3,199',
      popular: true,
      perks: ['All Silver Perks', 'Unlimited Sauna & Recovery', '2 Personal Trainer Sessions/mo', 'Group Fitness & Combat Classes', 'Supplements 15% Discount']
    },
    {
      id: 'p3',
      title: 'PLATINUM VIP',
      monthlyPrice: '₹6,999',
      annualPrice: '₹5,599',
      popular: false,
      perks: ['All Gold Perks', 'VIP 24/7 Keycard Access', '1-on-1 Dedicated Master Coach', 'Guest Passes (4/mo)', 'Unlimited Protein Shake Bar']
    }
  ]
};
