import { AppLogo } from './AppLogo';
import { APP_CONFIG } from '../config/appConfig';

export const Footer = () => {
  return (
    <footer className="py-12 bg-[#090203] border-t border-slate-900 text-center space-y-4">
      <div className="flex justify-center items-center gap-3">
        <AppLogo size={72} glowing={false} />
        <span className="text-2xl font-black tracking-wider bg-gradient-to-r from-red-500 via-amber-300 to-red-600 bg-clip-text text-transparent">
          {APP_CONFIG.fullName}
        </span>
      </div>
      <p className="text-xs text-slate-500 uppercase">
        © {APP_CONFIG.copyright.year} {APP_CONFIG.copyright.companyName}. ALL RIGHTS RESERVED.
      </p>
    </footer>
  );
};
