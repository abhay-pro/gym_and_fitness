import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Flame,
  CheckCircle,
  Phone,
  MapPin,
  Lock,
  RefreshCw,
  Send,
  ChevronRight,
  Sparkles,
  Menu,
  X,
  ArrowUpRight
} from 'lucide-react';

const CLASSES_DATA = [
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
];

const TRAINERS_DATA = [
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
];

const EQUIPMENT_DATA = [
  {
    title: '500+ Heavy Duty Machines',
    count: 'Full Floor Coverage',
    desc: 'Plate-loaded hammer strength machines, iso-lateral chest presses, cable crossovers, and hack squats.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: '12 Olympic Power Cages',
    count: 'Eleiko Calibrated Steel',
    desc: 'Competition bench racks, deadlift wooden platforms, and competition bumper plates up to 70kg.',
    image: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Dumbbell Heavy Racks',
    count: 'Up to 70 KG',
    desc: 'Dual urethane dumbbell sets ranging from 2.5kg to 70kg with custom ergonomic knurling grips.',
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&q=80&w=800'
  }
];

const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  return input.replace(/[<>&"']/g, '').trim();
};

const calculateBMI = (heightCm, weightKg) => {
  const hInMeters = heightCm / 100;
  if (hInMeters <= 0) return '0.0';
  return (weightKg / (hInMeters * hInMeters)).toFixed(1);
};

const generateMathCaptcha = () => {
  const n1 = Math.floor(Math.random() * 9) + 1;
  const n2 = Math.floor(Math.random() * 9) + 1;
  return { num1: n1, num2: n2, answer: n1 + n2 };
};

const validateContactForm = (formData, captchaAnswer, honeypot) => {
  const errors = {};
  const nameRegex = /^[a-zA-Z\s]{2,50}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9+\-\s()]{7,15}$/;

  if (!nameRegex.test(sanitizeInput(formData.fullName))) {
    errors.fullName = 'Valid name required (letters only, min 2 chars).';
  }
  if (!emailRegex.test(sanitizeInput(formData.email))) {
    errors.email = 'Valid email address required.';
  }
  if (!phoneRegex.test(sanitizeInput(formData.phone))) {
    errors.phone = 'Valid phone number required.';
  }
  if (parseInt(formData.userCaptchaAnswer) !== captchaAnswer) {
    errors.userCaptchaAnswer = 'Incorrect math answer. Prove you are human.';
  }
  if (honeypot !== '') {
    errors.botDetected = 'Bot submission detected.';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
};

const EagleLogoSVG = ({ size = 64, className = '', glowing = true }) => {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      {glowing && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600/30 via-amber-500/20 to-red-600/30 blur-2xl animate-pulse" />
      )}
      <svg
        width={size}
        height={size}
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-full h-auto max-w-full drop-shadow-[0_10px_20px_rgba(255,42,42,0.3)] transition-transform duration-300 hover:scale-105"
        style={{ maxWidth: size, maxHeight: size }}
      >
        <defs>
          <linearGradient id="crimsonGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="30%" stopColor="#ff2a2a" />
            <stop offset="70%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#450a0a" />
          </linearGradient>

          <linearGradient id="featherFeatherLeft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff6b6b" />
            <stop offset="50%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          <linearGradient id="featherFeatherRight" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff6b6b" />
            <stop offset="50%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          <linearGradient id="beakGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>

          <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#ff2a2a" />
          </radialGradient>
        </defs>

        <circle cx="250" cy="250" r="220" stroke="url(#crimsonGoldGradient)" strokeWidth="3" strokeDasharray="12 6" opacity="0.4" />
        <circle cx="250" cy="250" r="235" stroke="#ff2a2a" strokeWidth="1.5" opacity="0.25" />

        {/* LEFT WING FEATHERS */}
        <g id="LeftWingOuter" opacity="0.95">
          <path d="M 230 260 L 60 120 C 30 150 20 200 40 250 L 190 280 Z" fill="url(#featherFeatherLeft)" />
          <path d="M 220 270 L 40 160 C 15 195 10 240 30 285 L 180 300 Z" fill="url(#featherFeatherLeft)" opacity="0.9" />
          <path d="M 210 280 L 20 200 C 5 240 10 280 25 320 L 170 310 Z" fill="url(#featherFeatherLeft)" opacity="0.85" />
          <path d="M 200 290 L 10 245 C 2 280 15 325 35 355 L 160 325 Z" fill="url(#featherFeatherLeft)" opacity="0.8" />
        </g>

        {/* RIGHT WING FEATHERS */}
        <g id="RightWingOuter" opacity="0.95">
          <path d="M 270 260 L 440 120 C 470 150 480 200 460 250 L 310 280 Z" fill="url(#featherFeatherRight)" />
          <path d="M 280 270 L 460 160 C 485 195 490 240 470 285 L 320 300 Z" fill="url(#featherFeatherRight)" opacity="0.9" />
          <path d="M 290 280 L 480 200 C 495 240 490 280 475 320 L 330 310 Z" fill="url(#featherFeatherRight)" opacity="0.85" />
          <path d="M 300 290 L 490 245 C 498 280 485 325 465 355 L 340 325 Z" fill="url(#featherFeatherRight)" opacity="0.8" />
        </g>

        {/* FEATHER RIBS */}
        <g id="FeatherDetails" stroke="url(#crimsonGoldGradient)" strokeWidth="2" opacity="0.8">
          <line x1="220" y1="260" x2="70" y2="135" />
          <line x1="210" y1="270" x2="50" y2="175" />
          <line x1="200" y1="280" x2="35" y2="215" />
          <line x1="280" y1="260" x2="430" y2="135" />
          <line x1="290" y1="270" x2="450" y2="175" />
          <line x1="300" y1="280" x2="465" y2="215" />
        </g>

        {/* BODY & CHEST PLUMAGE */}
        <path
          d="M 250 160 C 210 200 180 260 185 350 C 200 410 220 440 250 450 C 280 440 300 410 315 350 C 320 260 290 200 250 160 Z"
          fill="#0d0304"
          stroke="url(#crimsonGoldGradient)"
          strokeWidth="4"
        />

        <path d="M 250 220 L 210 280 L 250 300 L 290 280 Z" fill="url(#crimsonGoldGradient)" opacity="0.8" />
        <path d="M 250 280 L 200 340 L 250 365 L 300 340 Z" fill="url(#featherFeatherLeft)" opacity="0.8" />

        {/* FRONT FACING HEAD */}
        <path d="M 250 50 L 235 110 L 250 95 L 265 110 Z" fill="url(#crimsonGoldGradient)" />
        <path
          d="M 250 90 C 200 90 195 150 195 180 C 195 230 220 250 250 250 C 280 250 305 230 305 180 C 305 150 300 90 250 90 Z"
          fill="#180507"
          stroke="url(#crimsonGoldGradient)"
          strokeWidth="3"
        />

        <path d="M 195 150 L 250 170 L 305 150 L 250 110 Z" fill="#000" />
        <path d="M 200 152 Q 250 130 300 152 L 250 178 Z" fill="url(#crimsonGoldGradient)" opacity="0.9" />

        {/* EYES */}
        <polygon points="210,165 240,172 220,185" fill="#000" />
        <circle cx="225" cy="174" r="6" fill="url(#eyeGlow)" />
        <circle cx="225" cy="174" r="2.5" fill="#000" />

        <polygon points="290,165 260,172 280,185" fill="#000" />
        <circle cx="275" cy="174" r="6" fill="url(#eyeGlow)" />
        <circle cx="275" cy="174" r="2.5" fill="#000" />

        <path d="M 205 160 L 242 170" stroke="#fef08a" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M 295 160 L 258 170" stroke="#fef08a" strokeWidth="3.5" strokeLinecap="round" />

        {/* BEAK */}
        <path
          d="M 250 170 C 235 170 232 200 240 220 C 245 235 250 260 250 260 C 250 260 255 235 260 220 C 268 200 265 170 250 170 Z"
          fill="url(#beakGradient)"
          stroke="#78350f"
          strokeWidth="2"
        />

        {/* PERCH BAR */}
        <rect x="120" y="435" width="260" height="20" rx="10" fill="url(#crimsonGoldGradient)" />
        <rect x="90" y="420" width="30" height="50" rx="6" fill="#ff2a2a" />
        <rect x="380" y="420" width="30" height="50" rx="6" fill="#ff2a2a" />

        {/* CLAWS */}
        <path d="M 200 415 Q 205 435 210 445 M 212 415 Q 217 435 222 445" stroke="#fef08a" strokeWidth="5" strokeLinecap="round" />
        <path d="M 278 415 Q 283 435 288 445" stroke="#fef08a" strokeWidth="5" strokeLinecap="round" />

        {/* RIBBON */}
        <path d="M 150 465 L 250 485 L 350 465 L 330 495 L 250 500 L 170 495 Z" fill="#991b1b" stroke="url(#crimsonGoldGradient)" strokeWidth="2" />
        <text x="250" y="488" textAnchor="middle" fill="#fef08a" fontSize="18" fontWeight="900" fontFamily="sans-serif" letterSpacing="3">
          EAGLE GYM
        </text>
      </svg>
    </div>
  );
};

