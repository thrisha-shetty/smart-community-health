import React, { useEffect, useState } from 'react';
import { Heart, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500); // Allow fade out animation to complete
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className={cn(
      "fixed inset-0 z-50 flex flex-col items-center justify-center",
      "bg-gradient-primary text-white transition-opacity duration-500",
      !isVisible && "opacity-0"
    )}>
      <div className="text-center space-y-8 animate-in fade-in duration-1000">
        {/* Logo */}
        <div className="relative">
          <div className="flex items-center justify-center space-x-2">
            <div className="relative">
              <Heart className="w-16 h-16 animate-pulse" />
              <Shield className="w-8 h-8 absolute -bottom-1 -right-1 text-success animate-bounce" />
            </div>
          </div>
        </div>

        {/* App Name */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Smart Health
          </h1>
          <h2 className="text-2xl font-semibold opacity-90">
            Monitoring System
          </h2>
        </div>

        {/* Tagline */}
        <p className="text-lg opacity-80 max-w-sm mx-auto leading-relaxed">
          Empowering Communities Through Health Data
        </p>

        {/* Loading indicator */}
        <div className="flex justify-center">
          <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        </div>
      </div>
    </div>
  );
}