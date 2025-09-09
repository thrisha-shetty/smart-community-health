import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/contexts/AppContext';
import { Layout } from '@/components/Layout';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Droplets,
  Activity,
  Calendar,
  Download,
  Filter,
  PieChart,
  LineChart
} from 'lucide-react';

export default function Reports() {
  const { t, role } = useApp();

  const reportData = {
    patients: {
      total: 156,
      thisWeek: 23,
      trend: '+12%'
    },
    waterQuality: {
      safe: 78,
      warning: 12,
      unsafe: 4
    },
    symptoms: [
      { name: 'Diarrhea', count: 45, percentage: 28.8 },
      { name: 'Fever', count: 38, percentage: 24.4 },
      { name: 'Vomiting', count: 29, percentage: 18.6 },
      { name: 'Headache', count: 25, percentage: 16.0 },
      { name: 'Other', count: 19, percentage: 12.2 }
    ]
  };

  const quickReports = [
    {
      title: 'Weekly Summary',
      description: 'Patient data and water quality summary for this week',
      icon: Calendar,
      show: role === 'asha' || role === 'admin'
    },
    {
      title: 'Water Quality Trends',
      description: 'Analysis of water quality changes over time',
      icon: Droplets,
      show: role === 'asha' || role === 'admin'
    },
    {
      title: 'Symptom Analysis',
      description: 'Most common symptoms in your area',
      icon: Activity,
      show: role === 'admin'
    },
    {
      title: 'Community Health Overview',
      description: 'Overall health status of communities served',
      icon: Users,
      show: role === 'admin'
    }
  ].filter(report => report.show);

  return (
    <Layout>
      <div className="p-4 space-y-6 max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              {t('navigation.reports', 'Reports')}
            </h1>
            <p className="text-sm text-muted-foreground">
              Health data analytics and insights
            </p>
          </div>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-1" />
            Filter
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-primary">{reportData.patients.total}</p>
                  <p className="text-xs text-muted-foreground">Total Patients</p>
                </div>
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div className="mt-2 flex items-center space-x-1">
                <TrendingUp className="w-3 h-3 text-success" />
                <span className="text-xs text-success">{reportData.patients.trend}</span>
                <span className="text-xs text-muted-foreground">this week</span>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-info">{reportData.waterQuality.safe}</p>
                  <p className="text-xs text-muted-foreground">Safe Water Sources</p>
                </div>
                <Droplets className="w-6 h-6 text-info" />
              </div>
              <div className="mt-2">
                <span className="text-xs text-muted-foreground">
                  {reportData.waterQuality.warning} warning, {reportData.waterQuality.unsafe} unsafe
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Water Quality Status */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Droplets className="w-5 h-5" />
              <span>Water Quality Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-success"></div>
                  <span className="text-sm">Safe</span>
                </div>
                <span className="text-sm font-medium">{reportData.waterQuality.safe}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-success h-2 rounded-full" style={{ width: '82%' }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-warning"></div>
                  <span className="text-sm">Warning</span>
                </div>
                <span className="text-sm font-medium">{reportData.waterQuality.warning}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-warning h-2 rounded-full" style={{ width: '13%' }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-danger"></div>
                  <span className="text-sm">Unsafe</span>
                </div>
                <span className="text-sm font-medium">{reportData.waterQuality.unsafe}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-danger h-2 rounded-full" style={{ width: '5%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Common Symptoms */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Activity className="w-5 h-5" />
              <span>Common Symptoms</span>
            </CardTitle>
            <CardDescription>
              Most reported symptoms this month
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {reportData.symptoms.map((symptom, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-medium text-primary">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">{symptom.name}</p>
                    <p className="text-xs text-muted-foreground">{symptom.percentage}%</p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {symptom.count} cases
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Reports */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Quick Reports</span>
            </CardTitle>
            <CardDescription>
              Generate detailed reports for analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickReports.map((report, index) => {
              const IconComponent = report.icon;
              return (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start h-auto p-3"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <IconComponent className="w-4 h-4 text-primary" />
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-medium text-sm">{report.title}</p>
                      <p className="text-xs text-muted-foreground">{report.description}</p>
                    </div>
                    <Download className="w-4 h-4 text-muted-foreground" />
                  </div>
                </Button>
              );
            })}
          </CardContent>
        </Card>

        {/* Export Options */}
        <Card className="shadow-soft border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Download className="w-5 h-5 text-primary mt-0.5" />
              <div className="flex-1">
                <h3 className="font-medium text-sm text-primary">Export Data</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Download reports in PDF or Excel format for offline analysis
                </p>
                <div className="flex space-x-2 mt-3">
                  <Button variant="outline" size="sm">
                    Export PDF
                  </Button>
                  <Button variant="outline" size="sm">
                    Export Excel
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}