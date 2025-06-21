# 🚀 Dharika CI/CD Pipeline Setup

**Ready-to-use CI/CD pipeline for when you initialize your frontend and backend projects!**

**Admin/Maintainer:** @saiyam0211

## 📋 Overview

This repository contains a comprehensive CI/CD pipeline setup for the Dharika e-commerce platform. The pipeline is designed to automatically work with any standard frontend/backend project structure once developers create their code repositories.

**Pipeline Administrator:** The CI/CD pipeline is configured with `saiyam0211` as the admin username for notifications, issue assignments, and critical alerts.

## ✨ What's Included

### 🔄 **Automated CI Pipeline** (`.github/workflows/ci.yml`)
- **Smart Detection**: Automatically detects frontend (`frontend/`, `client/`, `web/`) and backend (`backend/`, `server/`, `api/`) directories
- **Multi-Language Support**: Works with Node.js and Python backends
- **Comprehensive Testing**: Linting, type checking, unit tests, and builds
- **Security Scanning**: Vulnerability checks for dependencies
- **Flexible Package Managers**: Supports npm, yarn, and pnpm

### 🚀 **Automated CD Pipeline** (`.github/workflows/cd.yml`)
- **Multi-Platform Deployment**: Netlify, Vercel, Hostinger/FTP, Heroku, Railway, VPS
- **Environment-Specific**: Separate staging and production deployments
- **Notification System**: Slack and email notifications for deployment status
- **Rollback Support**: Easy rollback procedures for failed deployments

### 📝 **GitHub Templates**
- **Pull Request Template**: Comprehensive PR checklist and requirements
- **Issue Templates**: Bug reports and feature requests
- **Branch Protection**: Configured for main and development branches

### 📚 **Documentation**
- **SETUP.md**: Complete setup guide for developers
- **CONTRIBUTING.md**: Development workflow and standards
- **Environment Variables Guide**: Comprehensive configuration documentation

## 🎯 How It Works

### Step 1: Developer Project Initialization
When developers create their project structure:
```
your-project/
├── frontend/          # React/Next.js app
│   └── package.json
├── backend/           # Node.js/Python API
│   └── package.json   # or requirements.txt
└── .github/           # Already set up! ✅
```

### Step 2: Automatic Detection & CI
The CI pipeline automatically:
1. **Detects** which directories exist (frontend/backend)
2. **Identifies** the technology stack (Node.js/Python)
3. **Runs appropriate checks**:
   - Frontend: ESLint, Prettier, TypeScript, tests, build
   - Backend: Linting, tests, security scans
4. **Reports results** as GitHub status checks

### Step 3: Automatic Deployment
On successful merge:
- **Development branch** → Deploys to staging
- **Main branch** → Deploys to production
- **Notifications** sent to team via Slack/email

## 🛠️ Setup Instructions

### For Repository Owners

1. **Enable GitHub Actions** (if not already enabled)
2. **Set up GitHub Secrets** (see [Environment Variables Guide](./environment-variables.md))
3. **Configure branch protection rules**:
   ```bash
   # Main branch: 2 reviewers required, CI must pass
   # Development branch: 1 reviewer required, CI must pass
   ```
4. **Admin Configuration**: The pipeline is pre-configured with `saiyam0211` as admin
   - All critical alerts will mention @saiyam0211
   - Production deployment failures will auto-assign issues to saiyam0211
   - CI failures on main/development branches will notify the admin

### For Developers

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-org/dharika.git
   cd dharika
   ```

2. **Create your project structure**:
   ```bash
   # Create frontend (choose one approach)
   npx create-next-app@latest frontend --typescript --tailwind --eslint
   # or
   npx create-react-app frontend --template typescript
   # or
   npm create vue@latest frontend

   # Create backend (choose one approach)
   mkdir backend && cd backend
   npm init -y && npm install express
   # or
   mkdir backend && cd backend
   python -m venv venv && pip install fastapi uvicorn
   ```

3. **The CI/CD pipeline will automatically work!** ✨

## 🔧 Configuration Options

### Supported Project Structures

The pipeline automatically detects and works with:

#### Frontend Options:
- `frontend/` - Main frontend directory
- `client/` - Alternative frontend directory
- `web/` - Alternative frontend directory

#### Backend Options:
- `backend/` - Main backend directory
- `server/` - Alternative backend directory
- `api/` - Alternative backend directory

#### Technology Stacks:
- **Frontend**: React, Next.js, Vue, Vite (TypeScript supported)
- **Backend**: Node.js (Express, Fastify), Python (FastAPI, Django)
- **Package Managers**: npm, yarn, pnpm, pip

### Environment Variables

Required GitHub Secrets (add in repository settings):

```bash
# Deployment
NETLIFY_AUTH_TOKEN      # For Netlify deployment
HEROKU_API_KEY         # For Heroku deployment
RAZORPAY_PROD_KEY      # For payment integration
SLACK_WEBHOOK_URL      # For notifications

