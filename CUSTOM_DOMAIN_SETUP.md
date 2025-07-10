# Custom Domain Setup Guide for CER (Azure Only)

Your CER project is fully deployed in Azure with these resources:
- **Frontend**: Azure Static Web App (`cer-frontend`)
- **Backend**: Azure Container App (`cer-backend`)
- **Database**: Azure SQL Database (`cer-sql-server-2025/cerdb`)

## 🚀 DNS Records Required

Add these records to your domain registrar for `cuidando-el-rancho.com`:

### For Frontend (Static Web App)
```dns
Type: CNAME
Name: www
Value: gray-stone-00b286e10.1.azurestaticapps.net
```

### For Backend (Container App)
```dns
Type: TXT
Name: asuid.api
Value: D9723A44848A96F1482DD91366835E32D4EE2AD2C86B459B926CF13A89510B13

Type: CNAME
Name: api
Value: cer-backend.lemonbeach-6b713b41.eastus.azurecontainerapps.io
```

## 🔧 After DNS Propagation (24-48 hours)

Run these commands to complete the setup:

### 1. Add Custom Domain to Static Web App
```bash
az staticwebapp hostname set --name cer-frontend --resource-group rg-cer-prod --hostname www.cuidando-el-rancho.com
```

### 2. Add Custom Domain to Container App
```bash
az containerapp hostname add --name cer-backend --resource-group rg-cer-prod --hostname api.cuidando-el-rancho.com
```

### 3. Update Environment Variables
```bash
# Set Static Web App environment variables
az staticwebapp appsettings set --name cer-frontend --resource-group rg-cer-prod --setting-names REACT_APP_API_URL=https://api.cuidando-el-rancho.com/api REACT_APP_ENVIRONMENT=production

# Set Container App environment variables  
az containerapp update --name cer-backend --resource-group rg-cer-prod --set-env-vars FRONTEND_URL=https://www.cuidando-el-rancho.com NODE_ENV=production
```

## 🔗 Final URLs
- **Frontend**: https://www.cuidando-el-rancho.com
- **API**: https://api.cuidando-el-rancho.com
- **Health Check**: https://api.cuidando-el-rancho.com/api/health

## ✅ Current Status
- ✅ All Azure resources deployed
- ✅ Code updated for custom domain
- ⏳ DNS records need to be created
- ⏳ Custom domains need to be added after DNS propagation
