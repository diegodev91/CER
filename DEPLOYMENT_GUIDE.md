# CER Deployment Guide - Vercel + Railway

## 🚀 Quick Deployment Steps

### Prerequisites
- GitHub account
- Vercel account (free)
- Railway account (free)

---

## 📦 **Step 1: Prepare Your Code**

### 1.1 Initialize Git Repository
```bash
cd /Users/diegodev91/Projects/CER
git init
git add .
git commit -m "Initial commit: CER project setup"
```

### 1.2 Create GitHub Repository
```bash
# Create a new repository on GitHub named 'cer-cuidando-el-rancho'
git remote add origin https://github.com/YOUR_USERNAME/cer-cuidando-el-rancho.git
git branch -M main
git push -u origin main
```

---

## 🌐 **Step 2: Deploy Frontend to Vercel**

### 2.1 Deploy via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your `cer-cuidando-el-rancho` repository
5. Configure project:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

### 2.2 Or Deploy via CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy frontend
cd frontend
vercel --prod

# Follow the prompts:
# - Link to existing project? N
# - Project name: cer-frontend
# - Directory: ./
# - Settings confirmed? Y
```

### 2.3 Environment Variables (Add in Vercel Dashboard)
```
REACT_APP_API_URL=https://your-railway-backend.railway.app/api
REACT_APP_ENVIRONMENT=production
```

---

## 🚂 **Step 3: Deploy Backend to Railway**

### 3.1 Deploy via Railway Dashboard
1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your `cer-cuidando-el-rancho` repository
6. Configure:
   - **Root Directory**: `backend`
   - **Start Command**: `npm start`

### 3.2 Add PostgreSQL Database
1. In Railway dashboard, click "+ New"
2. Select "PostgreSQL"
3. Railway will provision a database automatically

### 3.3 Environment Variables (Add in Railway Dashboard)
```
NODE_ENV=production
PORT=${{ PORT }}
DB_HOST=${{ POSTGRES_HOST }}
DB_PORT=${{ POSTGRES_PORT }}
DB_NAME=${{ POSTGRES_DB }}
DB_USER=${{ POSTGRES_USER }}
DB_PASSWORD=${{ POSTGRES_PASSWORD }}
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
FRONTEND_URL=https://your-vercel-app.vercel.app
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

---

## ⚙️ **Step 4: Configure CORS and Environment**

### 4.1 Update Backend CORS Configuration
The backend is already configured to use `process.env.FRONTEND_URL` for CORS.

### 4.2 Update Frontend API Configuration
Create or update `frontend/src/config/api.js`:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const apiConfig = {
  baseURL: API_BASE_URL,
  timeout: 10000,
};

export default API_BASE_URL;
```

---

## 📊 **Step 5: Verify Deployment**

### 5.1 Check Frontend
- Visit your Vercel URL
- Verify all pages load correctly
- Check browser console for errors

### 5.2 Check Backend
- Visit `https://your-railway-backend.railway.app/api/health`
- Should return: `{"status":"OK","message":"CER API is running"}`

### 5.3 Check Database Connection
- Railway will show database connection status
- Backend logs should show "Database connected successfully"

---

## 🔧 **Step 6: Custom Domains (Optional)**

### 6.1 Frontend Domain (Vercel)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed

### 6.2 Backend Domain (Railway)
1. Go to your service → Settings → Domains
2. Add custom domain
3. Configure DNS records

---

## 🚀 **Step 7: Continuous Deployment**

Both platforms automatically deploy when you push to your main branch:

```bash
# Make changes to your code
git add .
git commit -m "Add new feature"
git push origin main

# Vercel and Railway will automatically deploy the changes
```

---

## 💡 **Pro Tips**

### Performance Optimization
1. **Enable Vercel Analytics** (free tier available)
2. **Use Railway's metrics** to monitor backend performance
3. **Set up Vercel Edge Functions** for better global performance

### Monitoring
1. **Vercel**: Built-in analytics and performance monitoring
2. **Railway**: Built-in logs and metrics
3. **Consider adding**: Sentry for error tracking

### Cost Management
- **Vercel**: Free tier includes 100GB bandwidth/month
- **Railway**: $5/month after free trial, includes PostgreSQL
- **Total MVP cost**: ~$5-10/month

---

## 🔐 **Security Checklist**

- ✅ Environment variables set correctly
- ✅ CORS configured properly
- ✅ Database credentials secured
- ✅ JWT secret is strong and random
- ✅ HTTPS enabled (automatic with both platforms)

---

## 📞 **Support & Next Steps**

### If you encounter issues:
1. Check Railway logs for backend issues
2. Check Vercel function logs for frontend issues
3. Verify environment variables are set correctly
4. Test API endpoints individually

### Future scaling:
1. **Database**: Upgrade Railway PostgreSQL plan
2. **CDN**: Vercel automatically provides global CDN
3. **Backend**: Railway auto-scales within plan limits
4. **Monitoring**: Add application monitoring tools

---

## 🎯 **Expected URLs After Deployment**

- **Frontend**: `https://cer-frontend.vercel.app`
- **Backend**: `https://cer-backend.railway.app`
- **API Health**: `https://cer-backend.railway.app/api/health`

Your CER website will be live and ready for users! 🎉
