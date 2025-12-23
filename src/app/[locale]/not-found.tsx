import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl text-muted-foreground mb-8">Page not found</p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
      >
        Go Home
      </Link>
    </div>
  );
}

