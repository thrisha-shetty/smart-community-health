import React from 'react';
import { BottomNavigation } from './BottomNavigation';

interface LayoutProps {
  children: React.ReactNode;
  showNavigation?: boolean;
}

export function Layout({ children, showNavigation = true }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <main className={`${showNavigation ? 'pb-20' : ''}`}>
        {children}
      </main>
      {showNavigation && <BottomNavigation />}
    </div>
  );
}