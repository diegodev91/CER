#!/bin/bash

# Daily Cost Alert Check Script
# Add this to a cron job or run manually to get daily cost alerts

RESOURCE_GROUP="rg-cer-prod"
BUDGET_LIMIT="10"
TODAY=$(date +%Y-%m-%d)
MONTH_START=$(date -d "first day of this month" +%Y-%m-01)

echo "💰 Daily Cost Alert - $(date)"
echo "=============================="

# Get current month spending
CURRENT_COST=$(az consumption usage list \
  --resource-group "$RESOURCE_GROUP" \
  --start-date "$MONTH_START" \
  --end-date "$TODAY" \
  --query 'sum([].pretaxCost)' \
  --output tsv 2>/dev/null || echo "0")

# Calculate percentage of budget used
PERCENTAGE=$(echo "scale=2; ($CURRENT_COST / $BUDGET_LIMIT) * 100" | bc -l 2>/dev/null || echo "0")

echo "📊 Current Status:"
echo "   Monthly Budget: \$$BUDGET_LIMIT"
echo "   Current Spending: \$$CURRENT_COST"
echo "   Percentage Used: $PERCENTAGE%"
echo ""

# Alert levels
if (( $(echo "$PERCENTAGE > 90" | bc -l) )); then
    echo "🚨 CRITICAL: Over 90% of budget used!"
    echo "   Consider running emergency shutdown: ./scripts/emergency-shutdown.sh"
elif (( $(echo "$PERCENTAGE > 75" | bc -l) )); then
    echo "⚠️  WARNING: Over 75% of budget used!"
    echo "   Monitor usage closely and consider reducing resources"
elif (( $(echo "$PERCENTAGE > 50" | bc -l) )); then
    echo "⚡ NOTICE: Over 50% of budget used"
    echo "   Keep monitoring - usage is within normal range"
else
    echo "✅ GOOD: Budget usage is under control"
fi

echo ""

# Top resource consumers
echo "🔝 Top Resource Consumers This Month:"
az consumption usage list \
  --resource-group "$RESOURCE_GROUP" \
  --start-date "$MONTH_START" \
  --end-date "$TODAY" \
  --query '[].{Service:meterName,Cost:pretaxCost}' \
  --output table 2>/dev/null | head -10

echo ""
echo "🔗 Full cost analysis: https://portal.azure.com/#blade/Microsoft_Azure_CostManagement/Menu/overview"

# If over 85%, send alert (you can modify this to send email/slack notification)
if (( $(echo "$PERCENTAGE > 85" | bc -l) )); then
    echo ""
    echo "🚨 AUTOMATIC ALERT TRIGGERED"
    echo "   Cost threshold exceeded. Consider immediate action."
    # Add your notification logic here (email, Slack, etc.)
fi
