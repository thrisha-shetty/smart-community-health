import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { useApp } from '@/contexts/AppContext';
import { Layout } from '@/components/Layout';
import { 
  Globe, 
  User, 
  Bell, 
  Shield,
  Download,
  RefreshCw,
  Info,
  Languages,
  UserCheck,
  Settings as SettingsIcon
} from 'lucide-react';

export default function Settings() {
  const { t, language, role, setLanguage, setRole } = useApp();

  const languageOptions = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिंदी' },
    { code: 'as', name: 'Assamese', native: 'অসমীয়া' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা' }
  ];

  const roleOptions = [
    { id: 'asha', name: 'ASHA Worker', description: 'Data entry and reporting' },
    { id: 'community', name: 'Community Member', description: 'Health alerts and awareness' },
    { id: 'admin', name: 'Health Officer', description: 'Monitoring and administration' }
  ];

  const getCurrentLanguageName = () => {
    const lang = languageOptions.find(l => l.code === language);
    return lang ? `${lang.name} (${lang.native})` : 'English';
  };

  const getCurrentRoleName = () => {
    const roleObj = roleOptions.find(r => r.id === role);
    return roleObj ? roleObj.name : 'Not Selected';
  };

  return (
    <Layout>
      <div className="p-4 space-y-6 max-w-md mx-auto">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">
            {t('navigation.settings', 'Settings')}
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your app preferences and account settings
          </p>
        </div>

        {/* Profile Section */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <User className="w-5 h-5" />
              <span>Profile</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Current Role</p>
                <p className="text-xs text-muted-foreground">{getCurrentRoleName()}</p>
              </div>
              <Badge variant="secondary" className="text-xs">
                {role || 'None'}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Account Status</p>
                <p className="text-xs text-muted-foreground">Active</p>
              </div>
              <Badge variant="outline" className="text-xs bg-success/10 text-success border-success/20">
                Online
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Language Settings */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Languages className="w-5 h-5" />
              <span>Language</span>
            </CardTitle>
            <CardDescription>
              Choose your preferred language for the app
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Current Language</p>
                <p className="text-xs text-muted-foreground">{getCurrentLanguageName()}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {languageOptions.map((lang) => (
                <Button
                  key={lang.code}
                  variant={language === lang.code ? "default" : "outline"}
                  size="sm"
                  onClick={() => setLanguage(lang.code as any)}
                  className="text-xs h-auto py-2"
                >
                  <div className="text-center">
                    <div className="font-medium">{lang.name}</div>
                    <div className="text-xs opacity-70">{lang.native}</div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Role Settings */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <UserCheck className="w-5 h-5" />
              <span>Role Settings</span>
            </CardTitle>
            <CardDescription>
              Change how you use the system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {roleOptions.map((roleOption) => (
              <Button
                key={roleOption.id}
                variant={role === roleOption.id ? "default" : "outline"}
                className="w-full justify-start h-auto p-3"
                onClick={() => setRole(roleOption.id as any)}
              >
                <div className="text-left">
                  <p className="font-medium text-sm">{roleOption.name}</p>
                  <p className="text-xs opacity-70">{roleOption.description}</p>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>Notifications</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Health Alerts</p>
                <p className="text-xs text-muted-foreground">Get notified about health emergencies</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Water Quality Updates</p>
                <p className="text-xs text-muted-foreground">Notifications about water safety</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">System Updates</p>
                <p className="text-xs text-muted-foreground">App updates and maintenance notices</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Data & Storage */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Download className="w-5 h-5" />
              <span>Data & Storage</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Offline Data</p>
                <p className="text-xs text-muted-foreground">12 entries ready to sync</p>
              </div>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-1" />
                Sync Now
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Storage Used</p>
                <p className="text-xs text-muted-foreground">2.4 MB of local storage</p>
              </div>
              <Button variant="outline" size="sm">
                Clear Cache
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* App Information */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Info className="w-5 h-5" />
              <span>App Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="font-medium text-sm">Version</p>
              <p className="text-xs text-muted-foreground">1.0.0</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-medium text-sm">Last Updated</p>
              <p className="text-xs text-muted-foreground">Today</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="font-medium text-sm">Build</p>
              <p className="text-xs text-muted-foreground">Production</p>
            </div>
          </CardContent>
        </Card>

        {/* Support */}
        <Card className="shadow-soft border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h3 className="font-medium text-sm text-primary">Need Help?</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Contact your local health administrator for technical support and training.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}