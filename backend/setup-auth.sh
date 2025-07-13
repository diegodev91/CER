#!/bin/bash

# CER Authentication Setup Script
echo "🚀 Setting up CER Authentication System..."

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please update the .env file with your actual configuration values!"
    echo "   Required: JWT_SECRET, JWT_REFRESH_SECRET, and email/SMS settings"
else
    echo "✅ .env file already exists"
fi

# Run database migrations
echo "📊 Running database migrations..."
npm run db:migrate

if [ $? -eq 0 ]; then
    echo "✅ Database migrations completed successfully"
else
    echo "❌ Database migrations failed. Please check your database configuration."
    exit 1
fi

# Run database seeder
echo "👤 Creating super admin user..."
npm run db:seed

if [ $? -eq 0 ]; then
    echo "✅ Super admin user created successfully"
    echo ""
    echo "🔐 Default Super Admin Credentials:"
    echo "   Email: admin@cuidandoelrancho.com"
    echo "   Password: SuperAdmin123!"
    echo ""
    echo "⚠️  IMPORTANT: Change the default password after first login!"
else
    echo "❌ Database seeding failed. Please check the logs."
    exit 1
fi

echo ""
echo "🎉 Authentication system setup complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Update your .env file with real values"
echo "2. Configure email service (SMTP or service provider)"
echo "3. Configure SMS service (Twilio) for phone verification"
echo "4. Start the server: npm run dev"
echo "5. Test the authentication endpoints"
echo ""
echo "📖 Documentation: See AUTHENTICATION_GUIDE.md for detailed usage"
