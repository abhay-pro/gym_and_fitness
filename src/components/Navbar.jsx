import { Menu, X, ArrowUpRight, ChevronRight } from 'lucide-react';
import { AppLogo } from './AppLogo';
import { APP_CONFIG } from '../config/appConfig';

export const Navbar = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0d0304]/90 backdrop-blur-xl border-b border-red-900/30 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between">
        
        <a href="#hero" className="flex items-center gap-2.5 sm:gap-3 group min-w-0">
          <AppLogo size={72} className="hidden sm:inline-flex" glowing={true} />
          <div className="flex flex-col truncate">
            <span className="text-xl sm:text-2xl lg:text-3xl font-black tracking-wider uppercase bg-gradient-to-r from-red-500 via-amber-300 to-red-600 bg-clip-text text-transparent truncate">
              {APP_CONFIG.shortName}
            </span>
            <span className="text-[9px] sm:text-[11px] font-extrabold tracking-widest text-slate-400 uppercase -mt-0.5 sm:-mt-1 flex items-center gap-1 sm:gap-1.5 truncate">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-600 animate-ping shrink-0" />
              {APP_CONFIG.tagline}
            </span>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs xl:text-sm font-bold tracking-wide">
          <a href="#equipment" className="hover:text-red-500 transition-colors">EQUIPMENT</a>
          <a href="#classes" className="hover:text-red-500 transition-colors">CLASSES</a>
          <a href="#bmi" className="hover:text-red-500 transition-colors">BMI ENGINE</a>
          <a href="#trainers" className="hover:text-red-500 transition-colors">COACHES</a>
          <a href="#pricing" className="hover:text-red-500 transition-colors">MEMBERSHIPS</a>
          <a href="#contact" className="hover:text-red-500 transition-colors">JOIN ARENA</a>
        </nav>

        <div className="hidden sm:flex items-center gap-4 shrink-0">
          <a
            href="#contact"
            className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-amber-500 text-white font-black text-xs uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-lg shadow-red-600/30 flex items-center gap-2"
          >
            <span>FREE DAY PASS</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          className="lg:hidden p-2.5 sm:p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-red-500 active:scale-95 transition-all"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#140507]/95 backdrop-blur-2xl border-b border-red-900/40 px-6 py-6 space-y-4 transition-all">
          {['equipment', 'classes', 'bmi', 'trainers', 'pricing'].map((item) => (
            <a
              key={item}
              onClick={() => setMobileMenuOpen(false)}
              href={`#${item}`}
              className="flex items-center justify-between p-3.5 rounded-xl bg-slate-900/50 text-base font-bold text-slate-200 hover:text-red-500 active:bg-slate-800 uppercase"
            >
              <span>{item === 'bmi' ? 'BMI ENGINE' : item === 'trainers' ? 'COACHES' : item}</span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </a>
          ))}
          <a
            onClick={() => setMobileMenuOpen(false)}
            href="#contact"
            className="flex items-center justify-center p-4 mt-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-500 text-white text-base font-black uppercase tracking-wider text-center shadow-lg shadow-red-600/30 active:scale-95 transition-all"
          >
            FREE DAY PASS
          </a>
        </div>
      )}
    </header>
  );
};
