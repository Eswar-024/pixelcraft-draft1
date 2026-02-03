import { useState, useEffect } from 'react';

interface RoamingCharacterProps {
    username: string;
}

const RoamingCharacter = ({ username }: RoamingCharacterProps) => {
    const [position, setPosition] = useState(0);
    const [direction, setDirection] = useState(1); // 1 for right, -1 for left
    const [isHovered, setIsHovered] = useState(false);
    const [currentFrame, setCurrentFrame] = useState(0);
    const [hoverCount, setHoverCount] = useState(0);
    const [isJumping, setIsJumping] = useState(false);

    // Sprite sheet configuration
    const FRAME_WIDTH = 64; // Width of each frame in the sprite sheet
    const FRAME_HEIGHT = 64; // Height of each frame
    const TOTAL_FRAMES = 4; // Total number of walking frames

    useEffect(() => {
        if (isHovered) return; // Stop moving when hovered

        const interval = setInterval(() => {
            setPosition((prev) => {
                const newPos = prev + direction * 2;

                // Reverse direction at screen edges
                if (newPos >= window.innerWidth - 100) {
                    setDirection(-1);
                    return window.innerWidth - 100;
                } else if (newPos <= 0) {
                    setDirection(1);
                    return 0;
                }

                return newPos;
            });

            // Cycle through walking frames
            setCurrentFrame((prev) => (prev + 1) % TOTAL_FRAMES);
        }, 150); // Change frame every 150ms for walking animation

        return () => clearInterval(interval);
    }, [direction, isHovered]);

    // Get message based on hover count
    const getMessage = () => {
        return hoverCount % 2 === 0
            ? "Hi! I am Eswar"
            : `Hi there, ${username || 'Guest'}!`;
    };

    const handleMouseEnter = () => {
        setIsHovered(true);
        setHoverCount((prev) => prev + 1);
    };

    const handleClick = () => {
        setIsJumping(true);
        setTimeout(() => setIsJumping(false), 500);
    };

    return (
        <div
            className="fixed bottom-20 z-50 cursor-pointer"
            style={{
                left: `${position}px`,
                transform: isJumping ? 'translateY(-40px)' : 'translateY(0)',
                transition: 'left 0.05s linear, transform 0.3s ease-out',
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
        >
            {/* Character - video when walking, image when stopped */}
            {isHovered ? (
                <img
                    src="/eswar-pixel.jpeg"
                    alt="Eswar"
                    className="w-24 h-24 pixelated"
                    style={{
                        imageRendering: 'pixelated',
                        objectFit: 'contain',
                        transform: direction === -1 ? 'scaleX(-1)' : 'scaleX(1)',
                        transition: 'transform 0.3s ease-out',
                    }}
                />
            ) : (
                <video
                    src="/MOVING3VIDEO.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-24 h-24 pixelated"
                    style={{
                        imageRendering: 'pixelated',
                        objectFit: 'contain',
                        transform: direction === -1 ? 'scaleX(-1)' : 'scaleX(1)',
                        transition: 'transform 0.3s ease-out',
                    }}
                />
            )}

            {/* Speech Bubble */}
            {isHovered && (
                <div
                    className="absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap animate-bounce-in"
                >
                    <div className="relative px-4 py-2 border-2 border-cyber-orange bg-black">
                        <span className="font-pixel text-[10px] text-cyber-orange">
                            {getMessage()}
                        </span>
                        {/* Speech bubble tail */}
                        <div
                            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0"
                            style={{
                                borderLeft: '6px solid transparent',
                                borderRight: '6px solid transparent',
                                borderTop: '8px solid #ff8c00',
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoamingCharacter;
