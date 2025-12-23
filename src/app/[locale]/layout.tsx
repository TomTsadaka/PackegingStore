import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Inter, Assistant } from 'next/font/google';
import { SessionProvider } from '@/components/providers/SessionProvider';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const assistant = Assistant({ 
  subsets: ['hebrew', 'latin'], 
  variable: '--font-assistant',
  weight: ['400', '500', '600', '700']
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  const isRTL = locale === 'he';

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'}>
      <body className={`${inter.variable} ${assistant.variable} ${isRTL ? 'font-assistant' : 'font-inter'} antialiased`}>
        <SessionProvider>
          <NextIntlClientProvider messages={messages}>
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
          </NextIntlClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

