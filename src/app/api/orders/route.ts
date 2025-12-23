import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { sendEmail, generateOrderConfirmationEmail } from '@/lib/email';
import { z } from 'zod';

const orderSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      variantId: z.string().optional(),
      quantity: z.number().min(1),
      unitPrice: z.number(),
    })
  ),
  shippingAddress: z.object({
    company: z.string(),
    street: z.string(),
    city: z.string(),
    postalCode: z.string().optional(),
    region: z.string().optional(),
  }),
  billingAddress: z.object({
    company: z.string(),
    street: z.string(),
    city: z.string(),
    postalCode: z.string().optional(),
  }),
  paymentMethod: z.enum(['STRIPE', 'INVOICE']),
  notes: z.string().optional(),
});

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
    const parsed = orderSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: parsed.error.errors },
        { status: 400 }
      );
    }

    const { items, shippingAddress, billingAddress, paymentMethod, notes } = parsed.data;

    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    const vatRate = 17; // Default VAT rate
    const vatAmount = subtotal * (vatRate / 100);
    const total = subtotal + vatAmount;

    // Generate order number
    const orderNumber = `TY-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Create order
    const order = await prisma.order.create({
      data: {
        orderNumber,
        companyId: session.user.companyId,
        status: 'PENDING',
        subtotal,
        vatRate,
        vatAmount,
        shipping: 0, // TODO: Calculate shipping
        discount: 0,
        total,
        currency: 'ILS',
        paymentMethod,
        paymentStatus: paymentMethod === 'INVOICE' ? 'PENDING' : 'PENDING',
        shippingAddress: shippingAddress as any,
        billingAddress: billingAddress as any,
        notes,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            total: item.unitPrice * item.quantity,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    // Update product stock
    for (const item of items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    // Send order confirmation email
    try {
      const company = await prisma.company.findUnique({
        where: { id: session.user.companyId },
      });

      if (company?.email) {
        const emailOptions = generateOrderConfirmationEmail(
          orderNumber,
          company.email,
          total,
          'en' // TODO: Get from user preference
        );
        await sendEmail(emailOptions);
      }
    } catch (emailError) {
      console.error('Failed to send order confirmation email:', emailError);
      // Don't fail the order if email fails
    }

    return NextResponse.json(
      { order, message: 'Order created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const companyId = session.user.role === 'OWNER' || session.user.role === 'ADMIN'
      ? searchParams.get('companyId') || session.user.companyId
      : session.user.companyId;

    const orders = await prisma.order.findMany({
      where: {
        companyId: companyId || undefined,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        company: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 50,
    });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Orders fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

