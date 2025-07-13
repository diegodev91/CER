# Authentication & Authorization System

This document describes the comprehensive authentication and authorization system implemented for the CER TV application.

## Features

### 🔐 Authentication
- **User Registration** with email verification
- **Secure Login** with JWT tokens and refresh tokens
- **Password Requirements** (8+ chars, uppercase, lowercase, number, special character)
- **Account Lockout** after 5 failed login attempts (2-hour lockout)
- **Password Reset** via email tokens
- **Session Management** with device tracking
- **Multi-device Support** with individual session control

### 📱 Multi-Factor Verification
- **Email Verification** (required for account activation)
- **SMS Verification** (optional, via Twilio)
- **Phone Number Validation** (E.164 format)

### 👥 Role-Based Access Control
- **User Roles**: `user`, `moderator`, `admin`, `super_admin`
- **Permission System** with granular access control
- **Role Hierarchy** with appropriate restrictions

### 🛡️ Security Features
- **Rate Limiting** on authentication endpoints
- **Password Hashing** with bcrypt (12 rounds)
- **Account Lockout** protection
- **Session Revocation** (individual or all devices)
- **Secure Token Management** with expiration
- **Input Validation** and sanitization

## API Endpoints

### Authentication Routes (`/api/auth`)

#### POST `/api/auth/register`
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890" // optional
}
```

**Response:**
```json
{
  "message": "User registered successfully. Please check your email to verify your account.",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "user",
    "isEmailVerified": false,
    "isPhoneVerified": false
  },
  "emailSent": true
}
```

#### POST `/api/auth/login`
Authenticate user and create session.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "user",
    "isEmailVerified": true,
    "isPhoneVerified": false,
    "avatar": null
  },
  "tokens": {
    "accessToken": "jwt_access_token",
    "refreshToken": "jwt_refresh_token",
    "expiresAt": "2025-07-10T15:30:00Z",
    "refreshExpiresAt": "2025-07-17T15:15:00Z"
  },
  "sessionId": "session_uuid"
}
```

#### POST `/api/auth/refresh`
Refresh access token using refresh token.

**Request Body:**
```json
{
  "refreshToken": "jwt_refresh_token"
}
```

#### POST `/api/auth/logout`
Logout from current session (requires authentication).

#### POST `/api/auth/logout-all`
Logout from all devices (requires authentication).

#### GET `/api/auth/verify-email?token=verification_token`
Verify email address using verification token.

#### POST `/api/auth/resend-verification`
Resend email verification.

### User Management Routes (`/api/users`)

#### GET `/api/users/profile`
Get current user profile (requires authentication).

#### PUT `/api/users/profile`
Update user profile (requires authentication).

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "bio": "User bio",
  "preferences": {
    "notifications": {
      "email": true,
      "sms": false,
      "push": true
    }
  }
}
```

#### PUT `/api/users/change-password`
Change user password (requires authentication).

**Request Body:**
```json
{
  "currentPassword": "OldPass123!",
  "newPassword": "NewPass123!"
}
```

#### POST `/api/users/forgot-password`
Send password reset email.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

#### POST `/api/users/reset-password`
Reset password using reset token.

**Request Body:**
```json
{
  "token": "reset_token",
  "newPassword": "NewPass123!"
}
```

#### POST `/api/users/send-phone-verification`
Send SMS verification code (requires authentication).

#### POST `/api/users/verify-phone`
Verify phone number with SMS code (requires authentication).

**Request Body:**
```json
{
  "code": "123456"
}
```

#### GET `/api/users/sessions`
Get user's active sessions (requires authentication).

#### DELETE `/api/users/sessions/:sessionId`
Revoke specific session (requires authentication).

#### DELETE `/api/users/account`
Delete user account (requires authentication and email verification).

### Admin Routes (`/api/admin`)

#### GET `/api/admin/users`
Get all users with filtering and pagination (admin only).

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 100)
- `search`: Search in name/email
- `role`: Filter by role
- `status`: Filter by status (active/inactive/verified/unverified)
- `sortBy`: Sort field (createdAt/lastLogin/email/firstName/lastName)
- `sortOrder`: Sort order (ASC/DESC)

#### GET `/api/admin/users/:userId`
Get specific user details (admin only).

#### PUT `/api/admin/users/:userId`
Update user details (admin only).

#### DELETE `/api/admin/users/:userId`
Delete user account (admin only).

#### POST `/api/admin/users/:userId/revoke-sessions`
Revoke all sessions for specific user (admin only).

#### GET `/api/admin/statistics`
Get user statistics and analytics (admin only).

#### POST `/api/admin/users/bulk-update`
Bulk update multiple users (admin only).

## User Roles & Permissions

### User (`user`)
- Read episodes, news, products, reels
- Create and read comments
- Manage own profile

### Moderator (`moderator`)
- All user permissions
- Moderate and delete comments
- Read all content

### Admin (`admin`)
- All moderator permissions
- Full CRUD on episodes, news, products, reels
- User management (read, update, delete)
- Cannot modify super_admin accounts

### Super Admin (`super_admin`)
- All permissions
- Can manage other admin accounts
- Can assign super_admin role

## Security Configuration

### Rate Limiting
- **Authentication endpoints**: 5 attempts per 15 minutes
- **Sensitive operations**: 3 attempts per hour
- **SMS verification**: 3 SMS per 10 minutes

### Account Lockout
- **Trigger**: 5 failed login attempts
- **Duration**: 2 hours
- **Email notification**: Sent when account is locked

### Token Configuration
- **Access Token**: 15 minutes expiry
- **Refresh Token**: 7 days expiry
- **Email Verification**: 24 hours expiry
- **Password Reset**: 1 hour expiry
- **SMS Verification**: 10 minutes expiry

## Environment Variables

### Required
```bash
JWT_SECRET=your-super-secure-jwt-secret
JWT_REFRESH_SECRET=your-super-secure-refresh-secret
```

### Email Configuration (Choose one)
```bash
# SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Or Email Service
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

