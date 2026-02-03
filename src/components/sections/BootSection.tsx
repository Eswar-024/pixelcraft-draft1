import { useState, useEffect, useRef } from 'react';

interface BootSectionProps {
  onComplete: (username: string) => void;
}

const BootSection = ({ onComplete }: BootSectionProps) => {
  const [username, setUsername] = useState('');
  const [phase, setPhase] = useState<'input' | 'authenticating' | 'welcome'>('input');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
        setPhase('authenticating');
        setTimeout(() => {
          setPhase('welcome');
          setTimeout(() => {
            onComplete(username.trim());
          }, 5000);
        }, 1000);
    }
  };

  return (
    <div className="cyber-room flex-col">
      <div className="w-full max-w-2xl p-8 border-2 border-cyber-orange bg-black/90"
        style={{
          clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
        }}
      >
        {phase === 'input' && (
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-2">
              <span className="font-pixel text-xs text-cyber-orange">&gt;</span>
              <span className="font-pixel text-xs text-cyber-white">ENTER YOUR NAME</span>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <span className="font-pixel text-xs text-cyber-orange">&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value.toUpperCase())}
                className="bg-transparent font-pixel text-sm text-cyber-white outline-none border-none w-full uppercase"
                maxLength={12}
                autoComplete="off"
              />
              <span className="terminal-cursor" />
            </div>
          </form>
        )}

        {phase === 'authenticating' && (
          <div className="animate-flicker">
            <p className="font-pixel text-xs text-cyber-orange">&gt; AUTHENTICATING...</p>
          </div>
        )}

        {phase === 'welcome' && (
          <div className="space-y-2">
            <p className="font-pixel text-xs text-cyber-orange">&gt; AUTHENTICATED</p>
            <p className="font-pixel text-xs text-cyber-white">&gt; WELCOME, {username}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BootSection;
