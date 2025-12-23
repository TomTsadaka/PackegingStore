'use client';

import { useTranslations } from 'next-intl';
import { Shield, Truck, DollarSign, Headphones } from 'lucide-react';

export function ValuePropositions() {
  const t = useTranslations('home.values');

  const values = [
    {
      icon: Shield,
      title: t('quality.title'),
      description: t('quality.description'),
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Truck,
      title: t('delivery.title'),
      description: t('delivery.description'),
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      icon: DollarSign,
      title: t('pricing.title'),
      description: t('pricing.description'),
      color: 'text-gray-800',
      bgColor: 'bg-gray-50',
    },
    {
      icon: Headphones,
      title: t('support.title'),
      description: t('support.description'),
      color: 'text-blue-800',
      bgColor: 'bg-blue-50',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 group text-center"
              >
                <div className={`${value.bgColor} w-16 h-16 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`h-8 w-8 ${value.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

