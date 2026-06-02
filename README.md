# ShopHub — Full-Stack E-Commerce

A production-ready e-commerce web application built with React, Node.js, Express, PostgreSQL and Stripe.

**Live Demo:** [shophub-snowy.vercel.app](https://shophub-snowy.vercel.app)  
**API:** [shophub-production-69b2.up.railway.app](https://shophub-production-69b2.up.railway.app)

---

## Features

- **Product Catalog** — Browse, search and filter products by category
- **Product Detail Pages** — Full product info with stock status
- **Shopping Cart** — Persistent cart with quantity management (Zustand + localStorage)
- **Stripe Checkout** — Secure payment processing with test mode support
- **Authentication** — JWT-based register/login with protected routes
- **Order Management** — Order history and status tracking
- **Admin Dashboard** — Full CRUD for products + order management with status updates
- **Responsive UI** — Clean, mobile-friendly design built with Tailwind CSS

---

## Tech Stack

### Frontend
| Tech | Purpose |
|---|---|
| React 18 + Vite | UI framework |
| Tailwind CSS v4 | Styling |
| Zustand | Cart & auth state management |
| React Router v6 | Client-side routing |
| Axios | HTTP client |
| Lucide React | Icons |

### Backend
| Tech | Purpose |
|---|---|
| Node.js + Express | REST API server |
| PostgreSQL | Database |
| JWT | Authentication |
| bcryptjs | Password hashing |
| Stripe | Payment processing |

---

## Project Structure

```
shophub/
├── client/               # React frontend (Vite)
│   ├── src/
│   │   ├── components/   # Navbar, Footer, ProductCard, Logo
│   │   ├── pages/        # Home, Cart, Login, Admin, Help, Contact...
│   │   ├── store/        # Zustand stores (cart, auth)
│   │   └── lib/          # Axios instance
│   └── public/           # Static assets
│
└── server/               # Node.js backend
    └── src/
        ├── routes/       # auth, products, orders
        ├── models/       # DB schema initialization
        ├── middleware/   # JWT auth guard
        └── config/       # Database connection
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL
- Stripe account (test mode)

### 1. Clone the repo

```bash
git clone https://github.com/julesclaurece/shophub.git
cd shophub
```

### 2. Setup the backend

```bash
cd server
npm install
cp .env.example .env
```

Fill in your `.env`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/ecommerce
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
CLIENT_URL=http://localhost:5173
PORT=5000
```

```bash
npm run dev
```

The server starts on `http://localhost:5000` and auto-creates all database tables on first run.

### 3. Setup the frontend

```bash
cd client
npm install
cp .env.example .env
```

Fill in your `.env`:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
VITE_API_URL=http://localhost:5000
```

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`.

### 4. Stripe webhook (local testing)

```bash
stripe listen --api-key sk_test_... --forward-to http://localhost:5000/api/orders/webhook
```

Copy the `whsec_...` secret into your server `.env`.

---

## Test Credentials

**Admin account:** `admin@shophub.com` / `admin123`

**Stripe test card:** `4242 4242 4242 4242` — any future date, any CVC

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | — | Create account |
| POST | `/api/auth/login` | — | Login |
| GET | `/api/products` | — | List products (search, filter, paginate) |
| GET | `/api/products/:id` | — | Get product |
| POST | `/api/products` | Admin | Create product |
| PUT | `/api/products/:id` | Admin | Update product |
| DELETE | `/api/products/:id` | Admin | Delete product |
| POST | `/api/orders/checkout` | User | Create Stripe session |
| GET | `/api/orders/my` | User | My orders |
| GET | `/api/orders/all` | Admin | All orders |
| PATCH | `/api/orders/:id/status` | Admin | Update order status |

---

## Deployment

- **Backend** → [Railway](https://railway.app) — add PostgreSQL plugin + env vars
- **Frontend** → [Vercel](https://vercel.com) — set `VITE_STRIPE_PUBLISHABLE_KEY` + `VITE_API_URL`

---

## License

MIT
