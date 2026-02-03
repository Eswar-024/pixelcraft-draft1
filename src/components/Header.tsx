import { useState } from 'react';

interface HeaderProps {
  onNavigate: (section: number) => void;
}

const Header = ({ onNavigate }: HeaderProps) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const menuItems = [
    { label: 'MAP', section: 1 },
    { label: 'SKILLS', section: 3 },
    { label: 'PROJECTS', section: 4 },
    { label: 'SAVE', section: 5 },
  ];

  return (
    <header className="fixed top-6 right-6 z-40">
      <nav
        className="px-6 py-3 border-2 border-cyber-orange bg-black/80 backdrop-blur-sm"
        style={{
          clipPath: 'polygon(0 10%, 2% 0, 98% 0, 100% 10%, 100% 90%, 98% 100%, 2% 100%, 0 90%)',
        }}
      >
        <ul className="flex gap-6">
          {menuItems.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => onNavigate(item.section)}
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`font-pixel text-[10px] tracking-wider transition-all duration-100
                  ${hoveredItem === item.label
                    ? 'text-cyber-yellow animate-glitch-shake'
                    : 'text-cyber-white'
                  }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
