'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';

export function AdminProductsList() {
  const [products] = useState([]); // TODO: Fetch from API

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link href="/admin/products/new">
          <Button>
            <Plus className="h-4 w-4 ltr:mr-2 rtl:ml-2" />
            Add Product
          </Button>
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="border rounded-lg p-12 text-center">
          <p className="text-muted-foreground mb-4">No products yet</p>
          <Link href="/admin/products/new">
            <Button>Add Your First Product</Button>
          </Link>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">SKU</th>
                <th className="text-left p-4">Price</th>
                <th className="text-left p-4">Stock</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product: any) => (
                <tr key={product.id} className="border-t">
                  <td className="p-4">{product.nameEn}</td>
                  <td className="p-4">{product.sku}</td>
                  <td className="p-4">₪{product.price}</td>
                  <td className="p-4">{product.stock}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Link href={`/admin/products/${product.id}/edit`}>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

