import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

export default async function AdminPage() {
  const session = await auth();

  if (!session || session.user.role !== 'OWNER' && session.user.role !== 'ADMIN') {
    redirect('/login');
  }

  return <AdminDashboard />;
}

