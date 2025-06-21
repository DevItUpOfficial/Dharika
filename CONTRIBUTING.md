# 🤝 Contributing to Dharika E-commerce Platform

Thank you for your interest in contributing to Dharika! This document provides guidelines and information for contributors.

## 📋 Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Branching Strategy](#branching-strategy)
- [CI/CD Pipeline](#cicd-pipeline)
- [Code Standards](#code-standards)
- [Testing Guidelines](#testing-guidelines)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [Deployment Process](#deployment-process)
- [Issue Reporting](#issue-reporting)

## 📜 Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:

- **Be respectful** and inclusive in all interactions
- **Be constructive** in feedback and discussions
- **Be patient** with new contributors
- **Focus on the project goals** and user needs
- **Report unacceptable behavior** to the project maintainers

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/dharika.git
   cd dharika
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/dharika.git
   ```
4. **Follow the setup guide**: See [SETUP.md](./SETUP.md) for detailed setup instructions

## 🔄 Development Workflow

### Branching Strategy

We use **Git Flow** with the following branch structure:

#### Main Branches
- **`main`** - Production-ready code (protected)
- **`development`** - Integration branch for features (protected)

#### Supporting Branches
- **`feature/*`** - New features (e.g., `feature/user-authentication`)
- **`fix/*`** - Bug fixes (e.g., `fix/cart-calculation-error`)
- **`hotfix/*`** - Critical production fixes (e.g., `hotfix/payment-gateway-down`)
- **`release/*`** - Release preparation (e.g., `release/v1.2.0`)

### Branch Protection Rules

#### Main Branch
- ❌ No direct commits allowed
- ✅ Requires pull request reviews (minimum 2 approvers)
- ✅ Requires status checks to pass (CI pipeline)
- ✅ Requires up-to-date branches before merging
- ✅ Requires linear history

#### Development Branch
- ❌ No direct commits allowed
- ✅ Requires pull request reviews (minimum 1 approver)
- ✅ Requires status checks to pass (CI pipeline)
- ✅ Allows squash merging

### Workflow Steps

1. **Create feature branch**:
   ```bash
   git checkout development
   git pull upstream development
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following our code standards

3. **Test your changes** locally:
   ```bash
   # Frontend tests
   cd frontend && npm test
   
   # Backend tests
   cd backend && npm test
   
   # E2E tests
   npm run test:e2e
   ```

4. **Commit your changes** using conventional commits

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create Pull Request** targeting `development` branch

## 🚀 CI/CD Pipeline

Our automated CI/CD pipeline ensures code quality and smooth deployments.

### Continuous Integration (CI)

**Triggers:** Push to `main`, `development`, or Pull Requests

**Pipeline Steps:**
1. **🔍 Code Detection**
   - Automatically detects frontend/backend changes
   - Supports multiple directory structures (`frontend/`, `client/`, `web/`, `backend/`, `server/`, `api/`)

2. **🎨 Frontend Checks** (if frontend code exists)
   - Node.js setup (v18)
   - Dependency installation (npm/yarn/pnpm)
   - ESLint code linting
   - Prettier formatting check
   - TypeScript type checking
   - Unit and integration tests
   - Production build verification

3. **⚙️ Backend Checks** (if backend code exists)
   - Multi-language support (Node.js/Python)
   - Dependency installation
   - Code linting (ESLint/Flake8/Black)
   - Unit and integration tests
   - Database migration tests

4. **🔒 Security Scanning**
   - npm audit for Node.js vulnerabilities
   - Safety check for Python dependencies
   - Environment variable validation

**CI Requirements:**
- ✅ All linting checks must pass
- ✅ All tests must pass
- ✅ Build must complete successfully
- ✅ No high-severity security vulnerabilities

### Continuous Deployment (CD)

**Triggers:** Successful merge to `main` (production) or `development` (staging)

**Deployment Targets:**

#### Production (`main` branch)
- **Frontend**: Netlify/Vercel/FTP (Hostinger)
- **Backend**: Heroku/Railway/VPS
- **Environment**: Production secrets and configurations

#### Staging (`development` branch)
- **Frontend**: Staging environment
- **Backend**: Staging server
- **Environment**: Staging secrets and configurations

**Supported Deployment Options:**
- 🌐 **Netlify** - Automatic frontend deployment
- ▲ **Vercel** - Serverless frontend deployment
- 🔗 **FTP/Hostinger** - Traditional web hosting
- 🚂 **Railway** - Modern backend hosting
- 🟣 **Heroku** - Platform-as-a-Service
- 🖥️ **VPS/DigitalOcean** - Custom server deployment

### Environment Variables Setup

#### Required GitHub Secrets

**Frontend Deployment:**
```bash
# Netlify
NETLIFY_AUTH_TOKEN
NETLIFY_SITE_ID (production)
NETLIFY_STAGING_SITE_ID (staging)

# Vercel
VERCEL_TOKEN
VERCEL_ORG_ID
VERCEL_PROJECT_ID

# FTP/Hostinger
FTP_HOST
FTP_USERNAME
FTP_PASSWORD
FTP_PROD_DIR
FTP_STAGING_DIR
```

**Backend Deployment:**
```bash
# Heroku
HEROKU_API_KEY
HEROKU_EMAIL
HEROKU_PROD_APP
HEROKU_STAGING_APP

# Railway
RAILWAY_TOKEN
RAILWAY_PROD_SERVICE
RAILWAY_STAGING_SERVICE

# VPS
VPS_HOST
VPS_USERNAME
VPS_SSH_KEY
VPS_PROD_PATH
VPS_STAGING_PATH
```

**Application Secrets:**
```bash
# Razorpay
RAZORPAY_PROD_KEY
RAZORPAY_PROD_SECRET
RAZORPAY_TEST_KEY
RAZORPAY_TEST_SECRET

# Database
PROD_DATABASE_URL
STAGING_DATABASE_URL

# API URLs
PROD_API_URL
STAGING_API_URL

# Notifications
SLACK_WEBHOOK_URL
NOTIFICATION_EMAIL
SMTP_SERVER
SMTP_USERNAME
SMTP_PASSWORD
```

## 📝 Code Standards

### Frontend Standards

#### TypeScript
- Use strict TypeScript configuration
- Define proper interfaces and types
- Avoid `any` type unless absolutely necessary
- Use proper generic constraints

#### React/Next.js
- Use functional components with hooks
- Implement proper error boundaries
- Use React.memo for performance optimization
- Follow Next.js app router conventions

#### Styling
- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Use Shadcn-ui components when possible
- Maintain consistent color palette

#### File Structure
```
src/
├── components/
│   ├── ui/              # Shadcn-ui components
│   ├── forms/           # Form components
│   └── layout/          # Layout components
├── pages/               # Next.js pages
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
├── types/               # TypeScript definitions
├── store/               # State management
└── styles/              # Global styles
```

### Backend Standards

#### Node.js/Express
- Use TypeScript for all new code
- Implement proper error handling middleware
- Use async/await for asynchronous operations
- Follow RESTful API conventions
- Implement proper input validation

#### Database
- Use Prisma ORM for type safety
- Write reversible migrations
- Implement proper indexing
- Use transactions for complex operations

#### API Structure
```
src/
├── routes/              # API route handlers
├── controllers/         # Business logic
├── models/              # Database models
├── middleware/          # Express middleware
├── services/            # External service integrations
├── utils/               # Utility functions
└── types/               # TypeScript definitions
```

### Code Quality Tools

#### ESLint Configuration
```json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "prefer-const": "error",
    "no-var": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

#### Prettier Configuration
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

## 🧪 Testing Guidelines

### Testing Requirements
- **Unit Tests**: Minimum 80% code coverage
- **Integration Tests**: Critical user flows
- **E2E Tests**: Key business scenarios
- **Mobile Testing**: Responsive design verification

### Frontend Testing

#### Unit Tests (Jest + React Testing Library)
```bash
cd frontend
npm run test              # Run all tests
npm run test:coverage     # Generate coverage report
npm run test:watch        # Watch mode for development
```

#### E2E Tests (Playwright)
```bash
npm run test:e2e          # Run E2E tests
npm run test:e2e:ui       # Run with UI mode
```

### Backend Testing

#### Unit Tests
```bash
cd backend
npm run test              # Run all tests
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report
```

#### Integration Tests
```bash
npm run test:integration  # Database and API tests
```

### Test Structure
```
tests/
├── unit/                # Unit tests
├── integration/         # Integration tests
├── e2e/                 # End-to-end tests
├── fixtures/            # Test data
└── utils/               # Test utilities
```

## 📋 Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Format
```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types
- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks
- **perf**: Performance improvements
- **ci**: CI/CD changes

### Examples
```bash
feat(auth): add user registration functionality

fix(cart): resolve total calculation error when applying discounts

docs(api): update Razorpay integration documentation

test(frontend): add unit tests for product listing component

chore(deps): update dependencies to latest versions
```

### Scope Examples
- `auth` - Authentication/authorization
- `cart` - Shopping cart functionality
- `payment` - Payment processing
- `game` - Runner game features
- `api` - Backend API
- `ui` - User interface components
- `db` - Database related

## 🔄 Pull Request Process

### Before Creating a PR

1. **Sync with upstream**:
   ```bash
   git checkout development
   git pull upstream development
   git checkout your-feature-branch
   git merge development
   ```

2. **Run full test suite**:
   ```bash
   npm run test:all
   ```

3. **Build locally**:
   ```bash
   npm run build
   ```

### PR Requirements

#### PR Title
Follow conventional commit format:
```
feat(scope): add feature description
```

#### PR Description
Use the provided PR template including:
- Clear description of changes
- Type of change (feature/fix/etc.)
- Component impact (frontend/backend)
- Testing completed
- Screenshots (if UI changes)
- Security considerations
- Performance impact

#### Review Process

1. **Automated Checks**:
   - ✅ CI pipeline must pass
   - ✅ All tests must pass
   - ✅ Code coverage maintained
   - ✅ Security scans pass

2. **Code Review**:
   - 👥 Minimum 1 reviewer for `development`
   - 👥 Minimum 2 reviewers for `main`
   - 🔍 Focus on code quality, performance, security
   - 📝 Constructive feedback and suggestions

3. **Merge Requirements**:
   - ✅ All conversations resolved
   - ✅ CI checks passing
   - ✅ Up-to-date with target branch
   - ✅ Required approvals obtained

### Post-Merge

1. **Delete feature branch**:
   ```bash
   git branch -d feature/your-feature-name
   git push origin --delete feature/your-feature-name
   ```

2. **Monitor deployment** in respective environments

## 🚀 Deployment Process

### Automatic Deployments

- **Staging**: Automatic deployment on merge to `development`
- **Production**: Automatic deployment on merge to `main`

### Manual Deployment (if needed)

1. **Trigger manually** through GitHub Actions
2. **Monitor deployment** logs
3. **Verify functionality** in deployed environment
4. **Rollback if issues** detected

### Deployment Verification

#### Frontend Checklist
- [ ] Application loads successfully
- [ ] All pages render correctly
- [ ] Mobile responsiveness works
- [ ] API connections established
- [ ] Payment integration functional

#### Backend Checklist
- [ ] API endpoints respond correctly
- [ ] Database connections active
- [ ] Authentication working
- [ ] Payment processing functional
- [ ] External integrations active

### Rollback Procedure

If issues are detected post-deployment:

1. **Immediate action**: Revert last commit on `main`
2. **Create hotfix branch** for critical fixes
3. **Test fix thoroughly** before re-deployment
4. **Document incident** and prevention measures

## 🐛 Issue Reporting

### Before Creating an Issue

1. **Search existing issues** to avoid duplicates
2. **Check documentation** for known solutions
3. **Test on latest version** if possible

### Issue Templates

Use appropriate templates:
- 🐛 **Bug Report** - For bugs and errors
- ✨ **Feature Request** - For new functionality
- 📝 **Documentation** - For documentation improvements

### Issue Labels

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements or additions to docs
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention is needed
- `priority: high` - High priority issues
- `priority: low` - Low priority issues

## 🎯 Development Best Practices

### Performance
- Optimize images and assets
- Implement lazy loading
- Use proper caching strategies
- Monitor bundle sizes
- Profile and optimize database queries

### Security
- Validate all user inputs
- Use environment variables for secrets
- Implement proper authentication
- Regular security audits
- Keep dependencies updated

### Accessibility
- Follow WCAG 2.1 guidelines
- Test with screen readers
- Ensure keyboard navigation
- Maintain proper color contrast
- Provide alt text for images

### Mobile-First
- Design for mobile devices first
- Test on various screen sizes
- Optimize for touch interactions
- Consider network constraints
- Implement proper offline handling

## 📞 Getting Help

If you need help:

1. **Check documentation** - [SETUP.md](./SETUP.md) and this guide
2. **Search issues** - Look for similar problems
3. **Ask questions** - Create a new issue with question label
4. **Contact maintainers** - Reach out to @saiyam0211 (Admin/Lead Developer) if needed

## 🙏 Recognition

Contributors will be recognized in:
- **README.md** - Contributors section
- **Release notes** - Feature attributions
- **Project documentation** - Acknowledgments

## 👑 Project Maintainers

- **@saiyam0211** - Admin/Lead Developer & Project Owner
  - Overall project direction and architecture decisions
  - Code review and final approvals for critical changes
  - CI/CD pipeline management and deployment oversight

Thank you for contributing to Dharika! 🎉

---

**Happy contributing! Let's build something amazing together! 🚀** 