# See environment-variables.md for complete list
```

## 🚦 Branch Strategy & Workflow

### Branch Protection Rules (Automatically Configured)

#### `main` branch:
- ❌ No direct pushes
- ✅ Requires 2 approving reviews
- ✅ Requires status checks to pass
- ✅ Requires up-to-date branches
- 🚀 Auto-deploys to production

#### `development` branch:
- ❌ No direct pushes
- ✅ Requires 1 approving review
- ✅ Requires status checks to pass
- 🧪 Auto-deploys to staging

### Developer Workflow

1. **Create feature branch**:
   ```bash
   git checkout development
   git pull origin development
   git checkout -b feature/your-feature-name
   ```

2. **Make changes** and commit:
   ```bash
   git add .
   git commit -m "feat(scope): description"
   ```

3. **Push and create PR**:
   ```bash
   git push origin feature/your-feature-name
   # Create PR targeting 'development' branch
   ```

4. **CI automatically runs**:
   - ✅ Linting and formatting checks
   - ✅ Type checking (TypeScript)
   - ✅ Unit and integration tests
   - ✅ Build verification
   - ✅ Security scanning

5. **After approval and merge**:
   - 🧪 Staging deployment (from development)
   - 🚀 Production deployment (from main)

## 📊 Pipeline Status & Monitoring

### CI Status Checks
- **Frontend CI**: Linting, testing, building
- **Backend CI**: Linting, testing, security
- **Security Scan**: Dependency vulnerabilities
- **Build Status**: Overall pipeline health

### Deployment Monitoring
- **Slack Notifications**: Real-time deployment updates
- **Email Alerts**: Critical failure notifications
- **GitHub Status**: Deployment status on commits

### Logs & Debugging
- View detailed logs in GitHub Actions tab
- Monitor deployment status in hosting platforms
- Check application health post-deployment

## 🚨 Troubleshooting

### Common Issues

#### CI Pipeline Fails
```bash
# Check the specific job that failed in GitHub Actions
# Common fixes:
1. Fix linting errors: npm run lint:fix
2. Fix failing tests: Update tests or fix code
3. Fix build errors: Check compilation issues
```

#### Deployment Fails
```bash
# Check deployment logs in GitHub Actions
# Common fixes:
1. Verify environment variables are set
2. Check hosting platform status
3. Ensure build artifacts are correct
```

#### Environment Issues
```bash
# Missing environment variables
1. Add required secrets to GitHub repository
2. Check environment-variables.md for complete list
3. Verify secrets are accessible to workflows
```

### Getting Help

1. **Check documentation**: [SETUP.md](./SETUP.md) and [CONTRIBUTING.md](./CONTRIBUTING.md)
2. **Review logs**: GitHub Actions provides detailed error logs
3. **Create issue**: Use bug report template for assistance
4. **Contact admin**: Reach out to @saiyam0211 for urgent pipeline issues

## 🎉 Benefits for Developers

### ✅ **Zero Configuration**
- Works out of the box with standard project structures
- No need to set up CI/CD from scratch
- Automatic detection of technology stack

### ✅ **Production Ready**
- Industry-standard practices built-in
- Security scanning included
- Multiple deployment options supported

### ✅ **Developer Friendly**
- Clear error messages and logs
- Comprehensive documentation
- Helpful templates and guides

### ✅ **Scalable**
- Supports team growth
- Handles multiple environments
- Extensible for future needs

## 🚀 Next Steps

1. **Initialize your project** structure (frontend/backend)
2. **Set up GitHub Secrets** for deployment
3. **Create your first feature branch**
4. **Make a pull request** and watch the magic happen! ✨

The CI/CD pipeline will automatically:
- Run all checks on your code
- Deploy to staging when you merge to development
- Deploy to production when you merge to main
- Keep your team notified throughout the process
- Alert @saiyam0211 for critical issues and production failures

## 📖 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

---

**Ready to build something amazing? The pipeline is ready when you are! 🚀**

*Questions? Check our [CONTRIBUTING.md](./CONTRIBUTING.md) or contact @saiyam0211 for pipeline-specific issues!* 