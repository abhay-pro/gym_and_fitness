import { Sparkles, Flame, ChevronRight } from 'lucide-react';
import { AppLogo } from './AppLogo';
import { TypewriterText } from './TypewriterText';
import { APP_CONFIG } from '../config/appConfig';

export const HeroSection = ({ stats }) => {
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
                text={APP_CONFIG.fullName}
                speed={80}
                className="bg-gradient-to-r from-red-500 via-amber-200 to-red-600 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,42,42,0.5)]"
              />
            </h1>

            <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed mx-auto lg:mx-0">
              {APP_CONFIG.description}
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
                <span className="text-xl sm:text-3xl font-black text-white block">{stats?.equipmentCount || '500+'}</span>
                <span className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider">Heavy Machines</span>
              </div>
              <div className="text-center lg:text-left">
                <span className="text-xl sm:text-3xl font-black text-red-500 block">{stats?.areaSqFt || '15,000'}</span>
                <span className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider">Sq. Ft Arena</span>
              </div>
              <div className="text-center lg:text-left">
                <span className="text-xl sm:text-3xl font-black text-amber-400 block">{stats?.rating || '4.9 ★'}</span>
                <span className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-wider">Athlete Rating</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center justify-center relative mt-6 lg:mt-0">
            <div className="w-full max-w-[220px] sm:max-w-[280px] lg:max-w-[320px] mx-auto transition-transform duration-500 hover:-translate-y-2">
              <AppLogo size={280} glowing={true} className="w-full h-auto" />
            </div>
            <div className="mt-4 sm:mt-6 px-4 py-2 sm:px-6 sm:py-2.5 rounded-2xl bg-slate-900/90 border border-red-900/40 text-center shadow-2xl max-w-xs sm:max-w-none">
              <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest block">
                {APP_CONFIG.shortName} MASCOT
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-red-400">
                Front-Facing Wings & Plumage Design
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
