'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { signIn } from 'next-auth/react';
import { useRouter } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { CheckCircle2, Loader2 } from 'lucide-react';

export default function RegisterPage() {
  const t = useTranslations('auth');
  const tCommon = useTranslations('common');
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    businessId: '',
    vatNumber: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const steps = useMemo(() => [
    { number: 1, label: t('step1') },
    { number: 2, label: t('step2') },
    { number: 3, label: t('step3') },
  ], [t]);

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }
    }

    if (step === 2) {
      if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    }

    if (step === 3) {
      if (!formData.password) newErrors.password = t('passwordTooShort');
      else if (formData.password.length < 6) newErrors.password = t('passwordTooShort');
      if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
      else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = t('passwordsDontMatch');
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(3)) return;

    setErrors({});
    setSuccess(false);
    setLoading(true);

    try {
      const { confirmPassword, ...submitData } = formData;
      
      console.log('Submitting registration:', { email: submitData.email, companyName: submitData.companyName });
      
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      console.log('Registration response status:', response.status);

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        setError('Failed to parse server response. Please try again.');
        setLoading(false);
        return;
      }

      if (!response.ok) {
        setError(data.error || 'Registration failed. Please try again.');
        setLoading(false);
        return;
      }

      setSuccess(true);
      
      // Auto-login after successful registration
      setTimeout(async () => {
        const result = await signIn('credentials', {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (result?.ok) {
          router.push('/admin');
        } else {
          router.push('/login');
        }
      }, 1500);
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err?.message || 'An error occurred. Please try again.');
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const setError = (message: string) => {
    setErrors({ general: message });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t('name')} *</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'border-destructive' : ''}
                placeholder="John Doe"
                required
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">{t('email')} *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'border-destructive' : ''}
                placeholder="john@company.com"
                required
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">{t('phone')}</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+972-50-123-4567"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">{t('companyName')} *</Label>
              <Input
                id="companyName"
                name="companyName"
                type="text"
                value={formData.companyName}
                onChange={handleChange}
                className={errors.companyName ? 'border-destructive' : ''}
                placeholder="Company Ltd."
                required
              />
              {errors.companyName && (
                <p className="text-sm text-destructive">{errors.companyName}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="businessId">{t('businessId')}</Label>
                <Input
                  id="businessId"
                  name="businessId"
                  type="text"
                  value={formData.businessId}
                  onChange={handleChange}
                  placeholder="123456789"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vatNumber">{t('vatNumber')}</Label>
                <Input
                  id="vatNumber"
                  name="vatNumber"
                  type="text"
                  value={formData.vatNumber}
                  onChange={handleChange}
                  placeholder="IL123456789"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">{t('address')}</Label>
              <Input
                id="address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Main Street"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">{t('city')}</Label>
                <Input
                  id="city"
                  name="city"
                  type="text"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Tel Aviv"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="postalCode">{t('postalCode')}</Label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  type="text"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="61000"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">{t('password')} *</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'border-destructive' : ''}
                placeholder="Minimum 6 characters"
                required
                minLength={6}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t('confirmPassword')} *</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'border-destructive' : ''}
                placeholder="Confirm your password"
                required
              />
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">{errors.confirmPassword}</p>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={`step-${step.number}`} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      currentStep > step.number
                        ? 'bg-primary border-primary text-primary-foreground'
                        : currentStep === step.number
                        ? 'border-primary bg-background text-primary'
                        : 'border-muted-foreground/30 bg-background text-muted-foreground'
                    }`}
                  >
                    {currentStep > step.number ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <span className="font-semibold">{step.number}</span>
                    )}
                  </div>
                  <span
                    className={`mt-2 text-xs font-medium transition-colors ${
                      currentStep >= step.number
                        ? 'text-foreground'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 mx-2 transition-colors duration-300 ${
                      currentStep > step.number ? 'bg-primary' : 'bg-muted-foreground/30'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-center mb-2">{tCommon('register')}</h1>
            <p className="text-center text-muted-foreground">
              {currentStep === 1 && 'Tell us about yourself'}
              {currentStep === 2 && 'Company information'}
              {currentStep === 3 && 'Create your account'}
            </p>
          </div>

          <form onSubmit={currentStep === 3 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }} className="space-y-6">
            {errors.general && (
              <div className="bg-destructive/10 text-destructive p-4 rounded-lg text-sm border border-destructive/20">
                {errors.general}
              </div>
            )}
            
            {success && (
              <div className="bg-green-500/10 text-green-600 dark:text-green-400 p-4 rounded-lg text-sm border border-green-500/20 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                {t('registerSuccess')}
              </div>
            )}

            {/* Step Content - Using function to render instead of conditional */}
            <div className="min-h-[300px]">
              {renderStepContent()}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1 || loading}
                className="min-w-[100px]"
              >
                {t('previous')}
              </Button>

              {currentStep < 3 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="min-w-[100px]"
                >
                  {t('next')}
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={loading || success}
                  className="min-w-[100px]"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : success ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Success!
                    </>
                  ) : (
                    t('createAccount')
                  )}
                </Button>
              )}
            </div>

            <div className="text-center text-sm text-muted-foreground pt-4 border-t">
              {t('alreadyHaveAccount')}{' '}
              <Link href="/login" className="text-primary hover:underline font-medium">
                {tCommon('login')}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
