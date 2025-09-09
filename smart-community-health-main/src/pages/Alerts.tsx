import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { Layout } from '@/components/Layout';
import { 
  AlertTriangle, 
  Droplets, 
  Thermometer,
  Clock,
  MapPin,
  ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Alert {
  id: string;
  type: 'water' | 'outbreak' | 'weather';
  priority: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  location: string;
  timestamp: string;
  actionTips: string[];
}

export default function Alerts() {
  const { t, role } = useApp();

  const alerts: Alert[] = [
    {
      id: '1',
      type: 'water',
      priority: 'high',
      title: 'Water Contamination Alert',
      description: 'High turbidity levels detected in Village Water Supply Zone A. Immediate action required.',
      location: 'Guwahati Zone A',
      timestamp: '2 hours ago',
      actionTips: [
        'Boil water for at least 5 minutes before drinking',
        'Use water purification tablets if available',
        'Inform community members immediately',
        'Avoid direct consumption from the source'
      ]
    },
    {
      id: '2',
      type: 'outbreak',
      priority: 'medium',
      title: 'Diarrhea Cases Rising',
      description: 'Increased reports of diarrhea symptoms in the eastern district. Monitor closely.',
      location: 'Eastern District',
      timestamp: '6 hours ago',
      actionTips: [
        'Promote hand hygiene practices',
        'Ensure proper sanitation facilities',
        'Monitor water quality regularly',
        'Report any new cases immediately'
      ]
    },
    {
      id: '3',
      type: 'weather',
      priority: 'low',
      title: 'Heavy Rainfall Expected',
      description: 'Heavy rainfall predicted for next 3 days. Potential water source contamination risk.',
      location: 'Regional',
      timestamp: '1 day ago',
      actionTips: [
        'Secure water storage containers',
        'Clean drainage systems',
        'Monitor flood-prone areas',
        'Prepare emergency supplies'
      ]
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-danger text-danger-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'water': return Droplets;
      case 'outbreak': return AlertTriangle;
      case 'weather': return Thermometer;
      default: return AlertTriangle;
    }
  };

  return (
    <Layout>
      <div className="p-4 space-y-6 max-w-md mx-auto">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">
            {t('alerts.title', 'Health Alerts')}
          </h1>
          <p className="text-sm text-muted-foreground">
            Current health warnings and action items
          </p>
        </div>

        {/* Alert Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold text-danger">2</div>
              <div className="text-xs text-muted-foreground">High Priority</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold text-warning">1</div>
              <div className="text-xs text-muted-foreground">Medium Priority</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold text-muted-foreground">1</div>
              <div className="text-xs text-muted-foreground">Low Priority</div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {alerts.map((alert) => {
            const IconComponent = getTypeIcon(alert.type);
            return (
              <Card key={alert.id} className="shadow-soft">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <IconComponent className="w-5 h-5 text-primary" />
                      <CardTitle className="text-base leading-tight">
                        {alert.title}
                      </CardTitle>
                    </div>
                    <Badge className={cn('text-xs', getPriorityColor(alert.priority))}>
                      {alert.priority.toUpperCase()}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm">
                    {alert.description}
                  </CardDescription>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{alert.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{alert.timestamp}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0 space-y-3">
                  <div>
                    <h4 className="font-medium text-sm mb-2">Action Steps:</h4>
                    <ul className="space-y-1">
                      {alert.actionTips.map((tip, index) => (
                        <li key={index} className="text-xs text-muted-foreground flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {role === 'asha' && (
                    <Button size="sm" variant="outline" className="w-full">
                      <ExternalLink className="w-3 h-3 mr-2" />
                      Report Status Update
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Emergency Contact */}
        <Card className="shadow-soft bg-danger/5 border-danger/20">
          <CardContent className="p-4">
            <h3 className="font-semibold text-sm mb-2 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2 text-danger" />
              Emergency Contact
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              For immediate health emergencies or critical water contamination
            </p>
            <Button size="sm" variant="destructive" className="w-full">
              Call Emergency Helpline
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}