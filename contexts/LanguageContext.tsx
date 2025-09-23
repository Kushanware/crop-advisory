// Language Context and Translations for Indian Regional Languages

"use client"

import React, { createContext, useContext, useState } from 'react'

// Supported Indian languages
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া' }
]

// Translation keys and values
export const translations = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.scanner': 'Disease Scanner',
    'nav.weather': 'Weather',
    'nav.mandi': 'Mandi Prices',
    'nav.consultation': 'Consultation',
    'nav.yield': 'Yield Prediction',
    'nav.profile': 'Profile',
    
    // Weather Widget
    'weather.title': 'Weather Information',
    'weather.loading': 'Loading weather data...',
    'weather.feelsLike': 'Feels like',
    'weather.humidity': 'Humidity',
    'weather.windSpeed': 'Wind Speed',
    'weather.pressure': 'Pressure',
    'weather.uvIndex': 'UV Index',
    'weather.cloudCoverage': 'Cloud Coverage',
    'weather.lastUpdated': 'Last updated',
    'weather.demoMode': 'Demo Mode',
    'weather.refresh': 'Refresh',
    'weather.tryAgain': 'Try Again',
    'weather.unavailable': 'Weather data unavailable',
    'weather.currentLocation': 'Current Location',
        detectLocation: 'Detect Location',
    currentLocation: 'Current Location',
    
    // UV Levels
    'uv.low': 'Low',
    'uv.moderate': 'Moderate',
    'uv.high': 'High',
    'uv.veryHigh': 'Very High',
    'uv.extreme': 'Extreme',
    
    // Dashboard
    'dashboard.greeting': 'Good morning',
    'dashboard.subtitle': "Here's what's happening on your farm today",
    'dashboard.alerts': 'Alerts',
    'dashboard.profile': 'Profile',
    
    // Common
    'common.language': 'Language',
    'common.selectLanguage': 'Select Language',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save'
  },
  
  hi: {
    // Navigation
    'nav.dashboard': 'डैशबोर्ड',
    'nav.scanner': 'रोग स्कैनर',
    'nav.weather': 'मौसम',
    'nav.mandi': 'मंडी भाव',
    'nav.consultation': 'सलाह',
    'nav.yield': 'उत्पादन पूर्वानुमान',
    'nav.profile': 'प्रोफाइल',
    
    // Weather Widget
    'weather.title': 'मौसम जानकारी',
    'weather.loading': 'मौसम डेटा लोड हो रहा है...',
    'weather.feelsLike': 'महसूस होता है',
    'weather.humidity': 'नमी',
    'weather.windSpeed': 'हवा की गति',
    'weather.pressure': 'दबाव',
    'weather.uvIndex': 'यूवी सूचकांक',
    'weather.cloudCoverage': 'बादल कवरेज',
    'weather.lastUpdated': 'अंतिम अपडेट',
    'weather.demoMode': 'डेमो मोड',
    'weather.refresh': 'रीफ्रेश',
    'weather.tryAgain': 'फिर कोशिश करें',
    'weather.unavailable': 'मौसम डेटा उपलब्ध नहीं',
    'weather.currentLocation': 'वर्तमान स्थान',
    'weather.detectLocation': 'स्थान खोजें',
    
    // UV Levels
    'uv.low': 'कम',
    'uv.moderate': 'मध्यम',
    'uv.high': 'अधिक',
    'uv.veryHigh': 'बहुत अधिक',
    'uv.extreme': 'अत्यधिक',
    
    // Dashboard
    'dashboard.greeting': 'सुप्रभात',
    'dashboard.subtitle': 'आज आपके खेत में क्या हो रहा है',
    'dashboard.alerts': 'अलर्ट',
    'dashboard.profile': 'प्रोफाइल',
    
    // Common
    'common.language': 'भाषा',
    'common.selectLanguage': 'भाषा चुनें',
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'त्रुटि',
    'common.success': 'सफलता',
    'common.cancel': 'रद्द करें',
    'common.save': 'सेव करें'
  },
  
  ta: {
    // Navigation
    'nav.dashboard': 'டாஷ்போர்டு',
    'nav.scanner': 'நோய் ஸ்கேனர்',
    'nav.weather': 'வானிலை',
    'nav.mandi': 'மண்டி விலை',
    'nav.consultation': 'ஆலோசனை',
    'nav.yield': 'மகசூல் கணிப்பு',
    'nav.profile': 'சுயவிவரம்',
    
    // Weather Widget
    'weather.title': 'வானிலை தகவல்',
    'weather.loading': 'வானிலை தரவு ஏற்றுகிறது...',
    'weather.feelsLike': 'உணர்வு',
    'weather.humidity': 'ஈரப்பதம்',
    'weather.windSpeed': 'காற்றின் வேகம்',
    'weather.pressure': 'அழுத்தம்',
    'weather.uvIndex': 'UV குறியீடு',
    'weather.cloudCoverage': 'மேகக் கவரேஜ்',
    'weather.lastUpdated': 'கடைசி புதுப்பிப்பு',
    'weather.demoMode': 'டெமோ முறை',
    'weather.refresh': 'புதுப்பிக்கவும்',
    'weather.tryAgain': 'மீண்டும் முயற்சிக்கவும்',
    'weather.unavailable': 'வானிலை தரவு கிடைக்கவில்லை',
    'weather.currentLocation': 'தற்போதைய இருப்பிடம்',
    'weather.detectLocation': 'இருப்பிடத்தைக் கண்டறிக',
    
    // UV Levels
    'uv.low': 'குறைவு',
    'uv.moderate': 'மிதமான',
    'uv.high': 'அதிகம்',
    'uv.veryHigh': 'மிக அதிகம்',
    'uv.extreme': 'தீவிரம்',
    
    // Dashboard
    'dashboard.greeting': 'காலை வணக்கம்',
    'dashboard.subtitle': 'இன்று உங்கள் பண்ணையில் என்ன நடக்கிறது',
    'dashboard.alerts': 'எச்சரிக்கைகள்',
    'dashboard.profile': 'சுயவிவரம்',
    
    // Common
    'common.language': 'மொழி',
    'common.selectLanguage': 'மொழியைத் தேர்ந்தெடுக்கவும்',
    'common.loading': 'ஏற்றுகிறது...',
    'common.error': 'பிழை',
    'common.success': 'வெற்றி',
    'common.cancel': 'ரத்து',
    'common.save': 'சேமி'
  }
  
  // Note: For demo purposes, only English, Hindi, and Tamil are fully implemented
  // In a production app, all languages would have complete translations
}

// Language Context
interface LanguageContextType {
  currentLanguage: string
  setLanguage: (lang: string) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Language Provider
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState('en')
  
  const setLanguage = (lang: string) => {
    setCurrentLanguage(lang)
    // Store in localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', lang)
    }
  }
  
  // Initialize from localStorage
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('preferred-language')
      if (stored && SUPPORTED_LANGUAGES.find(l => l.code === stored)) {
        setCurrentLanguage(stored)
      }
    }
  }, [])
  
  // Translation function
  const t = (key: string): string => {
    const langData = translations[currentLanguage as keyof typeof translations] || translations.en
    return langData[key as keyof typeof langData] || key
  }
  
  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

// Hook to use language context
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}