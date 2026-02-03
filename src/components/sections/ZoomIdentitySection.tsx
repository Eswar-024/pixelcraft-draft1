import { useEffect, useState } from 'react';
import GlitchText from '../GlitchText';

interface ZoomIdentitySectionProps {
  username: string;
}

const ZoomIdentitySection = ({ username }: ZoomIdentitySectionProps) => {
  const [phase, setPhase] = useState<'greeting' | 'zoom' | 'reveal'>('greeting');

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase('zoom'), 1500);
    const timer2 = setTimeout(() => setPhase('reveal'), 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="cyber-room flex-col">
      {phase === 'greeting' && (
        <p className="font-pixel text-lg text-cyber-white">
          hi {username.toLowerCase()}
        </p>
      )}

      {phase === 'zoom' && (
        <div className="animate-zoom-in">
          <p className="font-pixel text-2xl text-cyber-white opacity-50">
            hi {username.toLowerCase()}
          </p>
        </div>
      )}

      {phase === 'reveal' && (
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          {/* Profile image with cyber styling */}
          <div className="relative group cursor-pointer">
            {/* Glitch effect layers behind */}
            <div
              className="absolute inset-0 w-[250px] h-[250px] border-2 border-cyber-orange/30 translate-x-2 translate-y-2 transition-all duration-300 group-hover:translate-x-3 group-hover:translate-y-3"
              style={{
                clipPath: 'polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%)',
              }}
            />
            <div
              className="absolute inset-0 w-[250px] h-[250px] border-2 border-cyber-yellow/20 -translate-x-2 -translate-y-2 transition-all duration-300 group-hover:-translate-x-3 group-hover:-translate-y-3"
              style={{
                clipPath: 'polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%)',
              }}
            />

            {/* Main image container */}
            <div
              className="relative w-[250px] h-[250px] border-4 border-cyber-orange bg-black overflow-hidden transition-all duration-300 hover:border-cyber-yellow orange-glow group-hover:shadow-[0_0_30px_rgba(255,140,0,0.6)]"
              style={{
                clipPath: 'polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%)',
              }}
            >
              {/* Split image into 4 horizontal strips with offsets */}
              {/* Strip 1 - Top quarter (shifted left, aligns on hover) */}
              <div
                className="absolute w-full h-[25%] top-0 overflow-hidden transition-all duration-500 group-hover:brightness-110"
                style={{ transform: 'translateX(-8px)' }}
              >
                <div className="w-full h-full transition-transform duration-500 group-hover:translate-x-[8px]">
                  <img
                    src="/profile-photo.jpg"
                    alt="Eswar Profile"
                    className="w-full h-[250px] object-cover transition-all duration-500 group-hover:scale-110"
                    style={{
                      position: 'absolute',
                      top: '0px',
                      left: '0'
                    }}
                  />
                </div>
              </div>

              {/* Strip 2 - Second quarter (shifted right, aligns on hover) */}
              <div
                className="absolute w-full h-[25%] top-[25%] overflow-hidden transition-all duration-500 group-hover:brightness-110"
                style={{ transform: 'translateX(8px)' }}
              >
                <div className="w-full h-full transition-transform duration-500 group-hover:translate-x-[-8px]">
                  <img
                    src="/profile-photo.jpg"
                    alt="Eswar Profile"
                    className="w-full h-[250px] object-cover transition-all duration-500 group-hover:scale-110"
                    style={{
                      position: 'absolute',
                      top: '-62.5px',
                      left: '0'
                    }}
                  />
                </div>
              </div>

              {/* Strip 3 - Third quarter (shifted left, aligns on hover) */}
              <div
                className="absolute w-full h-[25%] top-[50%] overflow-hidden transition-all duration-500 group-hover:brightness-110"
                style={{ transform: 'translateX(-8px)' }}
              >
                <div className="w-full h-full transition-transform duration-500 group-hover:translate-x-[8px]">
                  <img
                    src="/profile-photo.jpg"
                    alt="Eswar Profile"
                    className="w-full h-[250px] object-cover transition-all duration-500 group-hover:scale-110"
                    style={{
                      position: 'absolute',
                      top: '-125px',
                      left: '0'
                    }}
                  />
                </div>
              </div>

              {/* Strip 4 - Bottom quarter (shifted right, aligns on hover) */}
              <div
                className="absolute w-full h-[25%] top-[75%] overflow-hidden transition-all duration-500 group-hover:brightness-110"
                style={{ transform: 'translateX(8px)' }}
              >
                <div className="w-full h-full transition-transform duration-500 group-hover:translate-x-[-8px]">
                  <img
                    src="/profile-photo.jpg"
                    alt="Eswar Profile"
                    className="w-full h-[250px] object-cover transition-all duration-500 group-hover:scale-110"
                    style={{
                      position: 'absolute',
                      top: '-187.5px',
                      left: '0'
                    }}
                  />
                </div>
              </div>

              {/* Scanline overlay effect */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 140, 0, 0.1) 2px, rgba(255, 140, 0, 0.1) 4px)',
                }}
              />

              {/* Corner accents */}
              <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyber-yellow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-cyber-yellow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-cyber-yellow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-cyber-yellow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          <div className="text-center relative group cursor-pointer">
            {/* Glitch layers behind */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-pixel text-4xl md:text-6xl text-cyber-orange/30 translate-x-2 translate-y-1 transition-all duration-300 group-hover:text-cyber-orange/50">
                ESWAR
              </span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-pixel text-4xl md:text-6xl text-cyber-yellow/20 -translate-x-2 -translate-y-1 transition-all duration-300 group-hover:text-cyber-yellow/40">
                ESWAR
              </span>
            </div>

            {/* Main text */}
            <h1 className="relative transition-all duration-300 group-hover:scale-105">
              <GlitchText
                text="ESWAR"
                className="font-pixel text-4xl md:text-6xl text-cyber-white group-hover:text-cyber-yellow"
                glitchIntensity="medium"
              />
            </h1>

            <p className="font-pixel text-xs text-cyber-orange mt-8 tracking-widest transition-all duration-300 group-hover:scale-105 group-hover:text-cyber-yellow">
              Builds • Breaks • Rebuilds
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZoomIdentitySection;
