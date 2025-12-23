import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create categories
  const categories = [
    {
      slug: 'plastic-bags',
      nameEn: 'Plastic Bags',
      nameHe: 'שקיות פלסטיק',
      descriptionEn: 'Food-grade plastic bags for packaging',
      descriptionHe: 'שקיות פלסטיק למזון לאריזה',
      order: 1,
    },
    {
      slug: 'nylon-rolls',
      nameEn: 'Nylon Rolls',
      nameHe: 'גלילי ניילון',
      descriptionEn: 'Heavy-duty nylon rolls for packaging',
      descriptionHe: 'גלילי ניילון עמידים לאריזה',
      order: 2,
    },
    {
      slug: 'carton-boxes',
      nameEn: 'Carton Boxes',
      nameHe: 'קופסאות קרטון',
      descriptionEn: 'Recyclable carton boxes',
      descriptionHe: 'קופסאות קרטון ממוחזרות',
      order: 3,
    },
    {
      slug: 'foam-trays',
      nameEn: 'Foam Trays',
      nameHe: 'מגשי קצף',
      descriptionEn: 'Food-grade foam trays',
      descriptionHe: 'מגשי קצף למזון',
      order: 4,
    },
  ];

  const createdCategories = [];
  for (const category of categories) {
    const created = await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category,
    });
    createdCategories.push(created);
    console.log(`✅ Created category: ${category.nameEn}`);
  }

  // Create products
  const products = [
    {
      slug: 'plastic-bags-clear-20x30',
      sku: 'PB-20x30-CLEAR',
      nameEn: 'Clear Plastic Bags 20x30cm',
      nameHe: 'שקיות פלסטיק שקופות 20x30 ס"מ',
      descriptionEn: 'Food-grade clear plastic bags perfect for packaging fresh produce, meat, and other food items. Made from high-quality polyethylene.',
      descriptionHe: 'שקיות פלסטיק שקופות למזון, מושלמות לאריזת פירות וירקות טריים, בשר ומוצרי מזון אחרים. עשויות מפוליאתילן איכותי.',
      shortDescriptionEn: 'Food-grade clear plastic bags',
      shortDescriptionHe: 'שקיות פלסטיק שקופות למזון',
      categorySlug: 'plastic-bags',
      price: 45.50,
      stock: 1000,
      minOrderQuantity: 100,
      packMultiple: 100,
      material: 'Plastic',
      thickness: 20,
      sizeLength: 30,
      sizeWidth: 20,
      foodGrade: true,
      isActive: true,
      isFeatured: true,
    },
    {
      slug: 'nylon-rolls-50cm',
      sku: 'NR-50CM',
      nameEn: 'Nylon Rolls 50cm Width',
      nameHe: 'גלילי ניילון רוחב 50 ס"מ',
      descriptionEn: 'Heavy-duty nylon rolls for packaging. Perfect for wrapping and protecting products.',
      descriptionHe: 'גלילי ניילון עמידים לאריזה. מושלמים לעטיפה והגנה על מוצרים.',
      shortDescriptionEn: 'Heavy-duty nylon rolls',
      shortDescriptionHe: 'גלילי ניילון עמידים',
      categorySlug: 'nylon-rolls',
      price: 120.00,
      stock: 500,
      minOrderQuantity: 10,
      packMultiple: 10,
      material: 'Nylon',
      thickness: 30,
      foodGrade: true,
      isActive: true,
      isFeatured: true,
    },
    {
      slug: 'carton-boxes-small',
      sku: 'CB-SMALL',
      nameEn: 'Small Carton Boxes',
      nameHe: 'קופסאות קרטון קטנות',
      descriptionEn: 'Recyclable carton boxes. Eco-friendly packaging solution.',
      descriptionHe: 'קופסאות קרטון ממוחזרות. פתרון אריזה ידידותי לסביבה.',
      shortDescriptionEn: 'Recyclable carton boxes',
      shortDescriptionHe: 'קופסאות קרטון ממוחזרות',
      categorySlug: 'carton-boxes',
      price: 8.50,
      stock: 2000,
      minOrderQuantity: 50,
      packMultiple: 50,
      material: 'Carton',
      foodGrade: false,
      isActive: true,
      isFeatured: false,
    },
    {
      slug: 'foam-trays-standard',
      sku: 'FT-STD',
      nameEn: 'Standard Foam Trays',
      nameHe: 'מגשי קצף סטנדרטיים',
      descriptionEn: 'Food-grade foam trays for meat and produce packaging.',
      descriptionHe: 'מגשי קצף למזון לאריזת בשר ופירות.',
      shortDescriptionEn: 'Food-grade foam trays',
      shortDescriptionHe: 'מגשי קצף למזון',
      categorySlug: 'foam-trays',
      price: 15.75,
      stock: 800,
      minOrderQuantity: 20,
      packMultiple: 20,
      material: 'Foam',
      foodGrade: true,
      isActive: true,
      isFeatured: true,
    },
  ];

  for (const product of products) {
    const category = createdCategories.find((c) => c.slug === product.categorySlug);
    if (!category) continue;

    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: {
        slug: product.slug,
        sku: product.sku,
        nameEn: product.nameEn,
        nameHe: product.nameHe,
        descriptionEn: product.descriptionEn,
        descriptionHe: product.descriptionHe,
        shortDescriptionEn: product.shortDescriptionEn,
        shortDescriptionHe: product.shortDescriptionHe,
        categoryId: category.id,
        price: product.price,
        stock: product.stock,
        minOrderQuantity: product.minOrderQuantity,
        packMultiple: product.packMultiple,
        material: product.material,
        thickness: product.thickness,
        sizeLength: product.sizeLength,
        sizeWidth: product.sizeWidth,
        foodGrade: product.foodGrade,
        isActive: product.isActive,
        isFeatured: product.isFeatured,
      },
    });
    console.log(`✅ Created product: ${product.nameEn}`);
  }

  // Create sample company and admin user
  const hashedPassword = await hash('admin123', 10);

  const company = await prisma.company.upsert({
    where: { id: 'sample-company-id' },
    update: {},
    create: {
      id: 'sample-company-id',
      name: 'Sample Company Ltd.',
      nameEn: 'Sample Company Ltd.',
      businessId: '123456789',
      vatNumber: 'IL123456789',
      address: '123 Main St',
      city: 'Tel Aviv',
      postalCode: '12345',
      phone: '+972-50-1234567',
      email: 'info@sample.com',
      tier: 'wholesale_a',
    },
  });

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@typackaging.com' },
    update: {},
    create: {
      email: 'admin@typackaging.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'OWNER',
      companyId: company.id,
      language: 'he',
    },
  });

  console.log(`✅ Created admin user: ${adminUser.email} (password: admin123)`);
  console.log(`✅ Created company: ${company.name}`);

  console.log('🎉 Database seed completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

