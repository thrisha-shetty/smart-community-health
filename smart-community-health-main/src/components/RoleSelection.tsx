import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserRole } from '@/contexts/AppContext';
import { useApp } from '@/contexts/AppContext';
import { 
  Stethoscope, 
  Users, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface RoleSelectionProps {
  onNext: () => void;
}

export function RoleSelection({ onNext }: RoleSelectionProps) {
  const { t, setRole } = useApp();

  const handleRoleSelect = (role: UserRole) => {
    setRole(role);
    setTimeout(onNext, 300);
  };

  const roles = [
    {
      id: 'asha' as UserRole,
      icon: Stethoscope,
      title: t('roles.asha', 'ASHA Worker / Health Volunteer'),
      description: 'Data entry, patient monitoring, and field reporting',
      gradient: 'bg-gradient-success'
    },
    {
      id: 'community' as UserRole,
      icon: Users,
      title: t('roles.community', 'Community Member'),
      description: 'Health alerts, awareness content, and safety tips',
      gradient: 'bg-gradient-primary'
    },
    {
      id: 'admin' as UserRole,
      icon: ShieldCheck,
      title: t('roles.admin', 'Admin / Health Officer'),
      description: 'Dashboard monitoring, analytics, and system management',
      gradient: 'bg-gradient-warning'
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-accent/20 to-background">
      <Card className="w-full max-w-lg shadow-medium">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl">
            {t('roles.title', 'Select Your Role')}
          </CardTitle>
          <CardDescription>
            {t('roles.subtitle', 'Choose how you\'ll be using the system')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {roles.map((role) => {
            const IconComponent = role.icon;
            return (
              <Button
                key={role.id}
                variant="outline"
                className="w-full h-auto p-4 justify-start text-left hover:shadow-soft transition-all duration-300 group"
                onClick={() => handleRoleSelect(role.id)}
              >
                <div className="flex items-center space-x-4 w-full">
                  <div className={cn(
                    "p-3 rounded-lg text-white",
                    role.gradient
                  )}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="font-semibold text-sm leading-tight">
                      {role.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {role.description}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
              </Button>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}