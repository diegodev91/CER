#!/bin/bash

# CER Project Deployment Script
# This script prepares and deploys your CER project to Vercel + Railway

echo "🚀 CER Deployment Setup"
echo "======================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the CER project root directory"
    exit 1
fi

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit: CER project setup"
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Check if remote origin exists
if ! git remote get-url origin > /dev/null 2>&1; then
    echo ""
    echo "🔗 Please add your GitHub repository as origin:"
    echo "   git remote add origin https://github.com/YOUR_USERNAME/cer-cuidando-el-rancho.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
    echo ""
    read -p "Press Enter after you've created and pushed to your GitHub repository..."
fi

# Install dependencies
echo "📦 Installing dependencies..."
echo "Installing root dependencies..."
npm install

echo "Installing frontend dependencies..."
cd frontend && npm install && cd ..

echo "Installing backend dependencies..."
cd backend && npm install && cd ..

echo "✅ All dependencies installed"

# Create environment files
echo "⚙️ Setting up environment files..."

# Backend environment
if [ ! -f "backend/.env" ]; then
    cp backend/.env.example backend/.env
    echo "✅ Created backend/.env from template"
    echo "⚠️  Please update backend/.env with your database credentials"
else
    echo "✅ Backend .env already exists"
fi

# Display next steps
echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "Next steps:"
echo "1. Update backend/.env with your database credentials"
echo "2. Push your code to GitHub if not done already"
echo "3. Deploy frontend to Vercel:"
echo "   • Go to vercel.com"
echo "   • Import your GitHub repository"
echo "   • Set root directory to 'frontend'"
echo ""
echo "4. Deploy backend to Railway:"
echo "   • Go to railway.app"
echo "   • Import your GitHub repository"
echo "   • Set root directory to 'backend'"
echo "   • Add PostgreSQL database"
echo ""
echo "5. Configure environment variables on both platforms"
echo ""
echo "📖 See DEPLOYMENT_GUIDE.md for detailed instructions"
echo ""

# Test local setup
echo "🧪 Testing local setup..."
echo "Starting backend server (this will test database connection)..."

cd backend
if npm start &
then
    BACKEND_PID=$!
    sleep 5
    
    # Test health endpoint
    if curl -s http://localhost:5000/api/health > /dev/null; then
        echo "✅ Backend is running correctly"
    else
        echo "⚠️  Backend may have issues - check your database configuration"
    fi
    
    kill $BACKEND_PID
else
    echo "⚠️  Backend failed to start - check your configuration"
fi

cd ..

echo ""
echo "🚀 Ready for deployment!"
echo "Follow the DEPLOYMENT_GUIDE.md for step-by-step deployment instructions."
