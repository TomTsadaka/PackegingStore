import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const cartItemSchema = z.object({
  productId: z.string(),
  variantId: z.string().optional(),
  quantity: z.number().min(1),
});

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.companyId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // For now, return empty cart (can be extended to store cart in DB)
    return NextResponse.json({
      items: [],
      subtotal: 0,
      vatRate: 17,
      vatAmount: 0,
      total: 0,
    });
  } catch (error) {
    console.error('Cart fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.companyId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const parsed = cartItemSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.errors },
        { status: 400 }
      );
    }

    const { productId, variantId, quantity } = parsed.data;

    // Verify product exists and is available
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product || !product.isActive) {
      return NextResponse.json(
        { error: 'Product not found or unavailable' },
        { status: 404 }
      );
    }

    if (product.stock < quantity) {
      return NextResponse.json(
        { error: 'Insufficient stock' },
        { status: 400 }
      );
    }

    // For now, just return success (cart stored in localStorage)
    // TODO: Store cart in database for logged-in users
    return NextResponse.json({
      message: 'Item added to cart',
      product: {
        id: product.id,
        name: product.nameEn,
        price: product.price,
        stock: product.stock,
      },
    });
  } catch (error) {
    console.error('Cart add error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

