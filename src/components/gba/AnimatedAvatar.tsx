'use client';

import React, { useEffect, useState } from 'react';

interface AnimatedAvatarProps {
  className?: string;
  size?: number;
}

export default function AnimatedAvatar({ className = '', size = 80 }: AnimatedAvatarProps) {
  const [isHappy, setIsHappy] = useState(false);

  useEffect(() => {
    // Alternate between neutral and happy every 2.4 seconds to create animated emotion illusion
    const interval = setInterval(() => {
      setIsHappy((prev) => !prev);
    }, 2400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`relative overflow-hidden rounded-md border-2 border-[#38435c] bg-[#11141c] shadow-[0_4px_10px_rgba(0,0,0,0.85)] flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={isHappy ? '/art/happy.png' : '/art/neutral.jpg'}
        alt={isHappy ? 'Aman Happy' : 'Aman Neutral'}
        className="w-full h-full object-cover transition-opacity duration-300"
        style={{ imageRendering: 'pixelated' }}
      />

      {/* Retro Status Tag */}
      <div className="absolute bottom-1 right-1 bg-[#171A24]/90 px-1 py-0.5 rounded text-[7px] font-mono font-bold border border-[#252A38]">
        {isHappy ? (
          <span className="text-[#C7D49A]">^‿^</span>
        ) : (
          <span className="text-[#8FA878]">·_·</span>
        )}
      </div>
    </div>
  );
}
