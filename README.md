# MerchMarket — Restaurant Merchandise Marketplace

A multi-restaurant merchandise marketplace where customers can browse and buy merch from multiple restaurants in one place. Each restaurant has a fully custom branded storefront, and restaurant owners have a private sales dashboard.

## Tech Stack

- **Next.js 16** (App Router) + TypeScript + Tailwind CSS
- **Prisma 7** with SQLite (`better-sqlite3` adapter) — swap to Postgres by swapping the adapter
- **NextAuth.js v4** — credentials-based auth for restaurant owners
- **Stripe** — test-mode checkout integration
- **Recharts** — revenue bar charts in the dashboard

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Edit `.env.local` and fill in your Stripe keys:

```
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-min-32-chars"
NEXTAUTH_URL="http://localhost:3000"
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

### 3. Run the database migration

```bash
npm run db:migrate
```

### 4. Seed the database

```bash
npm run db:seed
```

This creates 5 restaurants, each with 6-8 products and sample orders.

### 5. Start the dev server

```bash
npm run dev
```

Visit http://localhost:3000

---

## Seed Credentials

| Restaurant        | Email                         | Password    |
|-------------------|------------------------------|-------------|
| Smoke & Ember BBQ | owner@smoke-ember-bbq.com    | password123 |
| Sakura Sushi      | owner@sakura-sushi.com       | password123 |
| Pastel Cakery     | owner@pastel-cakery.com      | password123 |
| Rustic Pie Co.    | owner@rustic-pie-co.com      | password123 |
| Block Burger Co.  | owner@block-burger-co.com    | password123 |

Log in at http://localhost:3000/dashboard/login

---

## Pages

| Path | Description |
|------|-------------|
| `/` | Marketplace homepage with all restaurants |
| `/shop/[slug]` | Individual branded storefront |
| `/shop/[slug]/products/[id]` | Product detail page |
| `/cart` | Cart page |
| `/checkout` | Stripe checkout redirect |
| `/order-confirmation/[id]` | Post-purchase confirmation |
| `/dashboard` | Owner overview: revenue, charts, top products |
| `/dashboard/orders` | Full orders table |
| `/dashboard/products` | Add, edit, delete products |
| `/dashboard/settings` | Edit branding, colors, fonts |
| `/dashboard/login` | Owner login |

---

## Adding a New Restaurant

1. Open Prisma Studio: `npm run db:studio`
2. Add a row to the `Restaurant` table with these required fields:
   - `name`, `slug` (URL-safe, e.g. `my-new-spot`)
   - `ownerEmail`, `ownerPasswordHash` (bcrypt hash of password)
   - `primaryColor`, `secondaryColor`, `accentColor` (hex values)
   - `fontFamily` (e.g. `Inter`, `Oswald`, `Playfair Display`)
3. Or add the restaurant to `prisma/seed.ts` and re-run `npm run db:seed`

---

## Stripe Test Mode

Use test card `4242 4242 4242 4242` with any future expiry and any CVC.

---

## Swapping SQLite to Postgres

1. Install `@prisma/adapter-pg` and `pg`
2. Update `lib/prisma.ts` to use the `PrismaPg` adapter
3. Update `prisma.config.ts` datasource URL to your Postgres connection string
4. Run `npx prisma migrate dev`
