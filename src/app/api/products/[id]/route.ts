import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const updateProductSchema = z.object({
  slug: z.string().optional(),
  sku: z.string().optional(),
  nameEn: z.string().min(1).optional(),
  nameHe: z.string().min(1).optional(),
  descriptionEn: z.string().optional(),
  descriptionHe: z.string().optional(),
  shortDescriptionEn: z.string().optional(),
  shortDescriptionHe: z.string().optional(),
  categoryId: z.string().optional(),
  price: z.number().min(0).optional(),
  stock: z.number().int().min(0).optional(),
  minOrderQuantity: z.number().int().min(1).optional(),
  packMultiple: z.number().int().optional(),
  material: z.string().optional(),
  thickness: z.number().optional(),
  sizeLength: z.number().optional(),
  sizeWidth: z.number().optional(),
  sizeHeight: z.number().optional(),
  color: z.string().optional(),
  usage: z.string().optional(),
  foodGrade: z.boolean().optional(),
  isActive: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
});

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        variants: true,
        pricingTiers: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ product });
  } catch (error) {
    console.error('Product fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user || (session.user.role !== 'OWNER' && session.user.role !== 'ADMIN')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const parsed = updateProductSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.errors },
        { status: 400 }
      );
    }

    const product = await prisma.product.update({
      where: { id },
      data: parsed.data,
      include: {
        category: true,
      },
    });

    return NextResponse.json(
      { product, message: 'Product updated successfully' }
    );
  } catch (error) {
    console.error('Product update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user || (session.user.role !== 'OWNER' && session.user.role !== 'ADMIN')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;

    await prisma.product.update({
      where: { id },
      data: {
        isActive: false,
      },
    });

    return NextResponse.json(
      { message: 'Product deleted successfully' }
    );
  } catch (error) {
    console.error('Product deletion error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

