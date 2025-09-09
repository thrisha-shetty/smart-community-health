import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  BarChart3, 
  AlertTriangle, 
  BookOpen,
  Settings
} from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { cn } from '@/lib/utils';

export function BottomNavigation() {
  const { t, role } = useApp();
  const location = useLocation();

  const getNavItems = () => {
    const baseItems = [
      { 
        to: '/dashboard', 
        icon: Home, 
        label: t('navigation.home', 'Home') 
      }
    ];

    if (role === 'asha') {
      return [
        ...baseItems,
        { 
          to: '/data-entry', 
          icon: FileText, 
          label: t('navigation.dataEntry', 'Data Entry') 
        },
        { 
          to: '/reports', 
          icon: BarChart3, 
          label: t('navigation.reports', 'Reports') 
        },
        { 
          to: '/alerts', 
          icon: AlertTriangle, 
          label: t('navigation.alerts', 'Alerts') 
        },
        { 
          to: '/awareness', 
          icon: BookOpen, 
          label: t('navigation.awareness', 'Awareness') 
        }
      ];
    } else if (role === 'community') {
      return [
        ...baseItems,
        { 
          to: '/alerts', 
          icon: AlertTriangle, 
          label: t('navigation.alerts', 'Alerts') 
        },
        { 
          to: '/awareness', 
          icon: BookOpen, 
          label: t('navigation.awareness', 'Awareness') 
        },
        { 
          to: '/settings', 
          icon: Settings, 
          label: t('navigation.settings', 'Settings') 
        }
      ];
    } else if (role === 'admin') {
      return [
        ...baseItems,
        { 
          to: '/reports', 
          icon: BarChart3, 
          label: t('navigation.reports', 'Reports') 
        },
        { 
          to: '/alerts', 
          icon: AlertTriangle, 
          label: t('navigation.alerts', 'Alerts') 
        },
        { 
          to: '/settings', 
          icon: Settings, 
          label: t('navigation.settings', 'Settings') 
        }
      ];
    }

    return baseItems;
  };

  const navItems = getNavItems();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-strong z-40">
      <div className="flex items-center justify-around py-2 px-1 max-w-md mx-auto">
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = location.pathname === item.to;
          
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={cn(
                "flex flex-col items-center justify-center p-2 min-w-0 transition-colors duration-200",
                "rounded-lg hover:bg-accent/50",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <IconComponent className={cn(
                "w-5 h-5 mb-1",
                isActive && "animate-pulse"
              )} />
              <span className="text-xs font-medium truncate max-w-[4rem]">
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
      
      {/* Safe area for devices with bottom home indicator */}
      <div className="h-safe-area-inset-bottom bg-card" />
    </nav>
  );
}