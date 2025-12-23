import 'next-auth';
import { UserRole } from '@prisma/client';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      role: UserRole;
      companyId?: string | null;
      company?: {
        id: string;
        name: string;
        tier: string;
      } | null;
    };
  }

  interface User {
    id: string;
    email: string;
    name?: string | null;
    role: UserRole;
    companyId?: string | null;
    company?: {
      id: string;
      name: string;
      tier: string;
    } | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: UserRole;
    companyId?: string | null;
    company?: {
      id: string;
      name: string;
      tier: string;
    } | null;
  }
}

