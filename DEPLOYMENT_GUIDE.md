# CER Deployment Guide - Azure Cloud

## 🚀 Quick Deployment Steps

### Prerequisites
- GitHub account
- Azure account with active subscription
- Azure CLI installed

---

## 📦 **Step 1: Deploy to Azure**

Your CER project is already deployed in Azure with these resources:

### Azure Resources (Resource Group: `rg-cer-prod`)
- **Frontend**: Azure Static Web App (`cer-frontend`)
- **Backend**: Azure Container App (`cer-backend`)
- **Database**: Azure SQL Database (`cer-sql-server-2025/cerdb`)
- **Container Registry**: `cerregistry2025`
- **Managed Environment**: `cer-env`

---

## 🔄 **Step 2: Automatic CI/CD Deployment**

### ✅ **CI/CD Already Configured!**

Your project is set up for **automatic deployment** when you push to GitHub:

**Frontend (Static Web App):**
- ✅ Connected to GitHub repository
- ✅ Automatically builds and deploys on every `git push` to `main`
- ✅ GitHub Actions workflow: `.github/workflows/azure-static-web-apps-gray-stone-00b286e10.yml`

**Backend (Container App):**
- ✅ GitHub Actions workflow: `.github/workflows/azure-container-app-backend.yml`
- ✅ Automatically builds Docker image and deploys on backend changes

### 2.1 How CI/CD Works
```bash
# Simply push your changes - deployment happens automatically!
git add .
git commit -m "Your changes"
git push origin main

# GitHub Actions will:
# 1. Build your frontend and deploy to Static Web App
# 2. Build Docker image for backend and deploy to Container App
# 3. Everything is live within 2-3 minutes!
```

### 2.2 Manual Deployment (if needed)
```bash
# Only if you need to manually trigger deployment
az containerapp update --name cer-backend --resource-group rg-cer-prod
```

---

## ⚙️ **Step 3: Environment Configuration**

### 3.1 Frontend Environment Variables (Static Web App)
```bash
az staticwebapp appsettings set --name cer-frontend --resource-group rg-cer-prod --setting-names \
  REACT_APP_API_URL=https://cer-backend.lemonbeach-6b713b41.eastus.azurecontainerapps.io/api \
  REACT_APP_ENVIRONMENT=production
```

### 3.2 Backend Environment Variables (Container App)
```bash
az containerapp update --name cer-backend --resource-group rg-cer-prod --set-env-vars \
  NODE_ENV=production \
  FRONTEND_URL=https://gray-stone-00b286e10.1.azurestaticapps.net \
  DB_HOST=cer-sql-server-2025.database.windows.net \
  DB_NAME=cerdb \
  JWT_SECRET=your_jwt_secret_here
```

---

## 📊 **Step 4: Verify Deployment**

### 4.1 Check Frontend
```bash
# Get Static Web App URL
az staticwebapp show --name cer-frontend --resource-group rg-cer-prod --query defaultHostname
```

### 4.2 Check Backend
```bash
# Get Container App URL
az containerapp show --name cer-backend --resource-group rg-cer-prod --query properties.configuration.ingress.fqdn

# Test health endpoint
curl https://cer-backend.lemonbeach-6b713b41.eastus.azurecontainerapps.io/api/health
```

### 4.3 Check Database
```bash
# Check database connection
az sql db show --name cerdb --server cer-sql-server-2025 --resource-group rg-cer-prod --query status
```

---

## 🌐 **Step 5: Custom Domain Setup**

Follow the instructions in `CUSTOM_DOMAIN_SETUP.md` to configure your custom domain `cuidando-el-rancho.com`.

---

## 🔧 **Step 6: Monitoring and Logs**

### 6.1 View Container App Logs
```bash
az containerapp logs show --name cer-backend --resource-group rg-cer-prod --follow
```

### 6.2 View Static Web App Deployment History
```bash
az staticwebapp show --name cer-frontend --resource-group rg-cer-prod
```

### 6.3 Monitor Database Performance
```bash
az sql db show-usage --name cerdb --server cer-sql-server-2025 --resource-group rg-cer-prod
```

---

## 💡 **Pro Tips**

### Performance Optimization
1. **Azure CDN**: Consider adding CDN for global performance
2. **Application Insights**: Monitor application performance
3. **Auto-scaling**: Container Apps automatically scale based on load

### Cost Management
- **Azure Cost Management**: Monitor spending in Azure portal
- **Resource optimization**: Scale down non-production resources
- **Reserved instances**: Consider for long-term cost savings

---

## 🔐 **Security Checklist**

- ✅ Environment variables secured in Azure Key Vault (recommended)
- ✅ CORS configured properly in Container App
- ✅ SQL Database firewall rules configured
- ✅ HTTPS enabled (automatic with Azure)
- ✅ Container registry access controlled

---

## 🎯 **Current URLs**

- **Frontend**: https://gray-stone-00b286e10.1.azurestaticapps.net
- **Backend**: https://cer-backend.lemonbeach-6b713b41.eastus.azurecontainerapps.io
- **API Health**: https://cer-backend.lemonbeach-6b713b41.eastus.azurecontainerapps.io/api/health

### After Custom Domain Setup:
- **Frontend**: https://www.cuidando-el-rancho.com
- **Backend**: https://api.cuidando-el-rancho.com
- **API Health**: https://api.cuidando-el-rancho.com/api/health

---

## 🚀 **Quick Deploy Command**

**The easiest way to deploy your changes:**

```bash
# That's it! Just push to GitHub and everything deploys automatically
git add .
git commit -m "Your latest changes"
git push origin main

# 🎉 Your changes will be live in 2-3 minutes!
# - Frontend: Deployed via GitHub Actions to Static Web App
# - Backend: Built as Docker image and deployed to Container App
```

### Manual Commands (if needed)
```bash
# Check deployment status
az staticwebapp show --name cer-frontend --resource-group rg-cer-prod --query "defaultHostname"
az containerapp show --name cer-backend --resource-group rg-cer-prod --query "properties.latestRevisionName"

# Manual backend update (rarely needed)
az containerapp update --name cer-backend --resource-group rg-cer-prod
```

Your CER website is live on Azure! 🎉
