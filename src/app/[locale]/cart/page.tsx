'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getCart, updateCartItemQuantity, removeFromCart, CartItem } from '@/lib/cart';
import { Trash2, Plus, Minus } from 'lucide-react';
import Image from 'next/image';

export default function CartPage() {
  const t = useTranslations('cart');
  const tCommon = useTranslations('common');
  const [cart, setCart] = useState(getCart());

  useEffect(() => {
    setCart(getCart());
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS',
      minimumFractionDigits: 2,
    }).format(price);
  };

  const handleQuantityChange = (item: CartItem, newQuantity: number) => {
    const updated = updateCartItemQuantity(
      item.productId,
      newQuantity,
      item.variantId
    );
    setCart(updated);
  };

  const handleRemove = (item: CartItem) => {
    const updated = removeFromCart(item.productId, item.variantId);
    setCart(updated);
  };

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">{t('title')}</h1>
          <p className="text-muted-foreground mb-8">{t('empty')}</p>
          <Link href="/products">
            <Button>{tCommon('continueShopping')}</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{t('title')}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <div
              key={`${item.productId}-${item.variantId || 'default'}`}
              className="border rounded-lg p-4 flex gap-4"
            >
              <div className="w-24 h-24 bg-muted rounded-md flex-shrink-0 flex items-center justify-center">
                {item.image ? (
                  <Image src={item.image} alt={item.name} width={96} height={96} className="rounded-md" />
                ) : (
                  <div className="text-muted-foreground text-xs">No Image</div>
                )}
              </div>

              <div className="flex-1">
                <h3 className="font-semibold mb-2">{item.name}</h3>
                <div className="text-lg font-bold mb-4">{formatPrice(item.price)}</div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleQuantityChange(item, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item, parseInt(e.target.value) || 1)
                      }
                      className="w-16 h-8 text-center border-0"
                      min="1"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleQuantityChange(item, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemove(item)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xl font-bold">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="border rounded-lg p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4">{tCommon('checkout')}</h2>
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

            <Link href="/checkout" className="block">
              <Button className="w-full" size="lg">
                {t('proceedToCheckout')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

