import { useState, useEffect, useMemo, useCallback } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';

import { APP_CONFIG } from './config/appConfig';
import { gymApi } from './api/gymApi';
import { useGymData } from './hooks/useGymData';

import { calculateBMI, generateMathCaptcha, validateContactForm } from './services/calculatorService';

import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { EquipmentArena } from './components/EquipmentArena';
import { ClassesSection } from './components/ClassesSection';
import { BMICalculator } from './components/BMICalculator';
import { TrainersSection } from './components/TrainersSection';
import { PricingSection } from './components/PricingSection';
import { ContactFormSection } from './components/ContactFormSection';
import { Footer } from './components/Footer';


export default function App() {
  const { data: gymData, loading: apiLoading, error: apiError, refetch } = useGymData();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [billingPeriod, setBillingPeriod] = useState('monthly');

  // Contact Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    websiteHoneypot: '',
    userCaptchaAnswer: ''
  });

  const [captchaProblem, setCaptchaProblem] = useState({ num1: 5, num2: 3, answer: 8 });
  const [cooldownTime, setCooldownTime] = useState(0);
  const [formErrors, setFormErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // BMI State
  const [heightCm, setHeightCm] = useState(178);
  const [weightKg, setWeightKg] = useState(78);

  const calculatedBMI = useMemo(() => {
    return calculateBMI(heightCm, weightKg);
  }, [heightCm, weightKg]);

  const refreshCaptcha = useCallback(() => {
    setCaptchaProblem(generateMathCaptcha());
  }, []);

  useEffect(() => {
    refreshCaptcha();
  }, [refreshCaptcha]);

  useEffect(() => {
    if (cooldownTime > 0) {
      const timer = setTimeout(() => setCooldownTime(cooldownTime - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldownTime]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (cooldownTime > 0) return;

    const { isValid, errors } = validateContactForm(
      formData,
      captchaProblem.answer,
      formData.websiteHoneypot
    );

    if (!isValid) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    try {
      const apiResponse = await gymApi.registerDayPass({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone
      });

      setSubmitSuccess({
        refId: apiResponse.refId,
        name: formData.fullName
      });
      setCooldownTime(30);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        websiteHoneypot: '',
        userCaptchaAnswer: ''
      });
      refreshCaptcha();
    } catch (err) {
      setFormErrors({ general: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  // API Loading Skeleton State
  if (apiLoading) {
    return (
      <div className="min-h-screen bg-[#0d0304] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <Loader2 className="w-12 h-12 text-red-500 animate-spin" />
        <h2 className="text-xl font-black text-white tracking-wider">CONNECTING TO {APP_CONFIG.shortName} API...</h2>
        <p className="text-xs text-slate-400">Loading live machinery datasets, coach profiles, and class schedules</p>
      </div>
    );
  }

  // API Error Boundary Fallback State
  if (apiError) {
    return (
      <div className="min-h-screen bg-[#0d0304] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <h2 className="text-xl font-black text-white tracking-wider">API CONNECTION FAILURE</h2>
        <p className="text-xs text-slate-400 max-w-md">{apiError}</p>
        <button
          onClick={refetch}
          className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-all"
        >
          RETRY CONNECTION
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0304] text-slate-100 font-sans selection:bg-red-600 selection:text-white">
      <Navbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      
      <main>
        <HeroSection stats={gymData?.stats} />
        <EquipmentArena equipmentList={gymData?.equipment} />
        <ClassesSection
          classesList={gymData?.classes}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <BMICalculator
          heightCm={heightCm}
          setHeightCm={setHeightCm}
          weightKg={weightKg}
          setWeightKg={setWeightKg}
          calculatedBMI={calculatedBMI}
        />
        <TrainersSection trainersList={gymData?.trainers} />
        <PricingSection 
          billingPeriod={billingPeriod} 
          setBillingPeriod={setBillingPeriod} 
          pricingList={gymData?.pricing} 
        />
        <ContactFormSection
          formData={formData}
          setFormData={setFormData}
          captchaProblem={captchaProblem}
          generateCaptcha={refreshCaptcha}
          cooldownTime={cooldownTime}
          formErrors={formErrors}
          submitSuccess={submitSuccess}
          setSubmitSuccess={setSubmitSuccess}
          isSubmitting={isSubmitting}
          handleFormSubmit={handleFormSubmit}
        />
      </main>

      <Footer />
    </div>
  );
}
