# Local Development Setup for CER

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v16 or higher)
- SQL Server
- npm or yarn
- Git

---

## 📦 **Step 1: Install Dependencies**

```bash
# From the CER root directory
npm run install:all

# Or install manually:
npm install
cd frontend && npm install && cd ..
cd backend && npm install && cd ..
```

---

## 🗄️ **Step 2: Set Up SQL Server Database**

### Option A: Using Local SQL Server
```bash
# Install SQL Server (if not installed)
# macOS with Docker:
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=YourPassword123!" \
  -p 1433:1433 --name sql-server \
  -d mcr.microsoft.com/mssql/server:2022-latest

# Create database using sqlcmd
docker exec -it sql-server /opt/mssql-tools/bin/sqlcmd \
  -S localhost -U sa -P "YourPassword123!" \
  -Q "CREATE DATABASE cer_database;"
```

### Option B: Using SQL Server Management Studio
```sql
-- Connect to your SQL Server instance
-- Create new database
CREATE DATABASE cer_database;

-- Create user (optional)
USE cer_database;
CREATE LOGIN ceradmin WITH PASSWORD = 'Password123!';
CREATE USER ceradmin FOR LOGIN ceradmin;
ALTER ROLE db_owner ADD MEMBER ceradmin;
```

---

## ⚙️ **Step 3: Configure Environment Variables**

### Backend Environment (.env)
```bash
# Copy example file
cd backend
cp .env.example .env

# Edit .env file with your database credentials
```

### Frontend Environment (.env)
```bash
# Create frontend .env
cd frontend
cat > .env << EOF
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENVIRONMENT=development
EOF
```

---

## 🏃‍♂️ **Step 4: Start Development Servers**

### Option A: Start Both Servers Together (Recommended)
```bash
# From CER root directory
npm run dev
```

### Option B: Start Servers Separately
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm start
```

---

## 🧪 **Step 5: Test Your Setup**

### Backend API Tests
```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Should return: {"status":"OK","message":"CER API is running"}

# Test episodes endpoint
curl http://localhost:5000/api/episodes

# Test with browser
open http://localhost:5000/api/health
```

### Frontend Tests
```bash
# Frontend should be available at:
open http://localhost:3000

# Check browser console for any errors
```

---

## 🛠️ **Development Workflow**

### Making Changes
1. **Backend changes**: Server auto-restarts (nodemon)
2. **Frontend changes**: Browser auto-refreshes (React hot reload)
3. **Database changes**: Run migrations manually

### Adding Sample Data
```bash
# Create and run database migrations
cd backend
npm run db:migrate

# Add sample data (create seed files)
npm run db:seed
```

---

## 🐛 **Troubleshooting Common Issues**

### Database Connection Issues
```bash
# Check if SQL Server is running
docker ps | grep sql-server

# Test connection manually
docker exec -it sql-server /opt/mssql-tools/bin/sqlcmd \
  -S localhost -U sa -P "YourPassword123!"
```

### Port Already in Use
```bash
# Kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000 (frontend)
lsof -ti:3000 | xargs kill -9
```

### Module Not Found Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Do the same for frontend and backend
```

---

## 📊 **Available Scripts**

### Root Directory
- `npm run dev` - Start both frontend and backend
- `npm run install:all` - Install all dependencies
- `npm run build` - Build frontend for production

### Backend (`cd backend`)
- `npm run dev` - Start with nodemon (auto-restart)
- `npm start` - Start normally
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Add sample data
- `npm test` - Run tests

### Frontend (`cd frontend`)
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

---

## 🔍 **Testing Different Features**

### API Endpoints
```bash
# Episodes
curl http://localhost:5000/api/episodes
curl http://localhost:5000/api/episodes/1

# News
curl http://localhost:5000/api/news

# Shop
curl http://localhost:5000/api/shop

# Health check
curl http://localhost:5000/api/health
```

### Frontend Pages
- Home: http://localhost:3000/
- Episodes: http://localhost:3000/episodes
- News: http://localhost:3000/news
- Shop: http://localhost:3000/shop
- About: http://localhost:3000/about

---

## 🎯 **Development Tips**

### Browser Developer Tools
1. **Network Tab**: Check API calls
2. **Console**: Look for JavaScript errors
3. **Application Tab**: Check localStorage/cookies

### Backend Debugging
```bash
# Enable debug mode
DEBUG=* npm run dev

# Check logs
tail -f logs/app.log
```

### Database Management
```bash
# Connect to database
docker exec -it sql-server /opt/mssql-tools/bin/sqlcmd \
  -S localhost -U sa -P "YourPassword123!" -d cer_database

# View tables
SELECT name FROM sys.tables;

# View specific table
SELECT * FROM episodes;
```

---

## 🚀 **Ready for Development!**

Your local environment should now be running:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **API Health**: http://localhost:5000/api/health
- **Database**: SQL Server on localhost:1433
