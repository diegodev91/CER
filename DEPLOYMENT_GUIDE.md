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

## 🔄 **Step 2: Update Deployment**

### 2.1 Check Current Deployment Status
```bash
# Check Static Web App status
az staticwebapp show --name cer-frontend --resource-group rg-cer-prod

# Check Container App status
az containerapp show --name cer-backend --resource-group rg-cer-prod

# Check SQL Database status
az sql db show --name cerdb --server cer-sql-server-2025 --resource-group rg-cer-prod
```

### 2.2 Deploy Latest Changes
Since your code is pushed to GitHub, Azure will automatically deploy if connected to your repository, or you can trigger manual deployment:

```bash
# Update Container App with latest image
az containerapp update --name cer-backend --resource-group rg-cer-prod

# Update Static Web App (if not auto-deploying)
az staticwebapp deploy --name cer-frontend --resource-group rg-cer-prod --source .
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

To deploy your latest changes:

```bash
# Ensure you're logged into Azure
az login

# Deploy latest changes (if auto-deploy is not configured)
az containerapp update --name cer-backend --resource-group rg-cer-prod
```

Your CER website is live on Azure! 🎉
