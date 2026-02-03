import { useEffect, useState } from 'react';

const skills = [
  'MongoDB',
  'Express',
  'React.js',
  'Node.js',
  'JavaScript',
  'Java',
  'DSA',
  'Machine Learning',
  'Deep Learning[B]',
  'HTML & CSS',
  'MySQL',
  'Figma & Canva',
];

const SkillsSection = () => {
  const [loadedSkills, setLoadedSkills] = useState<string[]>([]);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  useEffect(() => {
    skills.forEach((skill, index) => {
      setTimeout(() => {
        setLoadedSkills(prev => [...prev, skill]);
      }, 200 * index);
    });
  }, []);

  return (
    <div className="cyber-room flex-col px-8">
      <h2 className="font-pixel text-xl text-cyber-orange mb-12 tracking-wider">
        [ SKILLS INVENTORY ]
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
        {skills.map((skill, index) => {
          const isLoaded = loadedSkills.includes(skill);
          const isHovered = hoveredSkill === skill;

          return (
            <div
              key={skill}
              onMouseEnter={() => setHoveredSkill(skill)}
              onMouseLeave={() => setHoveredSkill(null)}
              className={`skill-block text-center transition-all cursor-default
                ${isLoaded ? 'animate-power-up' : 'opacity-0'}
                ${isHovered ? 'border-cyber-yellow text-cyber-yellow animate-glitch-shake' : ''}
              `}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {skill}
            </div>
          );
        })}
      </div>

      {/* Power-up effect indicator */}
      <div className="mt-12 font-pixel text-[10px] text-cyber-white/50 tracking-wider">
        HOVER TO ACTIVATE
      </div>
    </div>
  );
};

export default SkillsSection;
