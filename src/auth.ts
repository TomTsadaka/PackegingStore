import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Credentials from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import { compare } from 'bcryptjs';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    signOut: '/logout',
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        const user = await prisma.user.findUnique({
          where: { email },
          include: {
            company: true,
          },
        });

        if (!user) {
          console.error(`User not found: ${email}`);
          return null;
        }

        if (!user.password) {
          console.error(`User has no password set: ${email}`);
          return null;
        }

        // Check if password is hashed (starts with $2a$, $2b$, or $2y$)
        const isHashed = user.password.startsWith('$2');
        
        let isValid = false;
        if (isHashed) {
          // Password is hashed, use bcrypt compare
          try {
            isValid = await compare(password, user.password);
          } catch (error) {
            console.error('Password comparison error:', error);
            return null;
          }
        } else {
          // Password is not hashed (plain text - dev only)
          if (process.env.NODE_ENV === 'development') {
            isValid = password === user.password;
          } else {
            console.error('Plain text password detected in production');
            return null;
          }
        }

        if (!isValid) {
          console.error(`Invalid password for user: ${email}`);
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          companyId: user.companyId,
          company: user.company,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.companyId = (user as any).companyId;
        token.company = (user as any).company;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.companyId = token.companyId as string;
        session.user.company = token.company as any;
      }
      return session;
    },
  },
});

