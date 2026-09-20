import { LOGO_CONFIG, APP_CONFIG } from '../config/appConfig';
import appLogo from '../assets/appLogo.png'

export const AppLogo = ({ 
  size = 64, 
  className = '', 
  glowing = true, 
  config = LOGO_CONFIG, 
  src = '/assets/appLogo.png'
}) => {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      {glowing && (
        <div
          className="absolute inset-0 rounded-full blur-2xl animate-pulse"
          style={{ backgroundColor: config.glowColor }}
        />
      )}
      <img
        src={appLogo}
        alt="App Logo"
        width={size}
        height={size}
        className="relative z-10 w-full h-auto max-w-full drop-shadow-[0_10px_20px_rgba(255,42,42,0.3)] transition-transform duration-300 hover:scale-105"
        style={{ maxWidth: size, maxHeight: size }}
      />
      {config.showRibbon.length > 0 && (
        <div className="absolute bottom-0 w-full flex justify-center">
          <div className="bg-[#991b1b] px-4 py-1 rounded-md border-2" 
               style={{ borderColor: config.accentColor }}>
            <span 
              className="text-sm font-bold tracking-widest" 
              style={{ color: config.accentColor }}
            >
              {config.ribbonText}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
