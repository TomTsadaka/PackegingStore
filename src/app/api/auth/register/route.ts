import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
  companyName: z.string().min(1),
  businessId: z.string().optional(),
  vatNumber: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      const errorMessages = parsed.error.errors.map((err) => `${err.path.join('.')}: ${err.message}`).join(', ');
      return NextResponse.json(
        { error: `Invalid input: ${errorMessages}` },
        { status: 400 }
      );
    }

    const { email, password, name, companyName, businessId, vatNumber, phone, address, city, postalCode } = parsed.data;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Create company
    const company = await prisma.company.create({
      data: {
        name: companyName,
        nameEn: companyName,
        businessId,
        vatNumber,
        phone,
        address,
        city,
        postalCode,
        email,
        tier: 'retail',
      },
    });

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        companyId: company.id,
        role: 'OWNER',
      },
    });

    return NextResponse.json(
      { message: 'User created successfully', userId: user.id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration error:', error);
    
    // Handle Prisma unique constraint errors
    if (error?.code === 'P2002') {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }
    
    // Handle other Prisma errors
    if (error?.code?.startsWith('P')) {
      return NextResponse.json(
        { error: 'Database error occurred' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

