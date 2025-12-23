'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useRouter } from '@/i18n/routing';

export function ProductSearch() {
  const t = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-md">
      <Input
        type="text"
        placeholder={t('search')}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pr-10"
      />
      <button
        type="submit"
        className="absolute ltr:right-2 rtl:left-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
      >
        <Search className="h-5 w-5" />
      </button>
    </form>
  );
}

