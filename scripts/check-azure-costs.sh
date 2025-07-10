#!/bin/bash

# Azure Cost Monitoring Script
# Run this script to check your current Azure costs and resource usage

echo "💰 CER Project - Azure Cost Report"
echo "=================================="

# Resource Group
RESOURCE_GROUP="rg-cer-prod"

# Get current date range
START_DATE=$(date -d "first day of this month" +%Y-%m-01)
END_DATE=$(date +%Y-%m-%d)

echo "📅 Period: $START_DATE to $END_DATE"
echo ""

# 1. Show current costs by service
echo "💸 Current Month Costs by Service:"
echo "-----------------------------------"
az consumption usage list \
  --resource-group "$RESOURCE_GROUP" \
  --start-date "$START_DATE" \
  --end-date "$END_DATE" \
  --query '[].{Service:meterName,Usage:quantity,Unit:unit,Cost:pretaxCost}' \
  --output table

echo ""

# 2. Container App resource usage
echo "🐳 Container App Status:"
echo "------------------------"
az containerapp show \
  --name "cer-backend" \
  --resource-group "$RESOURCE_GROUP" \
  --query '{Status:properties.provisioningState,Replicas:properties.template.scale,CPU:properties.template.containers[0].resources.cpu,Memory:properties.template.containers[0].resources.memory}' \
  --output table

echo ""

# 3. Database usage
echo "🗄️ Database Usage:"
echo "------------------"
az sql db show-usage \
  --name "cerdb" \
  --server "cer-sql-server-2025" \
  --resource-group "$RESOURCE_GROUP" \
  --query '{DatabaseSize:databaseSizeInBytes,MaxSize:maxSizeInBytes,Percentage:percentUsed}' \
  --output table

echo ""

# 4. Static Web App status
echo "🌐 Static Web App Status:"
echo "-------------------------"
az staticwebapp show \
  --name "cer-frontend" \
  --resource-group "$RESOURCE_GROUP" \
  --query '{Status:repositoryUrl,DefaultHostname:defaultHostname}' \
  --output table

echo ""

# 5. Resource Group overview
echo "📊 Resource Group Overview:"
echo "---------------------------"
az resource list \
  --resource-group "$RESOURCE_GROUP" \
  --query '[].{Name:name,Type:type,Location:location}' \
  --output table

echo ""
echo "🔗 Links:"
echo "- Azure Cost Management: https://portal.azure.com/#blade/Microsoft_Azure_CostManagement/Menu/overview"
echo "- Resource Group: https://portal.azure.com/#@/resource/subscriptions/$(az account show --query id -o tsv)/resourceGroups/$RESOURCE_GROUP/overview"
echo ""
echo "💡 Tips to reduce costs:"
echo "- Monitor Container App scaling (set min replicas to 0)"
echo "- Use Basic tier for SQL Database in development"
echo "- Enable auto-pause for SQL Database"
echo "- Delete unused resources regularly"
