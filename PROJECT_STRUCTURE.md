# 📁 Dharika Project Structure Guide

This document outlines the recommended project structure for the Dharika e-commerce platform.

## 🏗️ Recommended Directory Structure

```
Dharika/
├── 📁 frontend/                 # Frontend application
│   ├── 📁 src/
│   │   ├── 📁 components/       # Reusable UI components
│   │   ├── 📁 pages/           # Page components (Next.js) or views (Vue.js)
│   │   ├── 📁 hooks/           # Custom React hooks
│   │   ├── 📁 utils/           # Utility functions
│   │   ├── 📁 styles/          # Global styles and themes
│   │   ├── 📁 types/           # TypeScript type definitions
│   │   └── 📁 lib/             # Configuration and setup files
│   ├── 📁 public/              # Static assets
│   ├── package.json
│   ├── tailwind.config.js      # Tailwind CSS configuration
│   ├── tsconfig.json           # TypeScript configuration
│   └── next.config.js          # Next.js configuration (if using Next.js)
│
├── 📁 backend/                  # Backend API server
│   ├── 📁 src/
│   │   ├── 📁 controllers/     # Route handlers
│   │   ├── 📁 models/          # Database models
│   │   ├── 📁 routes/          # API route definitions
│   │   ├── 📁 middleware/      # Custom middleware
│   │   ├── 📁 services/        # Business logic
│   │   ├── 📁 utils/           # Utility functions
│   │   ├── 📁 config/          # Configuration files
│   │   └── app.js              # Main application file
│   ├── package.json
│   ├── .env.example            # Environment variables template
│   └── server.js               # Server entry point
│
├── 📁 docs/                     # Additional documentation
├── 📁 tests/                    # Test files (if not co-located)
├── 📁 scripts/                  # Build and deployment scripts
├── .github/                     # GitHub Actions and templates (✅ Already configured)
├── .gitignore                   # Git ignore rules (✅ Already configured)
├── README.md                    # Project overview (✅ Already configured)
├── SETUP.md                     # Setup instructions (✅ Already configured)
├── CONTRIBUTING.md              # Contribution guidelines (✅ Already configured)
└── environment-variables.md     # Environment setup (✅ Already configured)
```

## 🎯 Frontend Structure Details

### React/Next.js Frontend
```
frontend/
├── src/
│   ├── components/
│   │   ├── common/             # Shared components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── Button.tsx
│   │   ├── product/            # Product-related components
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   └── ProductDetail.tsx
│   │   ├── cart/               # Shopping cart components
│   │   └── auth/               # Authentication components
│   ├── pages/                  # Next.js pages or React Router pages
│   │   ├── index.tsx           # Homepage
│   │   ├── products/
│   │   ├── cart/
│   │   └── auth/
│   ├── hooks/                  # Custom React hooks
│   │   ├── useCart.ts
│   │   ├── useAuth.ts
│   │   └── useProducts.ts
│   ├── lib/                    # Libraries and configurations
│   │   ├── api.ts              # API client configuration
│   │   ├── auth.ts             # Authentication setup
│   │   └── utils.ts            # Utility functions
│   └── styles/
│       ├── globals.css         # Global styles
│       └── components.css      # Component-specific styles
```

### Vue.js Frontend
```
frontend/
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── product/
│   │   ├── cart/
│   │   └── auth/
│   ├── views/                  # Vue.js page views
│   │   ├── Home.vue
│   │   ├── Products.vue
│   │   └── Cart.vue
│   ├── router/                 # Vue Router configuration
│   ├── store/                  # Vuex/Pinia store
│   ├── composables/            # Vue 3 composition API composables
│   └── assets/                 # Static assets
```

## 🔧 Backend Structure Details

### Node.js/Express Backend
```
backend/
├── src/
│   ├── controllers/
│   │   ├── authController.js   # Authentication logic
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   └── orderController.js
│   ├── models/
│   │   ├── User.js             # User model
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── auth.js             # Authentication routes
│   │   ├── products.js
│   │   ├── cart.js
│   │   └── orders.js
│   ├── middleware/
│   │   ├── auth.js             # Authentication middleware
│   │   ├── validation.js       # Input validation
│   │   └── errorHandler.js     # Error handling
│   ├── services/
│   │   ├── emailService.js     # Email functionality
│   │   ├── paymentService.js   # Payment processing
│   │   └── recommendationService.js  # AI recommendations
│   ├── config/
│   │   ├── database.js         # Database configuration
│   │   ├── cloudinary.js       # File upload configuration
│   │   └── razorpay.js         # Payment gateway setup
│   └── utils/
│       ├── logger.js           # Logging utility
│       └── helpers.js          # Helper functions
```

### Python/FastAPI Backend
```
backend/
├── app/
│   ├── api/
│   │   ├── endpoints/          # API route definitions
│   │   └── dependencies.py     # Dependency injection
│   ├── core/
│   │   ├── config.py           # Configuration settings
│   │   ├── security.py         # Security utilities
│   │   └── database.py         # Database setup
│   ├── models/                 # SQLAlchemy models
│   ├── schemas/                # Pydantic schemas
│   ├── services/               # Business logic
│   └── utils/                  # Utility functions
├── tests/                      # Test files
├── requirements.txt            # Python dependencies
└── main.py                     # FastAPI application entry
```

## 📋 File Naming Conventions

### Frontend (React/TypeScript)
- **Components**: PascalCase (e.g., `ProductCard.tsx`)
- **Hooks**: camelCase starting with "use" (e.g., `useCart.ts`)
- **Utilities**: camelCase (e.g., `formatPrice.ts`)
- **Pages**: PascalCase (e.g., `ProductDetail.tsx`)

### Backend (Node.js)
- **Controllers**: camelCase ending with "Controller" (e.g., `productController.js`)
- **Models**: PascalCase (e.g., `Product.js`)
- **Routes**: camelCase (e.g., `products.js`)
- **Services**: camelCase ending with "Service" (e.g., `emailService.js`)

### Backend (Python)
- **Files**: snake_case (e.g., `product_controller.py`)
- **Classes**: PascalCase (e.g., `ProductService`)
- **Functions**: snake_case (e.g., `get_products`)

## 🚀 Getting Started

1. **Choose your tech stack** from the options in the main README
2. **Create the directory structure** based on your choice
3. **Follow the SETUP.md guide** for detailed installation instructions
4. **Start with the CI/CD pipeline** - it will automatically detect your structure

## 📝 Important Notes

- The **CI/CD pipeline automatically detects** your project structure
- Supported directory names:
  - Frontend: `frontend/`, `client/`, `web/`
  - Backend: `backend/`, `server/`, `api/`
- The pipeline works with both **Node.js and Python** backends
- **Environment variables** are configured automatically based on your structure

## 🔄 Next Steps

1. Create your chosen directory structure
2. Initialize your frontend and backend projects
3. Configure environment variables
4. Start developing - the CI/CD pipeline will handle the rest!

---
