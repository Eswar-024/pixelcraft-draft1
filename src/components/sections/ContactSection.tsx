import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlitchText from '../GlitchText';

const ContactSection = () => {
  const navigate = useNavigate();
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [isBonusHovered, setIsBonusHovered] = useState(false);

  const links = [
    { label: 'EMAIL', href: 'mailto:eswar@example.com' },
    { label: 'GITHUB', href: 'https://github.com' },
    { label: 'LINKEDIN', href: 'https://linkedin.com' },
  ];

  return (
    <div className="cyber-room flex-col px-8 relative">
      {/* Bonus button - right center */}
      <button
        onClick={() => navigate('/money')}
        onMouseEnter={() => setIsBonusHovered(true)}
        onMouseLeave={() => setIsBonusHovered(false)}
        className={`fixed right-8 top-1/2 -translate-y-1/2 z-20 group ${isBonusHovered ? 'animate-glitch-shake' : ''}`}
      >
        {/* Pixel cash icon */}
        <div
          className="w-16 h-16 border-4 border-cyber-yellow bg-black flex items-center justify-center yellow-glow transition-all duration-300 group-hover:scale-125 group-hover:border-cyber-orange animate-float"
          style={{
            clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
            boxShadow: isBonusHovered
              ? '0 0 40px hsl(var(--cyber-yellow) / 0.8), 0 0 80px hsl(var(--cyber-yellow) / 0.5)'
              : '0 0 20px hsl(var(--cyber-yellow) / 0.5)',
          }}
        >
          <span className="font-pixel text-2xl text-cyber-yellow group-hover:text-cyber-orange transition-colors duration-300">$</span>
        </div>

        {/* Tooltip */}
        <div
          className={`absolute -left-32 top-1/2 -translate-y-1/2 px-3 py-2 border-2 border-cyber-yellow bg-black whitespace-nowrap transition-opacity duration-300 ${isBonusHovered ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <span className="font-pixel text-[8px] text-cyber-yellow">BONUS FEATURE</span>
        </div>
      </button>

      {/* Save game UI */}
      <div
        className="w-full max-w-md p-8 border-2 border-cyber-orange bg-black/90"
        style={{
          clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
        }}
      >
        <h2 className="font-pixel text-lg text-center mb-8">
          <GlitchText text="SAVE PROGRESS?" className="text-cyber-white" />
        </h2>

        <div className="flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHoveredButton(link.label)}
              onMouseLeave={() => setHoveredButton(null)}
              className={`pixel-btn text-center block ${hoveredButton === link.label ? 'border-cyber-yellow text-cyber-yellow' : ''
                }`}
            >
              [ {link.label} ]
            </a>
          ))}
        </div>
      </div>

      {/* Status footer */}
      <div className="mt-12 text-center">
        <p className="font-pixel text-[10px] text-cyber-orange tracking-widest">
          STATUS: READY FOR NEXT LEVEL
        </p>
      </div>
    </div>
  );
};

export default ContactSection;
