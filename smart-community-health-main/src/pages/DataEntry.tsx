import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useApp } from '@/contexts/AppContext';
import { Layout } from '@/components/Layout';
import { Save, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PatientData {
  name: string;
  age: string;
  gender: string;
  symptoms: string[];
  waterSource: string;
  location: string;
}

export default function DataEntry() {
  const { t } = useApp();
  const { toast } = useToast();
  const [formData, setFormData] = useState<PatientData>({
    name: '',
    age: '',
    gender: '',
    symptoms: [],
    waterSource: '',
    location: ''
  });

  const symptoms = [
    'Fever', 'Diarrhea', 'Vomiting', 'Nausea', 'Headache', 
    'Body Ache', 'Skin Rash', 'Stomach Pain', 'Dehydration'
  ];

  const waterSourceOptions = [
    { value: 'clean', label: 'Clean Water', color: 'text-success' },
    { value: 'muddy', label: 'Muddy Water', color: 'text-warning' },
    { value: 'stagnant', label: 'Stagnant Water', color: 'text-danger' }
  ];

  const handleSymptomChange = (symptom: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      symptoms: checked 
        ? [...prev.symptoms, symptom]
        : prev.symptoms.filter(s => s !== symptom)
    }));
  };

  const handleSave = () => {
    if (!formData.name || !formData.age || !formData.gender) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would save to local storage and sync when online
    toast({
      title: "Data Saved",
      description: "Patient information saved successfully. Will sync when online.",
      variant: "default"
    });

    // Reset form
    setFormData({
      name: '',
      age: '',
      gender: '',
      symptoms: [],
      waterSource: '',
      location: ''
    });
  };

  return (
    <Layout>
      <div className="p-4 space-y-6 max-w-md mx-auto">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">
            {t('dataEntry.title', 'Patient Information')}
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter patient details and symptoms
          </p>
        </div>

        {/* Patient Info Form */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Patient Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter patient name"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                  placeholder="Age"
                />
              </div>

              <div className="space-y-2">
                <Label>Gender *</Label>
                <Select value={formData.gender} onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Village/Area name"
              />
            </div>
          </CardContent>
        </Card>

        {/* Symptoms */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">Symptoms</CardTitle>
            <CardDescription>Select all applicable symptoms</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {symptoms.map((symptom) => (
                <div key={symptom} className="flex items-center space-x-2">
                  <Checkbox
                    id={symptom}
                    checked={formData.symptoms.includes(symptom)}
                    onCheckedChange={(checked) => handleSymptomChange(symptom, !!checked)}
                  />
                  <Label htmlFor={symptom} className="text-sm">
                    {symptom}
                  </Label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Water Source */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg">Water Source Condition</CardTitle>
            <CardDescription>Select the condition of water source used</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={formData.waterSource} onValueChange={(value) => setFormData(prev => ({ ...prev, waterSource: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select water source condition" />
              </SelectTrigger>
              <SelectContent>
                {waterSourceOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <span className={option.color}>{option.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button onClick={handleSave} className="w-full" size="lg">
            <Save className="w-4 h-4 mr-2" />
            Save Patient Data
          </Button>
          
          <Button variant="outline" className="w-full" size="lg">
            <Upload className="w-4 h-4 mr-2" />
            Sync Saved Data
          </Button>
        </div>
      </div>
    </Layout>
  );
}