import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductFilters } from '@/components/products/ProductFilters';
import { Suspense } from 'react';

export default function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; categoryId?: string; material?: string }>;
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Products</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-64 flex-shrink-0">
          <Suspense fallback={<div>Loading filters...</div>}>
            <ProductFilters />
          </Suspense>
        </aside>

        <main className="flex-1">
          <Suspense fallback={<div>Loading products...</div>}>
            <ProductGridWrapper searchParams={searchParams} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}

async function ProductGridWrapper({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; categoryId?: string; material?: string }>;
}) {
  const params = await searchParams;
  return <ProductGrid searchParams={params} />;
}

