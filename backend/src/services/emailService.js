const nodemailer = require('nodemailer');

// Email configuration
const createTransporter = () => {
  try {
    const config = {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    };

    // For development, use Gmail or other service
    if (process.env.NODE_ENV === 'development' && process.env.EMAIL_SERVICE) {
      return nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE, // 'gmail', 'outlook', etc.
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });
    }

    return nodemailer.createTransport(config);
  } catch (error) {
    console.warn('Email service could not be initialized. Email functionality will be limited.');
    return null;
  }
};

const transporter = createTransporter();

// Email templates
const emailTemplates = {
  emailVerification: (user, token, baseUrl) => ({
    subject: 'Verify Your Email - CER TV',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
          <h1 style="color: #333;">Welcome to CER TV!</h1>
        </div>
        <div style="padding: 20px;">
          <h2>Hi ${user.firstName},</h2>
          <p>Thank you for registering with CER TV. Please verify your email address by clicking the button below:</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${baseUrl}/api/auth/verify-email?token=${token}" 
               style="background-color: #007bff; color: white; padding: 12px 30px; 
                      text-decoration: none; border-radius: 5px; display: inline-block;">
              Verify Email Address
            </a>
          </div>
          
          <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #666;">
            ${baseUrl}/api/auth/verify-email?token=${token}
          </p>
          
          <p><strong>This link will expire in 24 hours.</strong></p>
          
          <p>If you didn't create an account with us, please ignore this email.</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">
            This email was sent by CER TV. If you have any questions, please contact our support team.
          </p>
        </div>
      </div>
    `
  }),

  passwordReset: (user, token, baseUrl) => ({
    subject: 'Reset Your Password - CER TV',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center;">
          <h1 style="color: #333;">Password Reset Request</h1>
        </div>
        <div style="padding: 20px;">
          <h2>Hi ${user.firstName},</h2>
          <p>We received a request to reset your password for your CER TV account.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${baseUrl}/reset-password?token=${token}" 
               style="background-color: #dc3545; color: white; padding: 12px 30px; 
                      text-decoration: none; border-radius: 5px; display: inline-block;">
              Reset Password
            </a>
          </div>
          
          <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
          <p style="word-break: break-all; color: #666;">
            ${baseUrl}/reset-password?token=${token}
          </p>
          
          <p><strong>This link will expire in 1 hour.</strong></p>
          
          <p>If you didn't request a password reset, please ignore this email and your password will remain unchanged.</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">
            This email was sent by CER TV. If you have any questions, please contact our support team.
          </p>
        </div>
      </div>
    `
  }),

  accountLocked: (user) => ({
    subject: 'Account Security Alert - CER TV',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #fff3cd; padding: 20px; text-align: center;">
          <h1 style="color: #856404;">Security Alert</h1>
        </div>
        <div style="padding: 20px;">
          <h2>Hi ${user.firstName},</h2>
          <p>Your CER TV account has been temporarily locked due to multiple failed login attempts.</p>
          
          <p><strong>Account Details:</strong></p>
          <ul>
            <li>Email: ${user.email}</li>
            <li>Lock time: ${new Date().toLocaleString()}</li>
            <li>Account will be unlocked automatically in 2 hours</li>
          </ul>
          
          <p>If this wasn't you, please:</p>
          <ul>
            <li>Change your password immediately after the lock expires</li>
            <li>Review your account security settings</li>
            <li>Contact our support team if you suspect unauthorized access</li>
          </ul>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">
            This email was sent by CER TV. If you have any questions, please contact our support team.
          </p>
        </div>
      </div>
    `
  }),

  welcomeEmail: (user) => ({
    subject: 'Welcome to CER TV Community!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #28a745; padding: 20px; text-align: center;">
          <h1 style="color: white;">Welcome to CER TV!</h1>
        </div>
        <div style="padding: 20px;">
          <h2>Hi ${user.firstName},</h2>
          <p>Welcome to the CER TV community! Your email has been verified and your account is now active.</p>
          
          <p><strong>What you can do now:</strong></p>
          <ul>
            <li>Watch our latest episodes and news</li>
            <li>Leave comments and ratings</li>
            <li>Browse our shop for exclusive products</li>
            <li>Stay updated with our latest content</li>
          </ul>
          
          <p>We're excited to have you as part of our community!</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}" 
               style="background-color: #28a745; color: white; padding: 12px 30px; 
                      text-decoration: none; border-radius: 5px; display: inline-block;">
              Explore CER TV
            </a>
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">
            This email was sent by CER TV. If you have any questions, please contact our support team.
          </p>
        </div>
      </div>
    `
  })
};

// Send email function
const sendEmail = async (to, template, data = {}) => {
  try {
    if (!transporter) {
      console.warn('Email transporter not available. Skipping email send.');
      return { success: false, error: 'Email service not configured' };
    }

    const emailContent = template(data.user, data.token, data.baseUrl);
    
    const mailOptions = {
      from: `"CER TV" <${process.env.SMTP_FROM || process.env.EMAIL_USER}>`,
      to,
      subject: emailContent.subject,
      html: emailContent.html
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: error.message };
  }
};

// Send verification email
const sendVerificationEmail = async (user, token, baseUrl) => {
  return sendEmail(
    user.email, 
    emailTemplates.emailVerification, 
    { user, token, baseUrl }
  );
};

// Send password reset email
const sendPasswordResetEmail = async (user, token, baseUrl) => {
  return sendEmail(
    user.email, 
    emailTemplates.passwordReset, 
    { user, token, baseUrl }
  );
};

// Send account locked email
const sendAccountLockedEmail = async (user) => {
  return sendEmail(
    user.email, 
    emailTemplates.accountLocked, 
    { user }
  );
};

// Send welcome email
const sendWelcomeEmail = async (user) => {
  return sendEmail(
    user.email, 
    emailTemplates.welcomeEmail, 
    { user }
  );
};

module.exports = {
  sendEmail,
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendAccountLockedEmail,
  sendWelcomeEmail,
  emailTemplates
};
