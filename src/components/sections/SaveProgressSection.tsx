import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GlitchText from '../GlitchText';

interface SaveProgressSectionProps {
    currentSection: number;
    username: string;
    onLoadProgress: (section: number) => void;
}

interface SaveData {
    section: number;
    sectionName: string;
    username: string;
    timestamp: number;
}

const SaveProgressSection = ({ currentSection, username, onLoadProgress }: SaveProgressSectionProps) => {
    const navigate = useNavigate();
    const [saveData, setSaveData] = useState<SaveData | null>(null);
    const [justSaved, setJustSaved] = useState(false);
    const [justLoaded, setJustLoaded] = useState(false);
    const [isBonusHovered, setIsBonusHovered] = useState(false);

    const sectionNames = [
        'PRE-BOOT',
        'BOOT',
        'IDENTITY',
        'ABOUT',
        'SKILLS',
        'PROJECTS',
        'SAVE POINT',
        'CONTACT'
    ];

    useEffect(() => {
        // Load saved data from localStorage
        const saved = localStorage.getItem('portfolio_save');
        if (saved) {
            try {
                setSaveData(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to load save data:', e);
            }
        }
    }, []);

    const handleSave = () => {
        const data: SaveData = {
            section: currentSection,
            sectionName: sectionNames[currentSection] || 'UNKNOWN',
            username,
            timestamp: Date.now(),
        };

        localStorage.setItem('portfolio_save', JSON.stringify(data));
        setSaveData(data);
        setJustSaved(true);
        setTimeout(() => setJustSaved(false), 2000);
    };

    const handleLoad = () => {
        if (saveData) {
            onLoadProgress(saveData.section);
            setJustLoaded(true);
            setTimeout(() => setJustLoaded(false), 2000);
        }
    };

    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="cyber-room flex-col px-8 relative">
            {/* Bonus button - right center */}
            <button
                onClick={() => navigate('/money')}
                onMouseEnter={() => setIsBonusHovered(true)}
                onMouseLeave={() => setIsBonusHovered(false)}
                className={`absolute right-8 top-1/2 -translate-y-1/2 z-20 group ${isBonusHovered ? 'animate-glitch-shake' : ''}`}
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

            {/* Save slot container */}
            <div
                className="w-full max-w-2xl p-8 border-2 border-cyber-orange bg-black/90 transition-all duration-300 hover:scale-105 hover:border-cyber-yellow orange-glow group cursor-pointer"
                style={{
                    clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
                }}
            >
                <h2 className="font-pixel text-lg text-center mb-8">
                    <GlitchText text="SAVE PROGRESS?" className="text-cyber-white group-hover:text-cyber-yellow transition-colors duration-300" />
                </h2>

                <div className="flex flex-col gap-4">
                    <a
                        href="mailto:eswarkosireddi@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pixel-btn text-center block transition-all duration-300 hover:scale-105"
                    >
                        [ EMAIL ]
                    </a>
                    <a
                        href="https://github.com/Eswar-024"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pixel-btn text-center block transition-all duration-300 hover:scale-105"
                    >
                        [ GITHUB ]
                    </a>
                    <a
                        href="https://www.linkedin.com/in/eswar-kosireddi-5072a2275/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pixel-btn text-center block transition-all duration-300 hover:scale-105"
                    >
                        [ LINKEDIN ]
                    </a>
                </div>
            </div>

            {/* Hint */}
            <div className="mt-8 text-center">
                <p className="font-pixel text-[10px] text-cyber-orange tracking-widest">
                    CHECKPOINT REACHED
                </p>
            </div>
        </div>
    );
};

export default SaveProgressSection;
