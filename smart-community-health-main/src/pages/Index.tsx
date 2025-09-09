import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { SplashScreen } from '@/components/SplashScreen';
import { LanguageSelection } from '@/components/LanguageSelection';
import { RoleSelection } from '@/components/RoleSelection';

type OnboardingStep = 'splash' | 'language' | 'role' | 'complete';

const Index = () => {
  const { isOnboarded, role, completeOnboarding } = useApp();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('splash');

  useEffect(() => {
    if (isOnboarded && role) {
      navigate('/dashboard');
    }
  }, [isOnboarded, role, navigate]);

  const handleStepComplete = (nextStep: OnboardingStep) => {
    if (nextStep === 'complete') {
      completeOnboarding();
      navigate('/dashboard');
    } else {
      setCurrentStep(nextStep);
    }
  };

  if (currentStep === 'splash') {
    return <SplashScreen onComplete={() => handleStepComplete('language')} />;
  }

  if (currentStep === 'language') {
    return <LanguageSelection onNext={() => handleStepComplete('role')} />;
  }

  if (currentStep === 'role') {
    return <RoleSelection onNext={() => handleStepComplete('complete')} />;
  }

  return null;
};

export default Index;
