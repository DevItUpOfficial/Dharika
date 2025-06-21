# 🚀 Dharika E-commerce Platform - Setup Guide

This guide will help you set up the Dharika e-commerce platform locally for development.

## 📋 Table of Contents
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Environment Configuration](#environment-configuration)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Common Issues](#common-issues)

## ✅ Prerequisites

Before you begin, ensure you have the following installed:

### Required Software
- **Node.js** (v18.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v8.0.0 or higher) or **yarn** (v1.22.0 or higher)
- **Git** - [Download](https://git-scm.com/)

### Optional (depending on backend choice)
- **Python** (v3.11 or higher) - for Python backend
- **PostgreSQL** (v14 or higher) - for production database
- **MongoDB** (v6.0 or higher) - alternative database option
- **Redis** (v6.0 or higher) - for caching and sessions

### Development Tools (Recommended)
- **Visual Studio Code** with extensions:
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense
  - TypeScript Importer
  - Prettier - Code formatter
  - ESLint
- **Postman** or **Insomnia** - for API testing

## 📁 Project Structure

The project follows a monorepo structure with separate frontend and backend directories:

```
dharika/
├── frontend/                 # React/Next.js application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── utils/           # Utility functions
│   │   ├── types/           # TypeScript type definitions
│   │   └── styles/          # Global styles and Tailwind config
│   ├── public/              # Static assets
│   ├── package.json
│   └── tsconfig.json
├── backend/                  # API server
│   ├── src/
│   │   ├── routes/          # API route handlers
│   │   ├── models/          # Database models
│   │   ├── middleware/      # Express middleware
│   │   ├── services/        # Business logic
│   │   ├── utils/           # Utility functions
│   │   └── types/           # TypeScript definitions
│   ├── tests/               # Backend tests
│   ├── package.json         # Node.js dependencies
│   └── requirements.txt     # Python dependencies (if using Python)
├── .github/                 # GitHub Actions workflows
├── docs/                    # Documentation
├── .env.example             # Environment variables template
└── README.md
```

## 🚀 Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/[your-username]/dharika.git
   cd dharika
   ```

2. **Create environment files:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Install and run frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Install and run backend (in a new terminal):**
   ```bash
   cd backend
   npm install  # or pip install -r requirements.txt for Python
   npm run dev  # or python app.py for Python
   ```

5. **Open your browser:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🎨 Frontend Setup

### Technologies Used
- **React** with **TypeScript**
- **Next.js** (App Router)
- **Tailwind CSS** for styling
- **Shadcn-ui** for UI components
- **Zustand** or **Redux Toolkit** for state management

### Setup Steps

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

### Available Scripts
```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run start       # Start production server
npm run lint        # Run ESLint
npm run lint:fix    # Fix ESLint errors
npm run type-check  # Run TypeScript type checking
npm run test        # Run tests
npm run test:watch  # Run tests in watch mode
```

### Frontend Environment Variables
Create `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_RAZORPAY_KEY=rzp_test_your_key_here
NEXT_PUBLIC_ENVIRONMENT=development
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

## ⚙️ Backend Setup

### Node.js Backend

#### Technologies Used
- **Node.js** with **TypeScript**
- **Express.js** framework
- **Prisma** or **TypeORM** for database
- **JWT** for authentication
- **Razorpay** for payments

#### Setup Steps

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up database:**
   ```bash
   # If using Prisma
   npx prisma generate
   npx prisma db push
   
   # If using TypeORM
   npm run typeorm:migration:run
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

#### Available Scripts
```bash
npm run dev           # Start development server with hot reload
npm run build         # Build TypeScript to JavaScript
npm run start         # Start production server
npm run test          # Run tests
npm run test:watch    # Run tests in watch mode
npm run lint          # Run ESLint
npm run db:migrate    # Run database migrations
npm run db:seed       # Seed database with sample data
```

### Python Backend (Alternative)

#### Technologies Used
- **FastAPI** or **Django REST Framework**
- **SQLAlchemy** or **Django ORM**
- **Pydantic** for data validation
- **JWT** for authentication

#### Setup Steps

1. **Create virtual environment:**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run database migrations:**
   ```bash
   # For Django
   python manage.py migrate
   
   # For FastAPI with Alembic
   alembic upgrade head
   ```

4. **Start development server:**
   ```bash
   # For Django
   python manage.py runserver 0.0.0.0:5000
   
   # For FastAPI
   uvicorn main:app --host 0.0.0.0 --port 5000 --reload
   ```

## 🔧 Environment Configuration

### Backend Environment Variables
Create `backend/.env`:
```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dharika_db
# or for SQLite: DATABASE_URL=sqlite:./dharika.db

# JWT
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# Razorpay
RAZORPAY_KEY_ID=rzp_test_your_key_here
RAZORPAY_KEY_SECRET=your_razorpay_secret_here

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# SMS (optional)
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=+1234567890

# File Storage (optional)
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_S3_BUCKET=your-s3-bucket-name

# Environment
NODE_ENV=development
PORT=5000
CORS_ORIGIN=http://localhost:3000
```

## 🗄️ Database Setup

### PostgreSQL (Recommended for Production)

1. **Install PostgreSQL:**
   - macOS: `brew install postgresql`
   - Ubuntu: `sudo apt-get install postgresql postgresql-contrib`
   - Windows: Download from [PostgreSQL website](https://www.postgresql.org/download/)

2. **Create database:**
   ```sql
   createdb dharika_db
   ```

3. **Update DATABASE_URL in .env file**

### SQLite (Quick Development Setup)

For quick local development, you can use SQLite:
```env
DATABASE_URL=sqlite:./dharika.db
```

## 🏃 Running the Application

### Development Mode

1. **Start backend (Terminal 1):**
   ```bash
   cd backend
   npm run dev  # or python manage.py runserver for Django
   ```

2. **Start frontend (Terminal 2):**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - API Documentation: http://localhost:5000/docs (if FastAPI)

### Production Mode

1. **Build frontend:**
   ```bash
   cd frontend
   npm run build
   npm start
   ```

2. **Build and start backend:**
   ```bash
   cd backend
   npm run build
   npm start
   ```

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm run test              # Run all tests
npm run test:watch        # Run tests in watch mode
npm run test:coverage     # Run tests with coverage
npm run test:e2e          # Run E2E tests with Playwright
```

### Backend Testing
```bash
cd backend
npm run test              # Run all tests
npm run test:watch        # Run tests in watch mode
npm run test:integration  # Run integration tests
```

### Full Stack Testing
```bash
# Run both frontend and backend tests
npm run test:all
```

## 🎮 Runner Game Development

The gamification feature includes a custom runner game. To work on it:

1. **Game assets location:** `frontend/public/game/`
2. **Game component:** `frontend/src/components/Game/`
3. **Game state management:** `frontend/src/store/gameStore.ts`

## 📱 Mobile Development Testing

1. **Test responsive design:**
   ```bash
   # Frontend with network access
   cd frontend
   npm run dev -- --host 0.0.0.0
   ```

2. **Access from mobile device:**
   - Find your IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
   - Open `http://[YOUR_IP]:3000` on mobile

## 🔧 Common Issues

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000

# Kill process on port 5000
npx kill-port 5000
```

### Database Connection Issues
```bash
# Check PostgreSQL status
pg_ctl status

# Restart PostgreSQL
brew services restart postgresql  # macOS
sudo service postgresql restart   # Ubuntu
```

### Node Version Issues
```bash
# Use Node Version Manager
nvm install 18
nvm use 18
```

### TypeScript Errors
```bash
# Clear TypeScript cache
cd frontend
rm -rf node_modules package-lock.json
npm install

# Rebuild TypeScript
npm run build
```

### Dependency Issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 🔄 Git Workflow

1. **Clone and setup:**
   ```bash
   git clone [repo-url]
   git checkout development
   ```

2. **Create feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make changes and commit:**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

4. **Push and create PR:**
   ```bash
   git push origin feature/your-feature-name
   # Create PR on GitHub targeting 'development' branch
   ```

## 🚀 Deployment

See [CONTRIBUTING.md](./CONTRIBUTING.md) for deployment procedures and CI/CD pipeline information.

## 📞 Support

If you encounter any issues:

1. Check this SETUP.md file
2. Look through existing [GitHub Issues](https://github.com/[your-username]/dharika/issues)
3. Create a new issue with the bug report template
4. Contact the team on Slack (if available)

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Razorpay Documentation](https://razorpay.com/docs/)

---

**Happy coding! 🎉** 