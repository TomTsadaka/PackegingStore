'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Package, ShoppingCart, Users, DollarSign } from 'lucide-react';

export function AdminDashboard() {
  const t = useTranslations('admin');

  const stats = [
    {
      title: 'Products',
      value: '0',
      icon: Package,
      href: '/admin/products',
    },
    {
      title: 'Orders',
      value: '0',
      icon: ShoppingCart,
      href: '/admin/orders',
    },
    {
      title: 'Customers',
      value: '0',
      icon: Users,
      href: '/admin/customers',
    },
    {
      title: 'Revenue',
      value: '₪0',
      icon: DollarSign,
      href: '/admin/revenue',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your ecommerce platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <stat.icon className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.title}</div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            <Link href="/admin/products/new">
              <Button className="w-full justify-start" variant="outline">
                Add New Product
              </Button>
            </Link>
            <Link href="/admin/products">
              <Button className="w-full justify-start" variant="outline">
                Manage Products
              </Button>
            </Link>
            <Link href="/admin/orders">
              <Button className="w-full justify-start" variant="outline">
                View Orders
              </Button>
            </Link>
          </div>
        </div>

        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
          <p className="text-muted-foreground text-sm">No recent orders</p>
        </div>
      </div>
    </div>
  );
}

