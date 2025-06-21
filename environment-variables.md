# 🔧 Environment Variables Configuration

This document provides a comprehensive guide to all environment variables used in the Dharika e-commerce platform.

## 📋 Environment Variables Template

Copy the template below to create your `.env` files:

```bash
# =========================================
# DHARIKA E-COMMERCE PLATFORM
# Environment Variables Template
# =========================================

# =========================================
# GENERAL CONFIGURATION
# =========================================
NODE_ENV=development
PORT=5000
APP_NAME=Dharika
APP_URL=http://localhost:3000

# =========================================
# DATABASE CONFIGURATION
# =========================================
# PostgreSQL (Recommended for production)
DATABASE_URL=postgresql://username:password@localhost:5432/dharika_db

# SQLite (For quick development)
# DATABASE_URL=sqlite:./dharika.db

# MongoDB (Alternative)
# DATABASE_URL=mongodb://localhost:27017/dharika

# =========================================
# JWT AUTHENTICATION
# =========================================
JWT_SECRET=your-super-secret-jwt-key-here-change-in-production
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-refresh-token-secret-here
JWT_REFRESH_EXPIRES_IN=30d

# =========================================
# FRONTEND CONFIGURATION
# =========================================
# API URL for frontend to connect to backend
NEXT_PUBLIC_API_URL=http://localhost:5000
REACT_APP_API_URL=http://localhost:5000
VITE_API_URL=http://localhost:5000

# Environment for frontend
NEXT_PUBLIC_ENVIRONMENT=development
REACT_APP_ENVIRONMENT=development
VITE_ENVIRONMENT=development

# =========================================
# RAZORPAY PAYMENT GATEWAY
# =========================================
# Test Keys (for development)
RAZORPAY_KEY_ID=rzp_test_your_key_here
RAZORPAY_KEY_SECRET=your_razorpay_secret_here
NEXT_PUBLIC_RAZORPAY_KEY=rzp_test_your_key_here
REACT_APP_RAZORPAY_KEY=rzp_test_your_key_here
VITE_RAZORPAY_KEY=rzp_test_your_key_here

# Production Keys (use in production)
# RAZORPAY_PROD_KEY=rzp_live_your_production_key
# RAZORPAY_PROD_SECRET=your_production_secret

# =========================================
# EMAIL CONFIGURATION (SMTP)
# =========================================
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=noreply@dharika.com
EMAIL_FROM_NAME=Dharika Support

# =========================================
# SMS CONFIGURATION (TWILIO)
# =========================================
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# =========================================
# FILE STORAGE (AWS S3)
# =========================================
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
AWS_S3_BUCKET=dharika-assets
AWS_CLOUDFRONT_DOMAIN=your-cloudfront-domain.com

# =========================================
# REDIS CONFIGURATION (CACHING)
# =========================================
REDIS_URL=redis://localhost:6379
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password

# =========================================
# ANALYTICS & TRACKING
# =========================================
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
REACT_APP_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

GOOGLE_TAG_MANAGER_ID=GTM-XXXXXXX
FACEBOOK_PIXEL_ID=your_facebook_pixel_id

# =========================================
# SOCIAL MEDIA INTEGRATION
# =========================================
# Instagram Basic Display API
INSTAGRAM_APP_ID=your_instagram_app_id
INSTAGRAM_APP_SECRET=your_instagram_app_secret

# WhatsApp Business API
WHATSAPP_ACCESS_TOKEN=your_whatsapp_access_token
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id

# =========================================
# NOTIFICATIONS
# =========================================
# Slack Webhooks
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK
SLACK_CHANNEL=#deployments

# Email Notifications
NOTIFICATION_EMAIL=admin@dharika.com

# =========================================
# GAME CONFIGURATION
# =========================================
# Runner Game Settings
GAME_LEADERBOARD_SIZE=100
GAME_REWARD_MULTIPLIER=1.0
GAME_MAX_SCORE=999999

# =========================================
# BUSINESS LOGIC
# =========================================
# Pricing & Discounts
DEFAULT_CURRENCY=INR
TAX_RATE=0.18
SHIPPING_RATE=50
COD_FEE=30
FREE_SHIPPING_THRESHOLD=999

# Inventory
LOW_STOCK_THRESHOLD=10
OUT_OF_STOCK_THRESHOLD=0
```

## 🗝️ GitHub Secrets Setup

### Required Secrets for CI/CD Pipeline

Add these secrets in your GitHub repository settings (Settings → Secrets and variables → Actions):

#### **Frontend Deployment Secrets**

```bash
# Netlify
NETLIFY_AUTH_TOKEN=your_netlify_auth_token
NETLIFY_SITE_ID=your_production_site_id
NETLIFY_STAGING_SITE_ID=your_staging_site_id

# Vercel (Alternative)
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_vercel_org_id
VERCEL_PROJECT_ID=your_vercel_project_id

# FTP/Hostinger (Alternative)
FTP_HOST=ftp.yourdomain.com
FTP_USERNAME=your_ftp_username
FTP_PASSWORD=your_ftp_password
FTP_PROD_DIR=/public_html
FTP_STAGING_DIR=/staging
```

#### **Backend Deployment Secrets**

