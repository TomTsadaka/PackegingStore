import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';

// Mock product - will be replaced with Prisma query
const mockProduct = {
  id: '1',
  slug: 'plastic-bags-clear-20x30',
  nameEn: 'Clear Plastic Bags 20x30cm',
  nameHe: 'שקיות פלסטיק שקופות 20x30 ס"מ',
  descriptionEn: 'Food-grade clear plastic bags perfect for packaging fresh produce, meat, and other food items. Made from high-quality polyethylene.',
  descriptionHe: 'שקיות פלסטיק שקופות למזון, מושלמות לאריזת פירות וירקות טריים, בשר ומוצרי מזון אחרים. עשויות מפוליאתילן איכותי.',
  price: 45.50,
  stock: 1000,
  minOrderQuantity: 100,
  packMultiple: 100,
  images: [],
  material: 'Plastic',
  thickness: 20,
  foodGrade: true,
  sizeLength: 30,
  sizeWidth: 20,
};

export default async function ProductPage({
  params
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  
  // In real app, fetch from database
  if (slug !== mockProduct.slug) {
    notFound();
  }

  const product = {
    ...mockProduct,
    name: locale === 'he' ? mockProduct.nameHe : mockProduct.nameEn,
    description: locale === 'he' ? mockProduct.descriptionHe : mockProduct.descriptionEn,
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('he-IL', {
      style: 'currency',
      currency: 'ILS',
      minimumFractionDigits: 2,
    }).format(price);
  };

  const vatRate = 17;
  const priceWithVat = product.price * (1 + vatRate / 100);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="aspect-square bg-muted rounded-lg overflow-hidden">
          {product.images.length > 0 ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <ShoppingCart className="h-32 w-32" />
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-muted-foreground text-lg">{product.description}</p>
          </div>

          <div className="border-t pt-6 space-y-4">
            <div className="flex items-baseline gap-4">
              <div className="text-4xl font-bold">{formatPrice(product.price)}</div>
              <div className="text-sm text-muted-foreground">ללא מע&ldquo;מ</div>
            </div>
            <div className="text-lg">
              {formatPrice(priceWithVat)} כולל מע&ldquo;מ ({vatRate}%)
            </div>
          </div>

          <div className="space-y-2">
            {product.material && (
              <div className="flex">
                <span className="font-medium w-32">Material:</span>
                <span>{product.material}</span>
              </div>
            )}
            {product.thickness && (
              <div className="flex">
                <span className="font-medium w-32">Thickness:</span>
                <span>{product.thickness}μm</span>
              </div>
            )}
            {product.sizeLength && product.sizeWidth && (
              <div className="flex">
                <span className="font-medium w-32">Size:</span>
                <span>{product.sizeLength} × {product.sizeWidth} cm</span>
              </div>
            )}
            {product.foodGrade && (
              <div className="flex items-center gap-2 text-green-600">
                <span>✓</span>
                <span>Food Grade</span>
              </div>
            )}
          </div>

          <div className="space-y-4 pt-4">
            <div className="text-sm text-muted-foreground">
              Min. Order: {product.minOrderQuantity}
              {product.packMultiple && ` (Pack: ${product.packMultiple})`}
            </div>
            <div className="text-sm">
              {product.stock > 0 ? (
                <span className="text-green-600">In Stock ({product.stock} units)</span>
              ) : (
                <span className="text-destructive">Out of Stock</span>
              )}
            </div>
            <Button className="w-full" size="lg" disabled={product.stock === 0}>
              <ShoppingCart className="h-5 w-5 ltr:mr-2 rtl:ml-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

