import { useEffect, useState } from 'react';

interface PreBootSectionProps {
  onProceed: () => void;
}

const PreBootSection = ({ onProceed }: PreBootSectionProps) => {
  const [showText, setShowText] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowText(true), 500);
    const timer2 = setTimeout(() => setShowPrompt(true), 2000);

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onProceed();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [onProceed]);

  return (
    <div className="cyber-room flex-col gap-8">
      {showText && (
        <div className="text-center animate-flicker">
          <p className="font-pixel text-sm text-cyber-white tracking-wider mb-4">
            INITIALIZING PORTFOLIO...
          </p>
        </div>
      )}
      
      {showPrompt && (
        <div 
          className="text-center cursor-pointer animate-float"
          onClick={onProceed}
        >
          <p className="font-pixel text-xs text-cyber-orange tracking-wider">
            [ PRESS ENTER ]
          </p>
        </div>
      )}

      {/* Occasional glitch flash */}
      <div 
        className="absolute inset-0 bg-white pointer-events-none opacity-0"
        style={{ animation: 'scanline-flash 8s infinite' }}
      />
    </div>
  );
};

export default PreBootSection;
