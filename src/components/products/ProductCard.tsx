'use client';

import { useTranslations } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { addToCart } from '@/lib/cart';

interface ProductCardProps {
  product: {
    id: string;
    slug: string;
    name: string;
    description?: string;
    price: number;
    stock: number;
    minOrderQuantity: number;
    packMultiple?: number;
    images: string[];
    material?: string;
    thickness?: number;
    foodGrade?: boolean;
    categoryName?: string;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations('products');
  const tCommon = useTranslations('common');
  const router = useRouter();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS',
      minimumFractionDigits: 2,
    }).format(price);
  };

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      quantity: product.minOrderQuantity,
      price: product.price,
      name: product.name,
      image: product.images[0],
    });
    // Optional: Show toast notification
    router.push('/cart');
  };

  return (
    <div className="group relative border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/p/${product.slug}`}>
        <div className="aspect-square bg-muted relative overflow-hidden">
          {product.images.length > 0 ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <ShoppingCart className="h-16 w-16" />
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <Link href={`/p/${product.slug}`}>
          <h3 className="font-semibold mb-2 line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        {product.description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {product.description}
          </p>
        )}

        <div className="flex flex-col gap-2 mb-4">
          {product.categoryName && (
            <div className="text-xs text-muted-foreground">
              <span className="font-medium">{tCommon('categories')}:</span> {product.categoryName}
            </div>
          )}
          {product.material && (
            <div className="text-xs text-muted-foreground">
              <span className="font-medium">Material:</span> {product.material}
            </div>
          )}
          {product.thickness && (
            <div className="text-xs text-muted-foreground">
              <span className="font-medium">Thickness:</span> {product.thickness}μm
            </div>
          )}
          {product.foodGrade && (
            <div className="text-xs text-green-600">
              ✓ Food Grade
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-2xl font-bold">{formatPrice(product.price)}</div>
            <div className="text-xs text-muted-foreground">{tCommon('vatExcluded')}</div>
          </div>
          <div className="text-right">
            {product.stock > 0 ? (
              <span className="text-sm text-green-600">{t('inStock')}</span>
            ) : (
              <span className="text-sm text-destructive">{t('outOfStock')}</span>
            )}
          </div>
        </div>

        <div className="text-xs text-muted-foreground mb-4">
          {t('minOrder')}: {product.minOrderQuantity}
          {product.packMultiple && ` (Pack: ${product.packMultiple})`}
        </div>

        <Button className="w-full" disabled={product.stock === 0} onClick={handleAddToCart}>
          <ShoppingCart className="h-4 w-4 ltr:mr-2 rtl:ml-2" />
          {tCommon('addToCart')}
        </Button>
      </div>
    </div>
  );
}