```bash
# Heroku
HEROKU_API_KEY=your_heroku_api_key
HEROKU_EMAIL=your_heroku_email
HEROKU_PROD_APP=dharika-production
HEROKU_STAGING_APP=dharika-staging

# Railway (Alternative)
RAILWAY_TOKEN=your_railway_token
RAILWAY_PROD_SERVICE=your_prod_service_id
RAILWAY_STAGING_SERVICE=your_staging_service_id

# VPS/DigitalOcean (Alternative)
VPS_HOST=your.vps.ip.address
VPS_USERNAME=your_vps_username
VPS_SSH_KEY=your_private_ssh_key_content
VPS_PORT=22
VPS_PROD_PATH=/var/www/dharika-prod
VPS_STAGING_PATH=/var/www/dharika-staging
```

#### **Application Secrets**

```bash
# Razorpay
RAZORPAY_PROD_KEY=rzp_live_your_production_key
RAZORPAY_PROD_SECRET=your_production_secret
RAZORPAY_TEST_KEY=rzp_test_your_test_key
RAZORPAY_TEST_SECRET=your_test_secret

# Database
PROD_DATABASE_URL=postgresql://prod_user:prod_pass@prod_host:5432/dharika_prod
STAGING_DATABASE_URL=postgresql://staging_user:staging_pass@staging_host:5432/dharika_staging

# API URLs
PROD_API_URL=https://api.yourdomain.com
STAGING_API_URL=https://staging-api.yourdomain.com

# JWT
JWT_SECRET=your-super-secure-production-jwt-secret

# Notifications
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK
NOTIFICATION_EMAIL=admin@dharika.com
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

## 🛠️ Environment Setup Script

Create this script to help set up environment variables:

```bash
#!/bin/bash
# setup-env.sh - Environment setup helper script

echo "🔧 Setting up environment variables for Dharika..."

# Create .env file from template
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp environment-variables.md .env.template
    echo "✅ .env.template created. Please copy to .env and fill in your values."
else
    echo "⚠️  .env file already exists. Skipping creation."
fi

# Create frontend .env.local
if [ -d "frontend" ] && [ ! -f "frontend/.env.local" ]; then
    echo "📝 Creating frontend/.env.local..."
    cat > frontend/.env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_RAZORPAY_KEY=rzp_test_your_key_here
NEXT_PUBLIC_ENVIRONMENT=development
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
EOF
    echo "✅ frontend/.env.local created."
fi

# Create backend .env
if [ -d "backend" ] && [ ! -f "backend/.env" ]; then
    echo "📝 Creating backend/.env..."
    cat > backend/.env << EOF
NODE_ENV=development
PORT=5000
DATABASE_URL=sqlite:./dharika.db
JWT_SECRET=your-development-jwt-secret-change-me
RAZORPAY_KEY_ID=rzp_test_your_key_here
RAZORPAY_KEY_SECRET=your_razorpay_secret_here
CORS_ORIGIN=http://localhost:3000
EOF
    echo "✅ backend/.env created."
fi

echo "✨ Environment setup complete!"
echo "📝 Please edit the .env files with your actual values before running the application."
```

## 📚 Environment-Specific Configurations

### Development Environment

```bash
NODE_ENV=development
APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000
DATABASE_URL=sqlite:./dharika.db
RAZORPAY_KEY_ID=rzp_test_your_key_here
CORS_ORIGIN=http://localhost:3000
```

### Staging Environment

```bash
NODE_ENV=staging
APP_URL=https://staging.yourdomain.com
NEXT_PUBLIC_API_URL=https://staging-api.yourdomain.com
DATABASE_URL=postgresql://staging_user:staging_pass@staging_host:5432/dharika_staging
RAZORPAY_KEY_ID=rzp_test_your_key_here
CORS_ORIGIN=https://staging.yourdomain.com
```

### Production Environment

```bash
NODE_ENV=production
APP_URL=https://yourdomain.com
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
DATABASE_URL=postgresql://prod_user:prod_pass@prod_host:5432/dharika_prod
RAZORPAY_KEY_ID=rzp_live_your_production_key
CORS_ORIGIN=https://yourdomain.com
```

## 🔒 Security Best Practices

### 1. **Never Commit Secrets**
- Add `.env*` to `.gitignore`
- Use environment-specific files (`.env.local`, `.env.production`)
- Store secrets in platform-specific secret managers

### 2. **Rotate Secrets Regularly**
- JWT secrets should be rotated monthly
- API keys should be rotated quarterly
- Database passwords should be rotated bi-annually

### 3. **Use Strong Secrets**
```bash
# Generate strong JWT secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Generate strong password
openssl rand -base64 32
```

### 4. **Environment Separation**
- Never use production secrets in development
- Use different API keys for different environments
- Implement proper access controls

## 🚨 Emergency Procedures

### If Secrets Are Compromised

1. **Immediate Actions:**
   - Rotate all affected secrets immediately
   - Update environment variables in all deployments
   - Monitor for unauthorized access

2. **GitHub Secrets:**
   - Delete compromised secrets from GitHub
   - Add new secrets with updated values
   - Re-run deployments to apply changes

3. **Database Security:**
   - Change database passwords
   - Update connection strings
   - Review access logs

4. **API Keys:**
   - Revoke compromised API keys
   - Generate new keys
   - Update all applications

## 📖 Additional Resources

- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Razorpay API Documentation](https://razorpay.com/docs/api/)
- [Environment Variables Best Practices](https://12factor.net/config)
- [Security Guidelines for Environment Variables](https://owasp.org/www-project-cheat-sheets/cheatsheets/Secrets_Management_Cheat_Sheet.html)

---

**Remember: Security is everyone's responsibility! 🔐** 