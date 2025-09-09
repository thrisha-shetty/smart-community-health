import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/contexts/AppContext';
import { Layout } from '@/components/Layout';
import { 
  Droplets, 
  HandHeart, 
  Shield, 
  Heart,
  Baby,
  Users,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface AwarenessTip {
  id: string;
  category: 'hygiene' | 'water' | 'nutrition' | 'general';
  title: string;
  description: string;
  steps: string[];
  icon: any;
}

export default function Awareness() {
  const { t, role } = useApp();

  const awarenessTips: AwarenessTip[] = [
    {
      id: '1',
      category: 'hygiene',
      title: 'Proper Handwashing',
      description: 'Essential steps for effective hand hygiene to prevent disease transmission',
      icon: HandHeart,
      steps: [
        'Wet hands with clean running water',
        'Apply soap and lather for 20 seconds',
        'Scrub between fingers and under nails',
        'Rinse thoroughly with clean water',
        'Dry with clean towel or air dry'
      ]
    },
    {
      id: '2',
      category: 'water',
      title: 'Safe Water Storage',
      description: 'How to store water safely to prevent contamination',
      icon: Droplets,
      steps: [
        'Use clean, covered containers only',
        'Boil water for 5+ minutes before storage',
        'Store in cool, dark places',
        'Clean storage containers weekly',
        'Use water within 24-48 hours'
      ]
    },
    {
      id: '3',
      category: 'nutrition',
      title: 'Child Nutrition Basics',
      description: 'Essential nutrition guidelines for healthy child development',
      icon: Baby,
      steps: [
        'Exclusive breastfeeding for 6 months',
        'Introduce solid foods gradually',
        'Include fruits and vegetables daily',
        'Ensure clean food preparation',
        'Monitor growth regularly'
      ]
    },
    {
      id: '4',
      category: 'general',
      title: 'Community Health Safety',
      description: 'Basic steps to maintain community health and prevent outbreaks',
      icon: Shield,
      steps: [
        'Report illness symptoms early',
        'Maintain clean living spaces',
        'Proper waste disposal methods',
        'Regular health check-ups',
        'Follow vaccination schedules'
      ]
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'hygiene': return 'bg-primary/10 text-primary border-primary/20';
      case 'water': return 'bg-info/10 text-info border-info/20';
      case 'nutrition': return 'bg-success/10 text-success border-success/20';
      case 'general': return 'bg-warning/10 text-warning border-warning/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'hygiene': return 'Hygiene';
      case 'water': return 'Water Safety';
      case 'nutrition': return 'Nutrition';
      case 'general': return 'General Health';
      default: return 'Health';
    }
  };

  return (
    <Layout>
      <div className="p-4 space-y-6 max-w-md mx-auto">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">
            {t('navigation.awareness', 'Health Awareness')}
          </h1>
          <p className="text-sm text-muted-foreground">
            Essential health tips and guidelines for your community
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold text-primary">4</div>
              <div className="text-xs text-muted-foreground">Health Topics</div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold text-success">20+</div>
              <div className="text-xs text-muted-foreground">Safety Tips</div>
            </CardContent>
          </Card>
        </div>

        {/* Awareness Tips */}
        <div className="space-y-4">
          {awarenessTips.map((tip) => {
            const IconComponent = tip.icon;
            return (
              <Card key={tip.id} className="shadow-soft">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{tip.title}</CardTitle>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getCategoryColor(tip.category)}`}
                        >
                          {getCategoryName(tip.category)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-sm">
                    {tip.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Step-by-step guide:</h4>
                    {tip.steps.map((step, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                          <span className="text-xs font-medium text-primary">{index + 1}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{step}</p>
                      </div>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-border/50">
                    <div className="flex items-center space-x-2 text-xs text-success">
                      <CheckCircle className="w-4 h-4" />
                      <span>Follow these steps for better health outcomes</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Community Health Notice */}
        <Card className="shadow-soft border-info/20 bg-info/5">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Users className="w-5 h-5 text-info mt-0.5" />
              <div>
                <h3 className="font-medium text-sm text-info">Community Health Reminder</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Share these health tips with your family and neighbors. Community health is everyone's responsibility.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}