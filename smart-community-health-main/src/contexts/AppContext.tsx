import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations, getTranslation } from '@/lib/i18n';

export type UserRole = 'asha' | 'community' | 'admin';

interface AppState {
  language: Language;
  role: UserRole | null;
  isOnboarded: boolean;
}

interface AppContextType extends AppState {
  setLanguage: (lang: Language) => void;
  setRole: (role: UserRole) => void;
  t: (path: string, fallback?: string) => string;
  completeOnboarding: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'health_app_state';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>({
    language: 'en',
    role: null,
    isOnboarded: false
  });

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        setState(prev => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error('Error loading app state:', error);
      }
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const setLanguage = (language: Language) => {
    setState(prev => ({ ...prev, language }));
  };

  const setRole = (role: UserRole) => {
    setState(prev => ({ ...prev, role }));
  };

  const completeOnboarding = () => {
    setState(prev => ({ ...prev, isOnboarded: true }));
  };

  const t = (path: string, fallback: string = '') => {
    return getTranslation(translations[state.language], path, fallback);
  };

  return (
    <AppContext.Provider value={{
      ...state,
      setLanguage,
      setRole,
      t,
      completeOnboarding
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}