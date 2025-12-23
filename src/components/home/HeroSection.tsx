'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { ArrowRight, Package } from 'lucide-react';

export function HeroSection() {
  const t = useTranslations('home.hero');

  return (
    <section className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-gray-900 text-white overflow-hidden">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center mb-6">
            <Package className="h-12 w-12 ltr:mr-3 rtl:ml-3 text-blue-200" />
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-200">
              צ.י אריזות
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {t('title')}
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/products">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6 h-auto font-semibold group"
              >
                {t('cta.primary')}
                <ArrowRight className="h-5 w-5 ltr:ml-2 rtl:mr-2 ltr:group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/contact">
              <button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-lg font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border-2 border-white bg-transparent text-white hover:bg-white hover:text-blue-600 px-8 py-6 h-auto shadow-lg"
              >
                {t('cta.secondary')}
              </button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-blue-200">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-lg">15+</span>
              <span>{t('trust.years')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-lg">500+</span>
              <span>{t('trust.customers')}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-lg">24/7</span>
              <span>{t('trust.support')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-12 text-gray-50" fill="currentColor" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>
    </section>
  );
}

