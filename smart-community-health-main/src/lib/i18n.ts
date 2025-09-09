// Internationalization utilities
export type Language = 'en' | 'hi' | 'as' | 'bn';

export interface Translations {
  [key: string]: string | Translations;
}

export const translations: Record<Language, Translations> = {
  en: {
    app: {
      name: 'Smart Health Monitoring System',
      tagline: 'Empowering Communities Through Health Data'
    },
    languages: {
      en: 'English',
      hi: 'हिंदी',
      as: 'অসমীয়া',
      bn: 'বাংলা'
    },
    roles: {
      title: 'Select Your Role',
      subtitle: 'Choose how you\'ll be using the system',
      asha: 'ASHA Worker / Health Volunteer',
      community: 'Community Member',
      admin: 'Admin / Health Officer'
    },
    navigation: {
      home: 'Home',
      dataEntry: 'Data Entry',
      reports: 'Reports',
      alerts: 'Alerts',
      awareness: 'Awareness',
      settings: 'Settings'
    },
    dataEntry: {
      title: 'Patient Information',
      name: 'Patient Name',
      age: 'Age',
      gender: 'Gender',
      symptoms: 'Symptoms',
      waterSource: 'Water Source Condition',
      save: 'Save Data'
    },
    waterQuality: {
      title: 'Water Quality Report',
      turbidity: 'Turbidity',
      ph: 'pH Level',
      temperature: 'Temperature',
      status: {
        safe: 'Safe',
        warning: 'Warning',
        unsafe: 'Unsafe'
      }
    },
    alerts: {
      title: 'Health Alerts',
      noAlerts: 'No active alerts',
      boilWater: 'Boil water before drinking',
      seekMedical: 'Seek immediate medical attention'
    }
  },
  hi: {
    app: {
      name: 'स्मार्ट स्वास्थ्य निगरानी प्रणाली',
      tagline: 'स्वास्थ्य डेटा के माध्यम से समुदायों को सशक्त बनाना'
    },
    languages: {
      en: 'English',
      hi: 'हिंदी',
      as: 'অসমীয়া',
      bn: 'বাংলা'
    },
    roles: {
      title: 'अपनी भूमिका चुनें',
      subtitle: 'चुनें कि आप सिस्टम का उपयोग कैसे करेंगे',
      asha: 'आशा कार्यकर्ता / स्वास्थ्य स्वयंसेवक',
      community: 'समुदाय के सदस्य',
      admin: 'व्यवस्थापक / स्वास्थ्य अधिकारी'
    },
    navigation: {
      home: 'होम',
      dataEntry: 'डेटा एंट्री',
      reports: 'रिपोर्ट्स',
      alerts: 'अलर्ट',
      awareness: 'जागरूकता',
      settings: 'सेटिंग्स'
    }
  },
  as: {
    app: {
      name: 'স্মাৰ্ট স্বাস্থ্য নিৰীক্ষণ প্ৰণালী',
      tagline: 'স্বাস্থ্য তথ্যৰ জৰিয়তে সমাজক ক্ষমতাশালী কৰা'
    },
    languages: {
      en: 'English',
      hi: 'हिंदी',
      as: 'অসমীয়া',
      bn: 'বাংলা'
    },
    roles: {
      title: 'আপোনাৰ ভূমিকা বাছনি কৰক',
      subtitle: 'বাছনি কৰক যে আপুনি কেনেকৈ ব্যৱস্থাপনা ব্যৱহাৰ কৰিব',
      asha: 'আশা কৰ্মী / স্বাস্থ্য স্বেচ্ছাসেৱক',
      community: 'সমাজৰ সদস্য',
      admin: 'প্ৰশাসক / স্বাস্থ্য বিষয়া'
    },
    navigation: {
      home: 'ঘৰ',
      dataEntry: 'তথ্য এণ্ট্ৰী',
      reports: 'প্ৰতিবেদন',
      alerts: 'সতৰ্কবাণী',
      awareness: 'সজাগতা',
      settings: 'ছেটিংছ'
    }
  },
  bn: {
    app: {
      name: 'স্মার্ট স্বাস্থ্য পর্যবেক্ষণ সিস্টেম',
      tagline: 'স্বাস্থ্য তথ্যের মাধ্যমে সম্প্রদায়কে ক্ষমতায়ন'
    },
    languages: {
      en: 'English',
      hi: 'हिंदी',
      as: 'অসমীয়া',
      bn: 'বাংলা'
    },
    roles: {
      title: 'আপনার ভূমিকা নির্বাচন করুন',
      subtitle: 'নির্বাচন করুন আপনি কিভাবে সিস্টেম ব্যবহার করবেন',
      asha: 'আশা কর্মী / স্বাস্থ্য স্বেচ্ছাসেবক',
      community: 'সম্প্রদায়ের সদস্য',
      admin: 'প্রশাসক / স্বাস্থ্য কর্মকর্তা'
    },
    navigation: {
      home: 'হোম',
      dataEntry: 'ডেটা এন্ট্রি',
      reports: 'রিপোর্ট',
      alerts: 'সতর্কতা',
      awareness: 'সচেতনতা',
      settings: 'সেটিংস'
    }
  }
};

export const getTranslation = (
  translations: Translations,
  path: string,
  fallback: string = ''
): string => {
  const keys = path.split('.');
  let current: any = translations;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return fallback;
    }
  }
  
  return typeof current === 'string' ? current : fallback;
};