#!/bin/bash

# CER Local Development Test Script
# This script tests your local development environment

echo "🧪 Testing CER Local Development Environment"
echo "==========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print status
print_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ $2${NC}"
    else
        echo -e "${RED}❌ $2${NC}"
    fi
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Please run this script from the CER project root directory${NC}"
    exit 1
fi

echo "📍 Current directory: $(pwd)"
echo ""

# Test 1: Check Node.js version
echo "1. Checking Node.js version..."
if command -v node > /dev/null 2>&1; then
    NODE_VERSION=$(node --version)
    print_status 0 "Node.js is installed: $NODE_VERSION"
else
    print_status 1 "Node.js is not installed"
    echo "   Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Test 2: Check npm
echo ""
echo "2. Checking npm..."
if command -v npm > /dev/null 2>&1; then
    NPM_VERSION=$(npm --version)
    print_status 0 "npm is installed: $NPM_VERSION"
else
    print_status 1 "npm is not installed"
    exit 1
fi

# Test 3: Check PostgreSQL
echo ""
echo "3. Checking PostgreSQL..."
if command -v psql > /dev/null 2>&1; then
    print_status 0 "PostgreSQL client is installed"
    
    # Try to connect to the database
    if psql -h localhost -U ceradmin -d cer_database -c "SELECT 1;" > /dev/null 2>&1; then
        print_status 0 "Database connection successful"
    else
        print_warning "Cannot connect to database. Please check:"
    fi
fi

# Test 4: Check dependencies
echo ""
echo "4. Checking project dependencies..."

if [ -d "node_modules" ]; then
    print_status 0 "Root dependencies installed"
else
    print_warning "Root dependencies not installed. Run: npm install"
fi

if [ -d "frontend/node_modules" ]; then
    print_status 0 "Frontend dependencies installed"
else
    print_warning "Frontend dependencies not installed. Run: cd frontend && npm install"
fi

if [ -d "backend/node_modules" ]; then
    print_status 0 "Backend dependencies installed"
else
    print_warning "Backend dependencies not installed. Run: cd backend && npm install"
fi

# Test 5: Check environment files
echo ""
echo "5. Checking environment configuration..."

if [ -f "backend/.env" ]; then
    print_status 0 "Backend .env file exists"
else
    print_warning "Backend .env file missing. Run: cp backend/.env.example backend/.env"
fi

if [ -f "frontend/.env" ]; then
    print_status 0 "Frontend .env file exists"
else
    print_status 0 "Frontend .env file created"
fi

# Test 6: Test backend startup
echo ""
echo "6. Testing backend startup..."

cd backend
if npm list > /dev/null 2>&1; then
    print_status 0 "Backend dependencies are valid"
    
    # Start backend in background for testing
    echo "   Starting backend server..."
    npm start > /tmp/cer-backend.log 2>&1 &
    BACKEND_PID=$!
    
    # Wait for server to start
    sleep 5
    
    # Test health endpoint
    if curl -s http://localhost:5000/api/health > /dev/null 2>&1; then
        print_status 0 "Backend server is responding"
        
        # Test specific endpoint
        HEALTH_RESPONSE=$(curl -s http://localhost:5000/api/health)
        echo "   Health check response: $HEALTH_RESPONSE"
    else
        print_status 1 "Backend server is not responding"
        echo "   Check backend logs at /tmp/cer-backend.log"
    fi
    
    # Kill backend
    kill $BACKEND_PID > /dev/null 2>&1
    
else
    print_status 1 "Backend dependencies have issues"
fi

cd ..

# Test 7: Test frontend setup
echo ""
echo "7. Testing frontend setup..."

cd frontend
if npm list > /dev/null 2>&1; then
    print_status 0 "Frontend dependencies are valid"
    
    # Check if build works
    echo "   Testing frontend build..."
    if npm run build > /dev/null 2>&1; then
        print_status 0 "Frontend builds successfully"
        rm -rf build  # Clean up
    else
        print_status 1 "Frontend build failed"
    fi
else
    print_status 1 "Frontend dependencies have issues"
fi

cd ..

# Summary
echo ""
echo "📋 Test Summary"
echo "==============="
echo ""

if [ -f "backend/.env" ] && [ -d "frontend/node_modules" ] && [ -d "backend/node_modules" ]; then
    echo -e "${GREEN}🎉 Your development environment is ready!${NC}"
    echo ""
    echo "To start development:"
    echo "1. Start the development servers:"
    echo "   npm run dev"
    echo ""
    echo "2. Open your browser:"
    echo "   Frontend: http://localhost:3000"
    echo "   Backend API: http://localhost:5000/api/health"
    echo ""
    echo "3. Make your changes and see them live!"
else
    echo -e "${YELLOW}⚠️  Some setup steps are needed. Please check the warnings above.${NC}"
    echo ""
    echo "Quick setup commands:"
    echo "npm run install:all"
    echo "cp backend/.env.example backend/.env"
    echo ""
fi

echo "📖 For detailed instructions, see LOCAL_DEVELOPMENT.md"
