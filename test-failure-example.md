# Testing CI/CD Failure Scenarios

## To test failure handling, you can:

### 1. Test Linting Failure
Edit `frontend/package.json` scripts:
```json
"lint": "echo 'ESLint found errors!' && exit 1"
```

### 2. Test Build Failure  
Edit `frontend/package.json` scripts:
```json
"build": "echo 'Build failed!' && exit 1"
```

### 3. Test Security Failure
Add a package with known vulnerabilities:
```bash
cd frontend
npm install lodash@4.17.20  # Has known vulnerabilities
```

### 4. Test Production Deployment Failure
Merge to main without setting up deployment secrets

## Expected Behaviors:
- ❌ CI checks will fail
- 🚨 Admin (@saiyam0211) will be notified
- 📧 Email/Slack notifications (if configured)
- 🔒 PR merge will be blocked until fixed 