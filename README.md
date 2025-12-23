# צ.י אריזות - B2B Ecommerce Platform

A production-ready B2B ecommerce platform for an Israeli packaging materials business, built with Next.js 14, TypeScript, and full Hebrew/English bilingual support with RTL/LTR layout switching.

## Features

- ✅ **Bilingual Support**: Hebrew and English with seamless language switching
- ✅ **RTL/LTR Layout**: Automatic layout direction switching based on language
- ✅ **Product Catalog**: Bilingual product catalog with filters and search
- ✅ **B2B Customer Accounts**: Company-based user management
- ✅ **Israeli Business Rules**: ILS currency, VAT handling (17%), Hebrew invoices
- ✅ **Modern Stack**: Next.js 14 App Router, TypeScript, TailwindCSS, Prisma, NextAuth

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + shadcn/ui
- **Internationalization**: next-intl
- **Database**: Prisma ORM + PostgreSQL
- **Authentication**: NextAuth (Auth.js)
- **Payments**: Stripe (ILS) + Invoice option
- **Fonts**: Inter (English) + Assistant (Hebrew)

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd "Online Store"
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Random secret for NextAuth
- `NEXTAUTH_URL` - Your app URL (http://localhost:3000 for dev)
- Stripe keys (if using Stripe)
- Supabase keys (if using Supabase Storage)

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

The app will automatically redirect to `/he` (Hebrew) as the default locale. You can switch languages using the language toggle button in the navbar.

## Project Structure

```
├── src/
│   ├── app/
│   │   └── [locale]/          # Localized routes
│   │       ├── layout.tsx     # Root layout with RTL/LTR support
│   │       ├── page.tsx       # Home page
│   │       └── products/      # Product catalog
│   ├── components/
│   │   ├── layout/            # Layout components (Navbar, etc.)
│   │   ├── products/          # Product components
│   │   └── ui/                # shadcn/ui components
│   ├── i18n/                  # Internationalization config
│   └── lib/                   # Utilities
├── messages/                  # Translation files
│   ├── en.json               # English translations
│   └── he.json               # Hebrew translations
└── prisma/
    └── schema.prisma         # Database schema
```

## Language Switching

The language switcher is available in the top navbar. Switching languages will:
- Change all UI text
- Update URL structure (`/he/products` ↔ `/en/products`)
- Switch layout direction (RTL ↔ LTR)
- Persist preference via cookies

## RTL Support

Hebrew pages automatically use RTL layout with:
- Right-to-left text direction
- Flipped padding/margins
- Hebrew-friendly fonts (Assistant)
- Proper icon alignment

## Database Schema

The Prisma schema includes:
- **Users**: B2B customer accounts with company association
- **Companies**: Business entities with VAT numbers
- **Products**: Bilingual product catalog with variants
- **Orders**: Order management with VAT calculation
- **Pricing Tiers**: Tiered pricing for different customer types

## Next Steps (Phase 2)

- [ ] Implement NextAuth authentication
- [ ] Build cart and checkout flow
- [ ] Add Stripe payment integration
- [ ] Create admin panel
- [ ] Implement product search (Hebrew + English)
- [ ] Add order management
- [ ] Email notifications
- [ ] Invoice generation
- [ ] Shipping zone management
- [ ] Advanced product filters

## Testing Hebrew/English Switching

1. Navigate to any page (e.g., `/he/products`)
2. Click the language switcher button (EN | עברית)
3. Verify:
   - All text changes language
   - Layout direction switches (RTL ↔ LTR)
   - URL updates correctly
   - Font changes appropriately

## Deployment

The project is ready for Vercel deployment:

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

For production, ensure:
- PostgreSQL database is set up
- Environment variables are configured
- Stripe keys are production keys
- Domain is configured in NextAuth

## License

Private - T.Y Packaging