const TypewriterText = ({ text, speed = 80, className = '' }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let index = 0;
    setDisplayText('');
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText((prev) => text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return <span className={className}>{displayText}</span>;
};

const Navbar = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0d0304]/90 backdrop-blur-xl border-b border-red-900/30 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between">
        
        {/* BRAND LOGO WITH RESPONSIVE MASCOT */}
        <a href="#hero" className="flex items-center gap-2.5 sm:gap-3 group min-w-0">
          <EagleLogoSVG size={56} className="" glowing={true} />
          <div className="flex flex-col truncate">
            <span className="text-xl sm:text-2xl lg:text-3xl font-black tracking-wider uppercase bg-gradient-to-r from-red-500 via-amber-300 to-red-600 bg-clip-text text-transparent truncate">
              EAGLE GYM
            </span>
            <span className="text-[9px] sm:text-[11px] font-extrabold tracking-widest text-slate-400 uppercase -mt-0.5 sm:-mt-1 flex items-center gap-1 sm:gap-1.5 truncate">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-600 animate-ping shrink-0" />
              FITNESS & ATHLETIC ARENA
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs xl:text-sm font-bold tracking-wide">
          <a href="#equipment" className="hover:text-red-500 transition-colors">EQUIPMENT</a>
          <a href="#classes" className="hover:text-red-500 transition-colors">CLASSES</a>
          <a href="#bmi" className="hover:text-red-500 transition-colors">BMI ENGINE</a>
          <a href="#trainers" className="hover:text-red-500 transition-colors">COACHES</a>
          <a href="#pricing" className="hover:text-red-500 transition-colors">MEMBERSHIPS</a>
          <a href="#contact" className="hover:text-red-500 transition-colors">JOIN ARENA</a>
        </nav>

        {/* CTA Button */}
        <div className="hidden sm:flex items-center gap-4 shrink-0">
          <a
            href="#contact"
            className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-amber-500 text-white font-black text-xs uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-lg shadow-red-600/30 flex items-center gap-2"
          >
            <span>FREE DAY PASS</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          className="lg:hidden p-2.5 sm:p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-red-500 active:scale-95 transition-all"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#140507]/95 backdrop-blur-2xl border-b border-red-900/40 px-6 py-6 space-y-4 transition-all">
          <a
            onClick={() => setMobileMenuOpen(false)}
            href="#equipment"
            className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 text-base font-bold text-slate-200 hover:text-red-500 active:bg-slate-800"
          >
            <span>EQUIPMENT</span>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </a>
          <a
            onClick={() => setMobileMenuOpen(false)}
            href="#classes"
            className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 text-base font-bold text-slate-200 hover:text-red-500 active:bg-slate-800"
          >
            <span>CLASSES</span>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </a>
          <a
            onClick={() => setMobileMenuOpen(false)}
            href="#bmi"
            className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 text-base font-bold text-slate-200 hover:text-red-500 active:bg-slate-800"
          >
            <span>BMI ENGINE</span>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </a>
          <a
            onClick={() => setMobileMenuOpen(false)}
            href="#trainers"
            className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 text-base font-bold text-slate-200 hover:text-red-500 active:bg-slate-800"
          >
            <span>COACHES</span>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </a>
          <a
            onClick={() => setMobileMenuOpen(false)}
            href="#pricing"
            className="flex items-center justify-between p-3 rounded-xl bg-slate-900/50 text-base font-bold text-slate-200 hover:text-red-500 active:bg-slate-800"
          >
            <span>MEMBERSHIPS</span>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </a>
          <a
            onClick={() => setMobileMenuOpen(false)}
            href="#contact"
            className="flex items-center justify-center p-3.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-500 text-white text-base font-black uppercase tracking-wider text-center shadow-lg shadow-red-600/30 active:scale-98"
          >
            FREE DAY PASS
          </a>
        </div>
      )}
    </header>
  );
};

