import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export default function OrderSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
        <p className="text-muted-foreground mb-8">
          Your order has been received and is being processed.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/products">
            <Button variant="outline">Continue Shopping</Button>
          </Link>
          <Link href="/admin/orders">
            <Button>View Orders</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

