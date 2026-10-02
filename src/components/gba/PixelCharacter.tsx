'use client';

import React, { useEffect, useState, useMemo } from 'react';

export type PixelCharacterProps = {
  neutralSprite?: string;
  happySprite?: string;
  animationEnabled?: boolean;
  frameDuration?: number;
  className?: string;
  width?: number | string;
  height?: number | string;
  alt?: string;
};

export default function PixelCharacter({
  neutralSprite = '/art/neutral.jpg',
  happySprite = '/art/happy.png',
  animationEnabled = true,
  frameDuration = 1000,
  className = '',
  width = 72,
  height = 72,
  alt = 'Aman pixel character',
}: PixelCharacterProps) {
  const [frame, setFrame] = useState<0 | 1>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check prefers-reduced-motion accessibility setting
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  // Preload sprites to prevent flickering during swaps
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (neutralSprite) {
      const img1 = new Image();
      img1.src = neutralSprite;
    }
    if (happySprite) {
      const img2 = new Image();
      img2.src = happySprite;
    }
  }, [neutralSprite, happySprite]);

  const canAnimate = useMemo(() => {
    return (
      Boolean(animationEnabled) &&
      !prefersReducedMotion &&
      Boolean(neutralSprite) &&
      Boolean(happySprite) &&
      neutralSprite !== happySprite
    );
  }, [animationEnabled, prefersReducedMotion, neutralSprite, happySprite]);

  useEffect(() => {
    if (!canAnimate) {
      setFrame(0);
      return;
    }

    // Enforce safe interval duration bounds [200ms, 3000ms]
    const validDuration = Math.max(200, Math.min(3000, frameDuration || 1000));

    const interval = setInterval(() => {
      setFrame((current) => (current === 0 ? 1 : 0));
    }, validDuration);

    return () => clearInterval(interval);
  }, [canAnimate, frameDuration]);

  // Graceful fallback: if no sprite is provided, return null
  const activeSprite = frame === 0 ? neutralSprite : (happySprite || neutralSprite);

  if (!activeSprite) {
    return null;
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
    >
      <img
        src={activeSprite}
        alt={alt}
        className="w-full h-full object-contain"
        style={{
          imageRendering: 'pixelated',
        }}
      />
    </div>
  );
}
