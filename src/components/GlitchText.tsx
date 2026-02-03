import { useEffect, useState } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  glitchIntensity?: 'low' | 'medium' | 'high';
}

const GlitchText = ({ text, className = '', glitchIntensity = 'medium' }: GlitchTextProps) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const intervalTime = glitchIntensity === 'high' ? 2000 : glitchIntensity === 'medium' ? 4000 : 6000;
    
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 150);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [glitchIntensity]);

  return (
    <span 
      className={`glitch-text ${isGlitching ? 'animate-flicker' : ''} ${className}`}
      data-text={text}
    >
      {text}
    </span>
  );
};

export default GlitchText;
