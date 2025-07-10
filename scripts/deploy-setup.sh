#!/bin/bash

# CER Project Deployment Script - Azure
# This script prepares and deploys your CER project to Azure

echo "🚀 CER Azure Deployment Setup"
echo "============================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the CER project root directory"
    exit 1
fi

# Check if Azure CLI is installed
if ! command -v az &> /dev/null; then
    echo "❌ Azure CLI is not installed. Please install it first:"
    echo "   https://docs.microsoft.com/en-us/cli/azure/install-azure-cli"
    exit 1
fi

# Check Azure login status
if ! az account show &> /dev/null; then
    echo "🔐 Please login to Azure first:"
    echo "   az login"
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
    echo "   git remote add origin https://github.com/YOUR_USERNAME/CER.git"
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

# Check Azure deployment status
echo "☁️ Checking Azure deployment status..."

# Check if resource group exists
if az group show --name rg-cer-prod &> /dev/null; then
    echo "✅ Azure resource group 'rg-cer-prod' found"
    
    # List current resources
    echo "📋 Current Azure resources:"
    az resource list --resource-group rg-cer-prod --output table
    
    echo ""
    echo "🔄 To deploy your latest changes:"
    echo "   az containerapp update --name cer-backend --resource-group rg-cer-prod"
    echo ""
else
    echo "❌ Azure resource group 'rg-cer-prod' not found"
    echo "   Please ensure your Azure deployment is set up correctly"
fi

# Display next steps
echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "Next steps:"
echo "1. Ensure your code is pushed to GitHub"
echo "2. Check your Azure deployment status above"
echo "3. Deploy latest changes:"
echo "   az containerapp update --name cer-backend --resource-group rg-cer-prod"
echo ""
echo "4. Verify deployment:"
echo "   Frontend: https://gray-stone-00b286e10.1.azurestaticapps.net"
echo "   Backend: https://cer-backend.lemonbeach-6b713b41.eastus.azurecontainerapps.io"
echo "   Health: https://cer-backend.lemonbeach-6b713b41.eastus.azurecontainerapps.io/api/health"
echo ""
echo "📖 See DEPLOYMENT_GUIDE.md for detailed Azure instructions"
echo "🌐 See CUSTOM_DOMAIN_SETUP.md for custom domain configuration"
echo ""

echo "🚀 Ready for Azure deployment!"
