import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Language, translations } from '@/lib/i18n';
import { useApp } from '@/contexts/AppContext';
import { Globe } from 'lucide-react';

interface LanguageSelectionProps {
  onNext: () => void;
}

export function LanguageSelection({ onNext }: LanguageSelectionProps) {
  const { language, setLanguage } = useApp();

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
    setTimeout(onNext, 300); // Small delay for smooth transition
  };

  const languages: { code: Language; name: string; nativeName: string }[] = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-accent/20 to-background">
      <Card className="w-full max-w-md shadow-medium">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-3 rounded-full bg-primary/10">
              <Globe className="w-8 h-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl">Select Language</CardTitle>
          <CardDescription>
            Choose your preferred language to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              variant={language === lang.code ? "default" : "outline"}
              className="w-full h-12 justify-start text-left"
              onClick={() => handleLanguageSelect(lang.code)}
            >
              <div className="flex flex-col items-start">
                <span className="font-medium">{lang.nativeName}</span>
                <span className="text-xs opacity-70">{lang.name}</span>
              </div>
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}