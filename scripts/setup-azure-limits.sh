#!/bin/bash

# Azure Budget and Monitoring Setup Script
# This script helps you set up cost monitoring and alerts for your Azure resources

echo "🔒 Setting up Azure cost monitoring and budgets..."

# Variables - Update these with your actual values
RESOURCE_GROUP="rg-cer-prod"
SUBSCRIPTION_ID=$(az account show --query id -o tsv)
BUDGET_NAME="cer-monthly-budget"
BUDGET_AMOUNT="10" # $10 monthly budget for free tier
EMAIL_ADDRESS="your-email@example.com" # Replace with your email

echo "📋 Resource Group: $RESOURCE_GROUP"
echo "📋 Subscription: $SUBSCRIPTION_ID"

# 1. Create a budget for the resource group
echo "💰 Creating monthly budget of $${BUDGET_AMOUNT}..."

az consumption budget create \
  --budget-name "$BUDGET_NAME" \
  --amount "$BUDGET_AMOUNT" \
  --resource-group "$RESOURCE_GROUP" \
  --time-grain Monthly \
  --start-date $(date -d "first day of this month" +%Y-%m-01) \
  --end-date $(date -d "first day of next year" +%Y-12-31)

# 2. Set up cost alerts at different thresholds
echo "🚨 Setting up cost alerts..."

# Alert at 50% of budget
az monitor action-group create \
  --name "cer-cost-alerts" \
  --resource-group "$RESOURCE_GROUP" \
  --action email cost-alert "$EMAIL_ADDRESS"

# Create budget alert
az consumption budget create \
  --budget-name "cer-budget-alert-50" \
  --amount $(echo "$BUDGET_AMOUNT * 0.5" | bc) \
  --resource-group "$RESOURCE_GROUP" \
  --time-grain Monthly \
  --start-date $(date -d "first day of this month" +%Y-%m-01) \
  --end-date $(date -d "first day of next year" +%Y-12-31)

echo "✅ Budget and alerts configured!"

# 3. Show current costs
echo "💸 Current month costs:"
az consumption usage list \
  --resource-group "$RESOURCE_GROUP" \
  --start-date $(date -d "first day of this month" +%Y-%m-01) \
  --end-date $(date +%Y-%m-%d) \
  --query '[].{Service:instanceName,Cost:pretaxCost}' \
  --output table

# 4. Container App scaling limits
echo "⚖️ Setting Container App scaling limits..."

az containerapp update \
  --name "cer-backend" \
  --resource-group "$RESOURCE_GROUP" \
  --min-replicas 0 \
  --max-replicas 2 \
  --cpu 0.25 \
  --memory 0.5Gi

echo "🎯 Resource limits applied:"
echo "  - Min replicas: 0 (scales to zero when idle)"
echo "  - Max replicas: 2 (prevents runaway scaling)"
echo "  - CPU: 0.25 cores"
echo "  - Memory: 0.5 GB"

# 4.5. Set environment variables for resource control
echo "🔧 Setting environment variables for resource control..."

az containerapp update \
  --name "cer-backend" \
  --resource-group "$RESOURCE_GROUP" \
  --set-env-vars \
    NODE_ENV=production \
    MAX_MEMORY_MB=400 \
    MAX_CPU_PERCENTAGE=80 \
    REQUEST_TIMEOUT=30000 \
    MAX_CONCURRENT_REQUESTS=50 \
    DB_POOL_MAX=5 \
    DB_POOL_MIN=1 \
    DB_POOL_ACQUIRE=30000 \
    DB_POOL_IDLE=10000 \
    MAX_FILE_SIZE=5242880 \
    MAX_FILES_PER_REQUEST=3 \
    RATE_LIMIT_WINDOW_MS=900000 \
    RATE_LIMIT_MAX_REQUESTS=50 \
    STRICT_RATE_LIMIT_WINDOW_MS=300000 \
    STRICT_RATE_LIMIT_MAX_REQUESTS=10 \
    ENABLE_RESOURCE_MONITORING=true \
    MEMORY_WARNING_THRESHOLD_MB=350 \
    CPU_WARNING_THRESHOLD=75

echo "✅ Environment variables configured for resource limits!"

# 5. Database resource limits
echo "🗄️ Checking database tier and setting auto-pause..."
az sql db show \
  --name "cerdb" \
  --server "cer-sql-server-2025" \
  --resource-group "$RESOURCE_GROUP" \
  --query '{Tier:currentServiceObjectiveName,MaxSize:maxSizeBytes}' \
  --output table

# Enable auto-pause for serverless SQL Database (if applicable)
echo "⏸️ Configuring database auto-pause to save costs..."
az sql db update \
  --name "cerdb" \
  --server "cer-sql-server-2025" \
  --resource-group "$RESOURCE_GROUP" \
  --auto-pause-delay 60 \
  --capacity 1 \
  --family Gen5 \
  --compute-model Serverless || echo "ℹ️ Auto-pause not available for current database tier"

echo "✅ Database configured for cost optimization!"

echo "✅ Setup complete! Monitor costs at: https://portal.azure.com/#blade/Microsoft_Azure_CostManagement/Menu/overview"
