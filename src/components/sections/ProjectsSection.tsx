import { useState } from 'react';

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
}

const projects: Project[] = [
  {
    id: 'proj1',
    title: 'GAS BOOKING ALERT',
    description: 'Developed an LPG leak detection system using Raspberry Pi Pico and gas sensors. Integrated with a mobile app for real-time gas level monitoring. Alerts users on leaks and enables quick gas refill booking.',
    tech: ['Raspberry Pi', 'IoT', 'Mobile App'],
    github: 'https://drive.google.com/drive/folders/1x1b4_DCy1YyoGVmWS4aj-7VxoDZSFTBC',
    live: 'https://drive.google.com/file/d/1nVYHl6UdqMKaPcQo5sMPkm2t2GZyK5m-/view',
  },
  {
    id: 'proj2',
    title: 'PET CARE APP',
    description: 'Built a responsive pet care appointment system with HTML, CSS, and JavaScript. Implemented backend for authentication and scheduling. Used secure APIs for smooth data flow and efficient service management.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Backend'],
    github: 'https://github.com/Eswar-024',
    live: 'https://pet-care-website-frontend.vercel.app/',
  },
  {
    id: 'proj3',
    title: 'BANKING WEB APP',
    description: 'Developed a responsive banking web app using HTML, CSS, and JavaScript. Enabled seamless user experience across devices with intuitive UI. Key features: account management, fund transfers, and transaction history.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Responsive'],
    github: 'https://github.com/Eswar-024/pet-care-website-frontend2',
    live: 'https://user-friendly-bank-apl.vercel.app/',
  },
  {
    id: 'proj4',
    title: 'PREVIOUS PORTFOLIO',
    description: 'My first portfolio website showcasing my journey as a developer. Built with modern web technologies and featuring a clean, professional design to highlight my skills and projects.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Portfolio'],
    github: 'https://github.com/Eswar-024/portfoliodraft1',
    live: 'https://portfoliodraft1-eswar.vercel.app/',
  },
];

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isInserting, setIsInserting] = useState(false);
  const [isEjecting, setIsEjecting] = useState(false);

  const handleSelectCartridge = (project: Project) => {
    if (selectedProject) {
      // Eject current
      setIsEjecting(true);
      setTimeout(() => {
        setIsEjecting(false);
        setSelectedProject(null);
        // Then insert new
        setTimeout(() => insertCartridge(project), 200);
      }, 400);
    } else {
      insertCartridge(project);
    }
  };

  const insertCartridge = (project: Project) => {
    setIsInserting(true);
    setTimeout(() => {
      setSelectedProject(project);
      setIsInserting(false);
    }, 500);
  };

  const handleEject = () => {
    setIsEjecting(true);
    setTimeout(() => {
      setIsEjecting(false);
      setSelectedProject(null);
    }, 400);
  };

  return (
    <div className="cyber-room flex-col px-8">
      <h2 className="font-pixel text-xl text-cyber-orange mb-12 tracking-wider">
        [ PROJECTS ]
      </h2>

      <div className="flex flex-col md:flex-row gap-8 md:gap-8 items-center justify-center">
        {/* Left Cartridge rack - First 2 projects */}
        <div className="flex md:flex-col gap-4">
          {projects.slice(0, 2).map((project) => (
            <button
              key={project.id}
              onClick={() => handleSelectCartridge(project)}
              className={`cartridge w-24 md:w-32 transition-all
                ${selectedProject?.id === project.id ? 'opacity-30' : 'hover:border-cyber-yellow'}
              `}
            >
              <span className="font-pixel text-[8px] text-cyber-white">
                {project.title}
              </span>
            </button>
          ))}
        </div>

        {/* Cartridge slot / display screen */}
        <div
          className="relative w-80 md:w-96 h-64 md:h-80 border-2 border-cyber-orange bg-black/90"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 24px), calc(100% - 24px) 100%, 24px 100%, 0 calc(100% - 24px))',
          }}
        >
          {/* Slot indicator */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-2 border-2 border-cyber-orange border-t-0" />

          {/* Content area */}
          <div className="p-6 h-full flex flex-col justify-center items-center">
            {!selectedProject && !isInserting && (
              <p className="font-pixel text-[10px] text-cyber-white/50 text-center">
                SELECT A CARTRIDGE<br />TO LOAD PROJECT
              </p>
            )}

            {isInserting && (
              <div className="animate-flicker font-pixel text-xs text-cyber-orange">
                LOADING...
              </div>
            )}

            {selectedProject && !isInserting && !isEjecting && (
              <div className="text-center space-y-4 animate-fade-in">
                <h3 className="font-pixel text-base text-cyber-yellow">
                  {selectedProject.title}
                </h3>
                <p className="font-pixel text-[10px] text-cyber-white leading-relaxed">
                  {selectedProject.description}
                </p>
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {selectedProject.tech.map((t) => (
                    <span
                      key={t}
                      className="font-pixel text-[8px] text-cyber-orange border border-cyber-orange px-2 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 justify-center mt-6">
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pixel-btn text-[10px]"
                    >
                      GITHUB
                    </a>
                  )}
                  {selectedProject.live && (
                    <a
                      href={selectedProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pixel-btn text-[10px]"
                    >
                      LIVE
                    </a>
                  )}
                  <button
                    onClick={handleEject}
                    className="pixel-btn text-[10px]"
                  >
                    EJECT
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Cartridge rack - Last 2 projects */}
        <div className="flex md:flex-col gap-4">
          {projects.slice(2, 4).map((project) => (
            <button
              key={project.id}
              onClick={() => handleSelectCartridge(project)}
              className={`cartridge w-24 md:w-32 transition-all
                ${selectedProject?.id === project.id ? 'opacity-30' : 'hover:border-cyber-yellow'}
              `}
            >
              <span className="font-pixel text-[8px] text-cyber-white">
                {project.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;
