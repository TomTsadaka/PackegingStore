'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ProductSearch } from '@/components/products/ProductSearch';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { signOut, useSession } from 'next-auth/react';

export function Navbar() {
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-bold">
              צ.י אריזות
            </Link>
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {t('home')}
              </Link>
              <Link
                href="/products"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {t('products')}
              </Link>
              {session && (session.user.role === 'OWNER' || session.user.role === 'ADMIN') && (
                <Link
                  href="/admin"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  {t('admin')}
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <ProductSearch />
            </div>
            <LanguageSwitcher />
            <Link href="/cart">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">{tCommon('cart')}</span>
              </Button>
            </Link>
            {session ? (
              <>
                <Button variant="ghost" size="icon" onClick={() => signOut()}>
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">{tCommon('logout')}</span>
                </Button>
              </>
            ) : (
              <Link href="/login">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">{tCommon('login')}</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

