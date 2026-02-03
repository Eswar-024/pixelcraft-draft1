import { useEffect, useState } from 'react';

const FloatingLogo = () => {
  const [currentText, setCurrentText] = useState('ESWAR');
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      
      setTimeout(() => {
        setCurrentText(prev => prev === 'ESWAR' ? 'KOSIREDDI' : 'ESWAR');
        setIsGlitching(false);
      }, 150);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-30 animate-float">
      <div 
        className={`font-pixel text-xs text-cyber-white/60 tracking-widest
          ${isGlitching ? 'animate-flicker' : ''}`}
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      >
        {currentText}
      </div>
    </div>
  );
};

export default FloatingLogo;
