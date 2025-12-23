import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const productSchema = z.object({
  slug: z.string(),
  sku: z.string(),
  nameEn: z.string().min(1),
  nameHe: z.string().min(1),
  descriptionEn: z.string().optional(),
  descriptionHe: z.string().optional(),
  shortDescriptionEn: z.string().optional(),
  shortDescriptionHe: z.string().optional(),
  categoryId: z.string(),
  price: z.number().min(0),
  stock: z.number().int().min(0),
  minOrderQuantity: z.number().int().min(1),
  packMultiple: z.number().int().optional(),
  material: z.string().optional(),
  thickness: z.number().optional(),
  sizeLength: z.number().optional(),
  sizeWidth: z.number().optional(),
  sizeHeight: z.number().optional(),
  color: z.string().optional(),
  usage: z.string().optional(),
  foodGrade: z.boolean().default(false),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const categoryId = searchParams.get('categoryId');
    const material = searchParams.get('material');
    const locale = searchParams.get('locale') || 'en';

    const where: any = {
      isActive: true,
    };

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (material) {
      where.material = material;
    }

    if (search) {
      where.OR = [
        { nameEn: { contains: search, mode: 'insensitive' } },
        { nameHe: { contains: search, mode: 'insensitive' } },
        { descriptionEn: { contains: search, mode: 'insensitive' } },
        { descriptionHe: { contains: search, mode: 'insensitive' } },
        { sku: { contains: search, mode: 'insensitive' } },
      ];
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json({ products });
  } catch (error) {
    console.error('Products fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user || (session.user.role !== 'OWNER' && session.user.role !== 'ADMIN')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const parsed = productSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.errors },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: parsed.data,
      include: {
        category: true,
      },
    });

    return NextResponse.json(
      { product, message: 'Product created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Product creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

