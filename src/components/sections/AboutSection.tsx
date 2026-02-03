import GlitchText from '../GlitchText';

const AboutSection = () => {
  const handleResumeClick = () => {
    window.open('/EswarResume3.pdf', '_blank');
  };

  return (
    <div className="cyber-room flex-col md:flex-row gap-12 md:gap-20 px-8">
      {/* Avatar with hex frame */}
      <div className="relative group cursor-pointer flex flex-col items-center gap-6">
        {/* Resume Button */}
        <button
          onClick={handleResumeClick}
          className="px-8 py-3 font-pixel text-sm md:text-base text-cyber-orange border-2 border-cyber-orange rounded-full hover:bg-cyber-orange hover:text-black transition-all duration-300 orange-glow hover:scale-105"
          style={{
            boxShadow: '0 0 20px hsl(var(--cyber-orange) / 0.4)',
          }}
        >
          RESUME
        </button>

        {/* Orange glow behind - enhanced on hover */}
        <div
          className="absolute inset-0 bg-cyber-orange/30 blur-xl transition-all duration-300 group-hover:bg-cyber-orange/50 group-hover:blur-2xl"
          style={{ transform: 'scale(1.2)', top: '60px' }}
        />

        {/* Hex-glitch frame container */}
        <div
          className="relative w-48 h-56 md:w-64 md:h-72 border-2 border-cyber-orange overflow-hidden orange-glow transition-all duration-300 group-hover:scale-110 group-hover:border-cyber-yellow"
          style={{
            clipPath: 'polygon(0 10%, 10% 0, 90% 0, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0 90%)',
            boxShadow: '0 0 30px hsl(var(--cyber-orange) / 0.5), 0 0 60px hsl(var(--cyber-orange) / 0.3)',
          }}
        >
          {/* Placeholder avatar - pixel pattern */}
          <div className="w-full h-full bg-black flex items-center justify-center">
            <div className="grid grid-cols-8 gap-1 opacity-60 transition-opacity duration-300 group-hover:opacity-100">
              {Array.from({ length: 64 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 md:w-4 md:h-4 transition-all duration-300 ${Math.random() > 0.5 ? 'bg-cyber-orange group-hover:bg-cyber-yellow' : 'bg-transparent'
                    }`}
                />
              ))}
            </div>
          </div>

          {/* Scanline effect */}
          <div className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,140,0,0.1) 2px, rgba(255,140,0,0.1) 4px)',
            }}
          />
        </div>
      </div>

      {/* Text content */}
      <div className="text-center md:text-left space-y-4 max-w-2xl">
        <p className="font-pixel text-xs md:text-sm text-cyber-white leading-relaxed">
          I'm Eswar, a builder who enjoys turning ideas into working systems.
          I care about clean logic, honest design, and things that actually function in the real world.
          I like learning by doing, improving through iteration, and keeping things simple but meaningful.
          If something feels hard, I stay with it until it makes sense.
        </p>

        <p className="font-pixel text-xs md:text-sm text-cyber-orange italic mt-6">
          "The Biggest Project I Can Ever Work On Is Me"
        </p>
      </div>
    </div>
  );
};

export default AboutSection;