const HeroSection = () => {
  return (
    <section id="hero" className="relative pt-8 sm:pt-12 pb-16 sm:pb-24 overflow-hidden border-b border-red-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/10 border border-red-500/30 text-red-400 text-[11px] sm:text-xs font-black tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" /> FORGE YOUR EMPIRE
            </div>

            <h1 className="text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight sm:leading-none break-words">
              DOMINATE AT <br />
              <TypewriterText
                text="EAGLE GYM & FITNESS"
                speed={80}
                className="bg-gradient-to-r from-red-500 via-amber-200 to-red-600 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,42,42,0.5)]"
              />
            </h1>

            <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed mx-auto lg:mx-0">
              Unleash peak athletic performance with 500+ heavy Olympic machines, custom power cages, elite Indian coaches, and real-time fitness metrics.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2 sm:pt-4">
              <a
                href="#contact"
                className="px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-amber-500 text-white font-black tracking-wider text-xs sm:text-sm uppercase hover:scale-105 active:scale-95 transition-all shadow-xl shadow-red-600/30 flex items-center justify-center gap-2.5 sm:gap-3"
              >
                <Flame className="w-5 h-5 fill-white shrink-0" />
                <span>CLAIM FREE DAY PASS</span>
              </a>
              <a
                href="#equipment"
                className="px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-xs sm:text-sm font-bold hover:border-red-500 transition-all flex items-center justify-center gap-2"
              >
                <span>EXPLORE ARENA</span>
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
              </a>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-6 sm:pt-8 border-t border-slate-800/80">
              <div className="text-center lg:text-left">
                <span className="text-xl sm:text-3xl font-black text-white block">500+</span>
                <span className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider">Heavy Machines</span>
              </div>
              <div className="text-center lg:text-left">
                <span className="text-xl sm:text-3xl font-black text-red-500 block">15,000</span>
                <span className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider">Sq. Ft Arena</span>
              </div>
              <div className="text-center lg:text-left">
                <span className="text-xl sm:text-3xl font-black text-amber-400 block">4.9 ★</span>
                <span className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider">Athlete Rating</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center justify-center relative mt-6 lg:mt-0">
            <div className="w-full max-w-[220px] sm:max-w-[280px] lg:max-w-[320px] mx-auto transition-transform duration-500 hover:-translate-y-2">
              <EagleLogoSVG size={280} glowing={true} className="w-full h-auto" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const EquipmentArena = ({ equipmentList }) => {
  return (
    <section id="equipment" className="py-20 bg-[#120406] border-b border-red-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-black tracking-widest text-red-500 uppercase">
            WORLD-CLASS HEAVY MACHINERY
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            LARGE SET OF GOOD EQUIPMENTS
          </h2>
          <p className="text-slate-400 text-sm">
            Engineered for hyper-growth and precision lifting. Equipped with custom Eleiko steel and Hammer Strength racks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {equipmentList.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-red-500/50 transition-all overflow-hidden group shadow-xl"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-red-600/90 text-white text-[10px] font-black uppercase">
                  {item.count}
                </div>
              </div>
              <div className="p-6 space-y-2">
                <h3 className="text-xl font-extrabold text-white group-hover:text-red-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ClassesSection = ({ classesList, selectedCategory, setSelectedCategory }) => {
  const filteredClasses = selectedCategory === 'All'
    ? classesList
    : classesList.filter((c) => c.category === selectedCategory);

  return (
    <section id="classes" className="py-20 border-b border-red-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-black tracking-widest text-red-500 uppercase block mb-1">
              HIGH INTENSITY PROGRAMMING
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white">
              FEATURED GYM CLASSES
            </h2>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {['All', 'Strength', 'Crossfit', 'Combat'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs font-black tracking-wider transition-all uppercase whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-red-600 to-amber-500 text-white shadow-lg'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredClasses.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-red-500/50 transition-all flex flex-col justify-between overflow-hidden group shadow-xl"
            >
              <div className="h-44 overflow-hidden relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/80 text-amber-400 text-[10px] font-bold border border-amber-500/30">
                  {item.intensity}
                </div>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-black text-red-500 uppercase tracking-widest block">
                    {item.category} • {item.duration}
                  </span>
                  <h3 className="text-lg font-extrabold text-white group-hover:text-red-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">{item.description}</p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-end">
                  <a
                    href="#contact"
                    className="px-4 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white text-xs font-bold transition-all"
                  >
                    BOOK PASS
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BMICalculator = ({ heightCm, setHeightCm, weightKg, setWeightKg, calculatedBMI }) => {
  return (
    <section id="bmi" className="py-16 sm:py-20 bg-[#120406] border-b border-red-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            <span className="text-xs font-black tracking-widest text-red-500 uppercase">
              REAL-TIME FITNESS ENGINE
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white">
              INTERACTIVE BMI & MACRO CALCULATOR
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Tune your daily protein targets and monitor your athletic body mass index in real-time.
            </p>

            <div className="space-y-6 pt-2">
              <div className="space-y-2.5">
                <div className="flex justify-between text-xs sm:text-sm font-bold">
                  <span className="text-slate-400">HEIGHT</span>
                  <span className="text-red-400 font-mono text-base">{heightCm} cm</span>
                </div>
                <input
                  type="range"
                  min="120"
                  max="220"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-600 touch-pan-x"
                />
              </div>

              <div className="space-y-2.5">
                <div className="flex justify-between text-xs sm:text-sm font-bold">
                  <span className="text-slate-400">WEIGHT</span>
                  <span className="text-amber-400 font-mono text-base">{weightKg} kg</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="160"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500 touch-pan-x"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 p-1 rounded-3xl bg-gradient-to-br from-red-600/40 via-red-900/20 to-amber-500/30 shadow-2xl">
            <div className="bg-[#140507] rounded-[calc(1.5rem-4px)] p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest block">
                    YOUR BMI INDEX
                  </span>
                  <span className="text-4xl sm:text-5xl font-black text-red-500 font-mono">{calculatedBMI}</span>
                </div>
                <div className="sm:text-right">
                  <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest block">
                    BODY STATUS
                  </span>
                  <span className="text-xs sm:text-sm font-extrabold text-emerald-400 uppercase">
                    {calculatedBMI < 18.5
                      ? 'Underweight'
                      : calculatedBMI < 25
                      ? 'Optimal Athletic Zone'
                      : calculatedBMI < 30
                      ? 'Overweight'
                      : 'Obese'}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs sm:text-sm font-black text-white uppercase tracking-wide">RECOMMENDED DAILY PROTEIN</h4>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-bold">HYPERTROPHY TARGET</span>
                  <span className="text-lg sm:text-xl font-black text-amber-400 font-mono">{(weightKg * 2.2).toFixed(0)}g / day</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const TrainersSection = ({ trainersList }) => {
  return (
    <section id="trainers" className="py-20 border-b border-red-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-black tracking-widest text-red-500 uppercase">
            CERTIFIED MASTER COACHES
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            MEET OUR EXPERT INDIAN STAFF
          </h2>
          <p className="text-slate-400 text-sm">
            Certified strength coaches, powerlifting champions, and combat directors dedicated to your transformation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainersList.map((staff) => (
            <div
              key={staff.id}
              className="rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-red-500/50 transition-all overflow-hidden group shadow-xl flex flex-col justify-between"
            >
              <div className="h-64 overflow-hidden relative">
                <img
                  src={staff.image}
                  alt={staff.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 text-amber-400 text-[10px] font-black border border-amber-500/30">
                  {staff.exp} EXP
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div>
                  <h3 className="text-xl font-black text-white group-hover:text-red-400 transition-colors">
                    {staff.name}
                  </h3>
                  <p className="text-xs font-bold text-red-500">{staff.role}</p>
                  <span className="text-[10px] text-slate-400 block mt-1">{staff.cert}</span>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {staff.specialties.map((spec, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-bold"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PricingSection = ({ billingPeriod, setBillingPeriod }) => {
  const plans = [
    {
      title: 'SILVER PASS',
      price: billingPeriod === 'monthly' ? '399' : '349',
      perks: ['Full Gym Floor & Equipment Access', 'Standard Locker Room', 'Eagle App Workout Tracker', 'Open Floor Guidance']
    },
    {
      title: 'GOLD PRO PASS',
      popular: true,
      price: billingPeriod === 'monthly' ? '499' : '449',
      perks: ['All Silver Perks', 'Unlimited Sauna & Recovery', '2 Personal Trainer Sessions/mo', 'Group Fitness & Combat Classes', 'Supplements 15% Discount']
    },
    {
      title: 'PLATINUM VIP',
      price: billingPeriod === 'monthly' ? '599' : '559',
      perks: ['All Gold Perks', 'VIP 24/7 Keycard Access', '1-on-1 Dedicated Indian Master Coach', 'Guest Passes (4/mo)', 'Unlimited Protein Shake Bar']
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-[#120406] border-b border-red-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-black tracking-widest text-red-500 uppercase">
            TRANSPARENT MEMBERSHIPS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            SELECT YOUR ARENA PASS
          </h2>

          <div className="inline-flex items-center p-1.5 rounded-xl bg-slate-900 border border-slate-800 mt-4">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-5 py-2 rounded-lg text-xs font-black uppercase transition-all ${
                billingPeriod === 'monthly' ? 'bg-red-600 text-white' : 'text-slate-400'
              }`}
            >
              MONTHLY
            </button>
            <button
              onClick={() => setBillingPeriod('annual')}
              className={`px-5 py-2 rounded-lg text-xs font-black uppercase transition-all ${
                billingPeriod === 'annual' ? 'bg-red-600 text-white' : 'text-slate-400'
              }`}
            >
              ANNUAL (SAVE 20%)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, pIdx) => (
            <div
              key={pIdx}
              className={`p-8 rounded-3xl relative flex flex-col justify-between transition-all ${
                plan.popular
                  ? 'p-1 rounded-3xl bg-gradient-to-br from-red-600/60 via-amber-500/30 to-red-600/60 shadow-2xl scale-105'
                  : 'bg-slate-900/80 border border-slate-800'
              }`}
            >
              {plan.popular ? (
                <div className="bg-[#140507] rounded-[calc(1.5rem-4px)] p-7 h-full flex flex-col justify-between relative">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-red-600 to-amber-500 text-white font-black text-[10px] uppercase tracking-widest shadow-lg">
                    MOST POPULAR
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white tracking-wider mb-2 mt-2">{plan.title}</h3>
                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-5xl font-black text-red-500">{plan.price}</span>
                      <span className="text-slate-400 text-sm font-bold">/ month</span>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {plan.perks.map((perk, kIdx) => (
                        <li key={kIdx} className="flex items-center gap-3 text-xs text-slate-300 font-medium">
                          <CheckCircle className="w-4 h-4 text-red-500 shrink-0" />
                          {perk}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href="#contact"
                    className="w-full py-4 rounded-xl font-black text-xs uppercase tracking-wider text-center transition-all bg-gradient-to-r from-red-600 to-amber-500 text-white hover:scale-105"
                  >
                    SELECT MEMBERSHIP
                  </a>
                </div>
              ) : (
                <>
                  <div>
                    <h3 className="text-xl font-black text-white tracking-wider mb-2">{plan.title}</h3>
                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-5xl font-black text-red-500">{plan.price}</span>
                      <span className="text-slate-400 text-sm font-bold">/ month</span>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {plan.perks.map((perk, kIdx) => (
                        <li key={kIdx} className="flex items-center gap-3 text-xs text-slate-300 font-medium">
                          <CheckCircle className="w-4 h-4 text-red-500 shrink-0" />
                          {perk}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href="#contact"
                    className="w-full py-4 rounded-xl font-black text-xs uppercase tracking-wider text-center transition-all bg-slate-800 hover:bg-red-600 text-white"
                  >
                    SELECT MEMBERSHIP
                  </a>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactFormSection = ({
  formData,
  setFormData,
  captchaProblem,
  generateCaptcha,
  cooldownTime,
  formErrors,
  submitSuccess,
  setSubmitSuccess,
  isSubmitting,
  handleFormSubmit
}) => {
  return (
    <section id="contact" className="py-16 sm:py-20 border-b border-red-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-5 sm:space-y-6">
            <span className="text-xs font-black tracking-widest text-red-500 uppercase">
              SECURE REGISTRATION
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white">
              CLAIM YOUR FREE DAY PASS
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Step into Eagle Gym & Fitness today. Our multi-layer security system guarantees confidential data protection.
            </p>

            <div className="space-y-3 sm:space-y-4 pt-2 sm:pt-4">
              <div className="flex items-center gap-4 p-3.5 sm:p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 shrink-0" />
                <div>
                  <h5 className="text-xs sm:text-sm font-extrabold text-white">LOCATION</h5>
                  <p className="text-[11px] sm:text-xs text-slate-400">Eagle Athletic Arena, Prime City Center</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3.5 sm:p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500 shrink-0" />
                <div>
                  <h5 className="text-xs sm:text-sm font-extrabold text-white">CALL DESK</h5>
                  <p className="text-[11px] sm:text-xs text-slate-400">+91 98765 43210</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 p-1 rounded-3xl bg-gradient-to-br from-red-600/40 via-red-900/20 to-amber-500/30 shadow-2xl">
            <div className="bg-[#140507] rounded-[calc(1.5rem-4px)] p-6 sm:p-10">
              {submitSuccess ? (
                <div className="text-center py-8 sm:py-12 space-y-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">PASS CONFIRMED!</h3>
                  <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                    Welcome, <strong className="text-red-400">{submitSuccess.name}</strong>. Your reference code is{' '}
                    <span className="text-amber-400 font-mono font-bold block sm:inline mt-1 sm:mt-0">{submitSuccess.refId}</span>. Show this at our front desk.
                  </p>
                  <button
                    onClick={() => setSubmitSuccess(null)}
                    className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase transition-all"
                  >
                    SUBMIT ANOTHER
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  {/* Honeypot Security Field */}
                  <input
                    type="text"
                    name="websiteHoneypot"
                    value={formData.websiteHoneypot}
                    onChange={(e) => setFormData({ ...formData, websiteHoneypot: e.target.value })}
                    className="hidden"
                    tabIndex="-1"
                    autoComplete="off"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Full Name</label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-base sm:text-sm focus:border-red-500 outline-none transition-colors"
                      />
                      {formErrors.fullName && <span className="text-[10px] text-red-500 mt-1 block">{formErrors.fullName}</span>}
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. rahul@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-base sm:text-sm focus:border-red-500 outline-none transition-colors"
                      />
                      {formErrors.email && <span className="text-[10px] text-red-500 mt-1 block">{formErrors.email}</span>}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase mb-1 block">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 9876543210"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-base sm:text-sm focus:border-red-500 outline-none transition-colors"
                    />
                    {formErrors.phone && <span className="text-[10px] text-red-500 mt-1 block">{formErrors.phone}</span>}
                  </div>

                  {/* Math Captcha Verification */}
                  <div className="p-3.5 sm:p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                      <span className="flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-amber-400" /> HUMAN VERIFICATION
                      </span>
                      <button
                        type="button"
                        onClick={generateCaptcha}
                        className="text-slate-400 hover:text-white flex items-center gap-1 text-[10px] p-1"
                      >
                        <RefreshCw className="w-3 h-3" /> Refresh
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm sm:text-base font-black text-amber-400 font-mono">
                        {captchaProblem.num1} + {captchaProblem.num2} =
                      </span>
                      <input
                        type="number"
                        value={formData.userCaptchaAnswer}
                        onChange={(e) => setFormData({ ...formData, userCaptchaAnswer: e.target.value })}
                        placeholder="?"
                        className="w-20 px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-base sm:text-sm text-center font-bold focus:border-red-500 outline-none"
                      />
                    </div>
                    {formErrors.userCaptchaAnswer && (
                      <span className="text-[10px] text-red-500 block">{formErrors.userCaptchaAnswer}</span>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || cooldownTime > 0}
                    className="w-full py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-amber-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-xl shadow-red-600/30 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : cooldownTime > 0 ? (
                      `PLEASE WAIT (${cooldownTime}s)`
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> CLAIM FREE DAY PASS
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 bg-[#090203] border-t border-slate-900 text-center space-y-4">
      <div className="flex justify-center items-center gap-3">
        <EagleLogoSVG size={72} glowing={false} />
        <span className="text-2xl font-black tracking-wider bg-gradient-to-r from-red-500 via-amber-300 to-red-600 bg-clip-text text-transparent">
          EAGLE GYM & FITNESS
        </span>
      </div>
      <p className="text-xs text-slate-500">
        © 2026 EAGLE GYM & FITNESS ARENA. ALL RIGHTS RESERVED.
      </p>
    </footer>
  );
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [billingPeriod, setBillingPeriod] = useState('monthly');

  // Contact Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    websiteHoneypot: '',
    userCaptchaAnswer: ''
  });

  const [captchaProblem, setCaptchaProblem] = useState({ num1: 5, num2: 3, answer: 8 });
  const [cooldownTime, setCooldownTime] = useState(0);
  const [formErrors, setFormErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // BMI State
  const [heightCm, setHeightCm] = useState(178);
  const [weightKg, setWeightKg] = useState(78);

  const calculatedBMI = useMemo(() => {
    return calculateBMI(heightCm, weightKg);
  }, [heightCm, weightKg]);

  const refreshCaptcha = useCallback(() => {
    setCaptchaProblem(generateMathCaptcha());
  }, []);

  useEffect(() => {
    refreshCaptcha();
  }, [refreshCaptcha]);

  useEffect(() => {
    if (cooldownTime > 0) {
      const timer = setTimeout(() => setCooldownTime(cooldownTime - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldownTime]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (cooldownTime > 0) return;

    const { isValid, errors } = validateContactForm(
      formData,
      captchaProblem.answer,
      formData.websiteHoneypot
    );

    if (!isValid) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess({
        refId: 'EAGLE-' + Math.floor(100000 + Math.random() * 900000),
        name: formData.fullName
      });
      setCooldownTime(30);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        websiteHoneypot: '',
        userCaptchaAnswer: ''
      });
      refreshCaptcha();
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0d0304] text-slate-100 font-sans selection:bg-red-600 selection:text-white">
      <Navbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <HeroSection />
      <EquipmentArena equipmentList={EQUIPMENT_DATA} />
      <ClassesSection
        classesList={CLASSES_DATA}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <BMICalculator
        heightCm={heightCm}
        setHeightCm={setHeightCm}
        weightKg={weightKg}
        setWeightKg={setWeightKg}
        calculatedBMI={calculatedBMI}
      />
      <TrainersSection trainersList={TRAINERS_DATA} />
      <PricingSection billingPeriod={billingPeriod} setBillingPeriod={setBillingPeriod} />
      <ContactFormSection
        formData={formData}
        setFormData={setFormData}
        captchaProblem={captchaProblem}
        generateCaptcha={refreshCaptcha}
        cooldownTime={cooldownTime}
        formErrors={formErrors}
        submitSuccess={submitSuccess}
        setSubmitSuccess={setSubmitSuccess}
        isSubmitting={isSubmitting}
        handleFormSubmit={handleFormSubmit}
      />
      <Footer />
    </div>
  );
}