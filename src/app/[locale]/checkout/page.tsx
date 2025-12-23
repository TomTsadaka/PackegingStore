'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getCart, clearCart } from '@/lib/cart';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function CheckoutPage() {
  const t = useTranslations('checkout');
  const tCommon = useTranslations('common');
  const router = useRouter();
  const [cart, setCart] = useState(getCart());
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'invoice'>('invoice');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const currentCart = getCart();
    if (currentCart.items.length === 0) {
      router.push('/cart');
      return;
    }
    setCart(currentCart);
  }, [router]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS',
      minimumFractionDigits: 2,
    }).format(price);
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart.items.map((item) => ({
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
            unitPrice: item.price,
          })),
          shippingAddress: {
            company: 'Company Name', // TODO: Get from form
            street: 'Street Address',
            city: 'City',
            postalCode: '12345',
            region: 'Center',
          },
          billingAddress: {
            company: 'Company Name',
            street: 'Street Address',
            city: 'City',
            postalCode: '12345',
          },
          paymentMethod: paymentMethod === 'stripe' ? 'STRIPE' : 'INVOICE',
          notes: '',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      clearCart();
      router.push('/order-success');
    } catch (error) {
      console.error('Order creation error:', error);
      alert('Failed to create order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('title')}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">{t('shipping')}</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="company">Company Name</Label>
                <Input id="company" required />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" required />
                </div>
                <div>
                  <Label htmlFor="postal">Postal Code</Label>
                  <Input id="postal" />
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">{t('payment')}</h2>
            <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as 'stripe' | 'invoice')}>
              <div className="flex items-center space-x-2 mb-4">
                <RadioGroupItem value="invoice" id="invoice" />
                <Label htmlFor="invoice" className="cursor-pointer">
                  {t('payByInvoice')}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="stripe" id="stripe" />
                <Label htmlFor="stripe" className="cursor-pointer">
                  {t('payByCard')}
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">{t('orderSummary')}</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>{tCommon('subtotal')}</span>
                <span>{formatPrice(cart.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{tCommon('vat')} ({cart.vatRate}%)</span>
                <span>{formatPrice(cart.vatAmount)}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between text-xl font-bold">
                  <span>{tCommon('total')}</span>
                  <span>{formatPrice(cart.total)}</span>
                </div>
              </div>
            </div>

            <Button
              className="w-full"
              size="lg"
              onClick={handlePlaceOrder}
              disabled={loading}
            >
              {loading ? 'Processing...' : t('placeOrder')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

