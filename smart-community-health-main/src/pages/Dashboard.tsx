import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/contexts/AppContext';
import { 
  Heart, 
  Users, 
  AlertTriangle, 
  TrendingUp,
  Droplets,
  Plus,
  Bell
} from 'lucide-react';
import { Layout } from '@/components/Layout';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { t, role } = useApp();
  const navigate = useNavigate();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getRoleTitle = () => {
    switch (role) {
      case 'asha': return 'ASHA Worker';
      case 'community': return 'Community Member';
      case 'admin': return 'Health Officer';
      default: return 'User';
    }
  };

  const quickStats = [
    { 
      label: 'Today\'s Entries', 
      value: '12', 
      icon: Heart, 
      color: 'text-success',
      show: role === 'asha' || role === 'admin'
    },
    { 
      label: 'Active Alerts', 
      value: '3', 
      icon: AlertTriangle, 
      color: 'text-warning',
      show: true
    },
    { 
      label: 'Communities Served', 
      value: '8', 
      icon: Users, 
      color: 'text-primary',
      show: role === 'admin'
    },
    { 
      label: 'Water Quality Reports', 
      value: '24', 
      icon: Droplets, 
      color: 'text-primary',
      show: role === 'asha' || role === 'admin'
    }
  ].filter(stat => stat.show);

  const quickActions = [
    {
      title: 'Add Patient Data',
      description: 'Enter new patient information',
      icon: Plus,
      action: () => navigate('/data-entry'),
      show: role === 'asha'
    },
    {
      title: 'View Alerts',
      description: 'Check health alerts',
      icon: Bell,
      action: () => navigate('/alerts'),
      show: true
    },
    {
      title: 'Water Quality Report',
      description: 'Submit water test results',
      icon: Droplets,
      action: () => navigate('/reports'),
      show: role === 'asha'
    },
    {
      title: 'View Reports',
      description: 'Access health analytics',
      icon: TrendingUp,
      action: () => navigate('/reports'),
      show: role === 'admin'
    }
  ].filter(action => action.show);

  return (
    <Layout>
      <div className="p-4 space-y-6 max-w-md mx-auto">
        {/* Header */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{getGreeting()}</p>
          <h1 className="text-2xl font-bold">{getRoleTitle()}</h1>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="text-xs">
              Online
            </Badge>
            <Badge variant="outline" className="text-xs">
              Synced 2 min ago
            </Badge>
          </div>
        </div>

        {/* Quick Stats */}
        {quickStats.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {quickStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="shadow-soft">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </div>
                      <IconComponent className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Active Alerts */}
        <Card className="shadow-soft border-warning/20">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              <span>Active Health Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-warning/10 rounded-lg border border-warning/20">
              <p className="font-medium text-sm">Water Contamination Warning</p>
              <p className="text-xs text-muted-foreground">
                Elevated turbidity levels detected in Village Water Supply Zone A
              </p>
              <Badge variant="secondary" className="text-xs mt-2">
                High Priority
              </Badge>
            </div>
            <Button variant="outline" size="sm" className="w-full" onClick={() => navigate('/alerts')}>
              View All Alerts
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start h-auto p-3"
                  onClick={action.action}
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <IconComponent className="w-4 h-4 text-primary" />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-sm">{action.title}</p>
                      <p className="text-xs text-muted-foreground">{action.description}</p>
                    </div>
                  </div>
                </Button>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}