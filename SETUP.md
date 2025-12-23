# Setup Guide - T.Y Packaging Platform

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Database Setup

1. Create a PostgreSQL database
2. Copy `.env.example` to `.env`
3. Add your `DATABASE_URL`:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/ty_packaging?schema=public"
   ```

4. Initialize the database:
   ```bash
   npx prisma generate
   npx prisma db push
   ```

### 3. Environment Variables

Create a `.env` file with:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/ty_packaging?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-random-secret-here"

# Stripe (optional for now)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."

# Storage (optional - for product images)
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
DEFAULT_VAT_RATE=17
```

Generate `NEXTAUTH_SECRET`:
```bash
openssl rand -base64 32
```

### 4. Run Development Server

```bash
npm run dev
```

Visit:
- Hebrew: http://localhost:3000/he
- English: http://localhost:3000/en

## Testing Language Switching

1. Navigate to `/he/products` (Hebrew)
2. Click the language switcher button (EN | עברית)
3. Verify:
   - ✅ All text changes language
   - ✅ Layout switches RTL ↔ LTR
   - ✅ URL updates (`/he/products` ↔ `/en/products`)
   - ✅ Font changes (Assistant for Hebrew, Inter for English)

## Project Structure

```
├── src/
│   ├── app/
│   │   └── [locale]/              # Localized routes
│   │       ├── layout.tsx         # Root layout with RTL/LTR
│   │       ├── page.tsx           # Home page
│   │       ├── products/          # Product catalog
│   │       └── p/[slug]/          # Product detail pages
│   ├── components/
│   │   ├── layout/                # Navbar, LanguageSwitcher
│   │   ├── products/              # ProductGrid, ProductCard, ProductFilters
│   │   └── ui/                    # shadcn/ui components
│   ├── i18n/                      # next-intl configuration
│   └── lib/                       # Utilities (prisma client, etc.)
├── messages/                      # Translation files
│   ├── en.json                    # English translations
│   └── he.json                    # Hebrew translations
└── prisma/
    └── schema.prisma              # Database schema
```

## Key Features Implemented

✅ **Bilingual Support**
- Hebrew and English translations
- Language switcher in navbar
- URL-based routing (`/he/*` and `/en/*`)

✅ **RTL/LTR Layout**
- Automatic direction switching
- Hebrew-friendly fonts (Assistant)
- RTL-aware spacing and alignment

✅ **Product Catalog**
- Bilingual product display
- Product filters (categories, materials)
- Product detail pages
- Mock data structure ready for database

✅ **Database Schema**
- Bilingual product model
- B2B company accounts
- Order management
- Pricing tiers
- VAT support

## Next Steps (Phase 2)

### Authentication
- [ ] Set up NextAuth with credentials provider
- [ ] Company registration flow
- [ ] User roles (Owner, Admin, Buyer)
- [ ] Protected routes

### Cart & Checkout
- [ ] Shopping cart functionality
- [ ] Checkout flow
- [ ] VAT calculation (17%)
- [ ] Payment integration (Stripe + Invoice)
- [ ] Order confirmation

### Admin Panel
- [ ] Product management (CRUD)
- [ ] Bilingual product editing
- [ ] Order management
- [ ] Customer management
- [ ] Pricing tier management

### Additional Features
- [ ] Product search (Hebrew + English)
- [ ] Advanced filters
- [ ] Image upload (Supabase/S3)
- [ ] Email notifications
- [ ] Invoice generation
- [ ] Shipping zones
- [ ] Quantity breaks
- [ ] Coupon system

## Database Seeding (Optional)

Create a seed script to populate initial data:

```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create categories
  const category = await prisma.category.create({
    data: {
      slug: 'plastic-bags',
      nameEn: 'Plastic Bags',
      nameHe: 'שקיות פלסטיק',
    },
  });

  // Create products
  await prisma.product.create({
    data: {
      slug: 'plastic-bags-clear-20x30',
      sku: 'PB-20x30-CLEAR',
      nameEn: 'Clear Plastic Bags 20x30cm',
      nameHe: 'שקיות פלסטיק שקופות 20x30 ס"מ',
      descriptionEn: 'Food-grade clear plastic bags',
      descriptionHe: 'שקיות פלסטיק שקופות למזון',
      categoryId: category.id,
      price: 45.50,
      stock: 1000,
      minOrderQuantity: 100,
      packMultiple: 100,
      material: 'Plastic',
      thickness: 20,
      foodGrade: true,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

Add to `package.json`:
```json
"prisma": {
  "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
}
```

## Troubleshooting

### Language not switching
- Check middleware is properly configured
- Verify `messages/en.json` and `messages/he.json` exist
- Clear browser cache

### RTL layout issues
- Ensure `dir="rtl"` is set on `<html>` tag
- Use Tailwind RTL classes: `ltr:mr-2 rtl:ml-2`
- Check font loading (Assistant for Hebrew)

### Database connection errors
- Verify PostgreSQL is running
- Check `DATABASE_URL` format
- Run `npx prisma generate` after schema changes

## Production Deployment

1. **Vercel Setup**
   - Connect GitHub repository
   - Add environment variables
   - Deploy

2. **Database**
   - Use Vercel Postgres or external provider
   - Run migrations: `npx prisma migrate deploy`

3. **Environment Variables**
   - Set all production keys
   - Update `NEXTAUTH_URL` to production domain
   - Configure Stripe production keys

4. **Domain**
   - Configure custom domain in Vercel
   - Update `NEXTAUTH_URL`

## Support

For issues or questions, refer to:
- Next.js docs: https://nextjs.org/docs
- next-intl docs: https://next-intl-docs.vercel.app
- Prisma docs: https://www.prisma.io/docs

