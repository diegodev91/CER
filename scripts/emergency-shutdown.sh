#!/bin/bash

# Emergency Azure Resources Shutdown Script
# Use this script if you need to immediately stop all resources to prevent costs

echo "🚨 EMERGENCY SHUTDOWN - CER Azure Resources"
echo "==========================================="

RESOURCE_GROUP="rg-cer-prod"

echo "⚠️  This will shutdown all your Azure resources to prevent costs."
echo "📋 Resource Group: $RESOURCE_GROUP"
echo ""

read -p "Are you sure you want to proceed? (yes/no): " confirmation

if [ "$confirmation" != "yes" ]; then
    echo "❌ Shutdown cancelled."
    exit 0
fi

echo "🛑 Starting emergency shutdown..."

# 1. Scale Container App to zero
echo "📦 Scaling Container App to zero replicas..."
az containerapp update \
  --name "cer-backend" \
  --resource-group "$RESOURCE_GROUP" \
  --min-replicas 0 \
  --max-replicas 0

# 2. Pause SQL Database (if serverless)
echo "⏸️ Attempting to pause SQL Database..."
az sql db update \
  --name "cerdb" \
  --server "cer-sql-server-2025" \
  --resource-group "$RESOURCE_GROUP" \
  --auto-pause-delay 1 || echo "ℹ️ Database pause not available"

# 3. Show current status
echo "📊 Current resource status:"
az resource list \
  --resource-group "$RESOURCE_GROUP" \
  --query '[].{Name:name,Type:type,Location:location}' \
  --output table

echo ""
echo "✅ Emergency shutdown complete!"
echo ""
echo "🔄 To restart your services:"
echo "   1. Push any code change to GitHub (triggers auto-deployment)"
echo "   2. Or run: az containerapp update --name cer-backend --resource-group $RESOURCE_GROUP --min-replicas 1"
echo ""
echo "💰 Monitor costs: https://portal.azure.com/#blade/Microsoft_Azure_CostManagement/Menu/overview"
