import { useState, useEffect, useRef, useCallback } from 'react';
import StarryBackground from '@/components/StarryBackground';
import Header from '@/components/Header';
import FloatingLogo from '@/components/FloatingLogo';
import RoamingCharacter from '@/components/RoamingCharacter';
import PreBootSection from '@/components/sections/PreBootSection';
import BootSection from '@/components/sections/BootSection';
import ZoomIdentitySection from '@/components/sections/ZoomIdentitySection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import SaveProgressSection from '@/components/sections/SaveProgressSection';

const SECTIONS = 6;

const Index = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [username, setUsername] = useState('');
  const [showUI, setShowUI] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef(false);

  const navigateToSection = useCallback((index: number) => {
    if (index < 0 || index >= SECTIONS || isScrolling.current) return;

    isScrolling.current = true;
    setCurrentSection(index);

    // Show header/logo after pre-boot
    if (index >= 1) setShowUI(true);

    setTimeout(() => {
      isScrolling.current = false;
    }, 600);
  }, []);

  const handleScroll = useCallback((deltaY: number) => {
    // Scroll down (positive) = move right
    if (deltaY > 0) {
      navigateToSection(currentSection + 1);
    } else if (deltaY < 0) {
      navigateToSection(currentSection - 1);
    }
  }, [currentSection, navigateToSection]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      handleScroll(e.deltaY);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') {
        navigateToSection(currentSection + 1);
      } else if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') {
        navigateToSection(currentSection - 1);
      }
    };

    let touchStartX = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          navigateToSection(currentSection + 1);
        } else {
          navigateToSection(currentSection - 1);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSection, handleScroll, navigateToSection]);

  const handlePreBootComplete = () => {
    navigateToSection(1);
  };

  const handleBootComplete = (name: string) => {
    setUsername(name);
    setTimeout(() => navigateToSection(2), 500);
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      <StarryBackground />

      {/* Scanlines overlay */}
      <div className="scanlines" />

      {/* Grain overlay */}
      <div className="grain" />

      {/* Header & Logo - appear after pre-boot */}
      {showUI && (
        <>
          {/* Logo box top-left */}
          <div
            onClick={() => navigateToSection(2)}
            className="fixed top-6 left-6 z-40 w-16 h-16 bg-black/80 backdrop-blur-sm flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 group"
          >
            <img
              src="/LOGO EK.png"
              alt="Logo"
              className="w-12 h-12 object-contain transition-all duration-300 group-hover:brightness-125"
            />
          </div>
          <Header onNavigate={navigateToSection} />
          <FloatingLogo />
        </>
      )}

      {/* Progress indicator */}
      {showUI && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {Array.from({ length: SECTIONS }).map((_, i) => (
            <button
              key={i}
              onClick={() => navigateToSection(i)}
              className={`w-3 h-3 border border-cyber-orange transition-all ${i === currentSection ? 'bg-cyber-orange' : 'bg-transparent hover:bg-cyber-yellow/30'
                }`}
            />
          ))}
        </div>
      )}

      {/* Navigation hints */}
      {showUI && (
        <div className="fixed bottom-6 right-6 z-30 font-pixel text-[8px] text-cyber-white/30">
          [A/←] PREV | [D/→] NEXT
        </div>
      )}

      {/* Horizontal sections container */}
      <div
        ref={containerRef}
        className="flex h-screen transition-transform duration-500 ease-out"
        style={{
          width: `${SECTIONS * 100}vw`,
          transform: `translateX(-${currentSection * 100}vw)`,
        }}
      >
        {/* Section 0: Pre-boot */}
        <PreBootSection onProceed={handlePreBootComplete} />

        {/* Section 1: Boot */}
        <BootSection onComplete={handleBootComplete} />

        {/* Section 2: Zoom Identity */}
        <ZoomIdentitySection username={username} />

        {/* Section 3: About */}
        <AboutSection />

        {/* Section 4: Skills */}
        <SkillsSection />

        {/* Section 5: Projects */}
        <ProjectsSection />

        {/* Section 6: Save Progress */}
        <SaveProgressSection
          currentSection={currentSection}
          username={username}
          onLoadProgress={navigateToSection}
        />
      </div>

      {/* Roaming Character */}
      <RoamingCharacter username={username} />
    </div>
  );
};

export default Index;