### SMS Configuration (Optional)
```bash
TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE_NUMBER=+1234567890
```

## Database Setup

1. Run migrations:
```bash
npm run db:migrate
```

2. Seed super admin:
```bash
npm run db:seed
```

Default super admin:
- **Email**: admin@cuidandoelrancho.com
- **Password**: SuperAdmin123!

## Frontend Integration

### Authentication Headers
```javascript
// Include in API requests
headers: {
  'Authorization': `Bearer ${accessToken}`,
  'Content-Type': 'application/json'
}
```

### Token Management
```javascript
// Store tokens securely
localStorage.setItem('accessToken', token);
localStorage.setItem('refreshToken', refreshToken);

// Auto-refresh on token expiry
if (response.status === 401 && response.data.code === 'TOKEN_INVALID') {
  // Refresh token logic
}
```

### Role-based UI
```javascript
// Check user permissions
const canEdit = user.role === 'admin' || user.role === 'super_admin';
const canModerate = ['moderator', 'admin', 'super_admin'].includes(user.role);
```

## Security Best Practices

1. **Always use HTTPS** in production
2. **Rotate JWT secrets** regularly
3. **Monitor failed login attempts**
4. **Implement CSRF protection** if using cookies
5. **Validate and sanitize** all inputs
6. **Log security events** for auditing
7. **Keep dependencies updated**
8. **Use environment variables** for secrets

## Error Codes

### Authentication Errors
- `TOKEN_MISSING`: Authorization header missing
- `TOKEN_INVALID`: Invalid or expired token
- `SESSION_EXPIRED`: Session expired or invalid
- `USER_INACTIVE`: User account deactivated
- `ACCOUNT_LOCKED`: Account temporarily locked
- `EMAIL_VERIFICATION_REQUIRED`: Email verification required
- `INVALID_CREDENTIALS`: Wrong email/password

### Authorization Errors
- `INSUFFICIENT_PERMISSIONS`: Role-based access denied
- `PERMISSION_DENIED`: Action not allowed

### Validation Errors
- `USER_EXISTS`: Email already registered
- `EMAIL_ALREADY_VERIFIED`: Email already verified
- `PHONE_ALREADY_VERIFIED`: Phone already verified
- `CODE_EXPIRED`: Verification code expired
- `INVALID_CODE`: Wrong verification code

## Testing

### Manual Testing
1. Register new user
2. Verify email
3. Login and test tokens
4. Test password reset
5. Test phone verification
6. Test admin functions

### Automated Testing
```bash
npm test
```

## Monitoring & Analytics

The system provides built-in analytics:
- User registration trends
- Login attempt monitoring
- Active session tracking
- Role distribution statistics
- Security event logging

Access via `/api/admin/statistics` (admin only).
