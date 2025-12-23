import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { AdminProductsList } from '@/components/admin/AdminProductsList';

export default async function AdminProductsPage() {
  const session = await auth();

  if (!session || (session.user.role !== 'OWNER' && session.user.role !== 'ADMIN')) {
    redirect('/login');
  }

  return <AdminProductsList />;
}

