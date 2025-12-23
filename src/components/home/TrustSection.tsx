'use client';

import { useTranslations } from 'next-intl';
import { Award, Users, Clock, CheckCircle } from 'lucide-react';

export function TrustSection() {
  const t = useTranslations('home.trust');

  const stats = [
    {
      icon: Clock,
      value: '15+',
      label: t('experience'),
      description: t('experienceDesc'),
    },
    {
      icon: Users,
      value: '500+',
      label: t('customers'),
      description: t('customersDesc'),
    },
    {
      icon: Award,
      value: '100%',
      label: t('quality'),
      description: t('qualityDesc'),
    },
    {
      icon: CheckCircle,
      value: '24/7',
      label: t('support'),
      description: t('supportDesc'),
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center p-6 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-blue-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-xl font-semibold mb-2">
                  {stat.label}
                </div>
                <div className="text-gray-300 text-sm">
                  {stat.description}
                </div>
              </div>
            );
          })}
        </div>

        {/* Testimonial */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-white">צ.י</span>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-lg italic text-gray-200 mb-4">
                  &ldquo;{t('testimonial.quote')}&rdquo;
                </p>
                <div className="flex items-center gap-2">
                  <div className="h-px flex-1 bg-gray-600"></div>
                  <div>
                    <div className="font-semibold">{t('testimonial.author')}</div>
                    <div className="text-sm text-gray-400">{t('testimonial.role')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

