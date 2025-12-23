import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'en';

    const categories = await prisma.category.findMany({
      orderBy: {
        order: 'asc',
      },
    });

    // Transform categories to include localized name
    const localizedCategories = categories.map((category) => ({
      id: category.id,
      slug: category.slug,
      name: locale === 'he' ? category.nameHe : category.nameEn,
      nameEn: category.nameEn,
      nameHe: category.nameHe,
      description: locale === 'he' ? category.descriptionHe : category.descriptionEn,
      image: category.image,
      order: category.order,
    }));

    return NextResponse.json({ categories: localizedCategories });
  } catch (error) {
    console.error('Categories fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

