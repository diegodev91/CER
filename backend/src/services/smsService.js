const twilio = require('twilio');

// Initialize Twilio client
let twilioClient = null;

const initializeTwilio = () => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  
  if (accountSid && authToken && accountSid.startsWith('AC')) {
    twilioClient = twilio(accountSid, authToken);
    return true;
  }
  
  console.warn('Twilio credentials not found or invalid. SMS functionality will be disabled.');
  return false;
};

// Initialize on module load
const isTwilioEnabled = initializeTwilio();

// Generate random verification code
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
};

// Format phone number to E.164 format
const formatPhoneNumber = (phoneNumber) => {
  // Remove all non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // Add country code if not present (assuming US for now)
  if (cleaned.length === 10) {
    return `+1${cleaned}`;
  } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+${cleaned}`;
  } else if (cleaned.startsWith('+')) {
    return phoneNumber;
  }
  
  // Return as is if we can't determine format
  return phoneNumber;
};

// Send SMS verification code
const sendVerificationSMS = async (phoneNumber, code) => {
  if (!isTwilioEnabled) {
    console.warn('SMS service not configured. Skipping SMS send.');
    return { 
      success: false, 
      error: 'SMS service not configured',
      code: 'SERVICE_UNAVAILABLE'
    };
  }
  
  try {
    const formattedPhone = formatPhoneNumber(phoneNumber);
    
    const message = await twilioClient.messages.create({
      body: `Your CER TV verification code is: ${code}. This code will expire in 10 minutes. Do not share this code with anyone.`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: formattedPhone
    });
    
    console.log(`SMS sent successfully. SID: ${message.sid}`);
    return { 
      success: true, 
      sid: message.sid,
      status: message.status 
    };
  } catch (error) {
    console.error('SMS sending failed:', error);
    return { 
      success: false, 
      error: error.message,
      code: error.code || 'SMS_SEND_FAILED'
    };
  }
};

// Send SMS notification
const sendSMSNotification = async (phoneNumber, message) => {
  if (!isTwilioEnabled) {
    console.warn('SMS service not configured. Skipping SMS send.');
    return { 
      success: false, 
      error: 'SMS service not configured',
      code: 'SERVICE_UNAVAILABLE'
    };
  }
  
  try {
    const formattedPhone = formatPhoneNumber(phoneNumber);
    
    const sms = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: formattedPhone
    });
    
    console.log(`SMS notification sent successfully. SID: ${sms.sid}`);
    return { 
      success: true, 
      sid: sms.sid,
      status: sms.status 
    };
  } catch (error) {
    console.error('SMS notification failed:', error);
    return { 
      success: false, 
      error: error.message,
      code: error.code || 'SMS_SEND_FAILED'
    };
  }
};

// Send account security alert via SMS
const sendSecurityAlertSMS = async (phoneNumber, alertType) => {
  const messages = {
    'login': 'CER TV: New login detected on your account. If this wasn\'t you, please secure your account immediately.',
    'password_changed': 'CER TV: Your password has been changed. If this wasn\'t you, please contact support immediately.',
    'account_locked': 'CER TV: Your account has been locked due to multiple failed login attempts. It will be unlocked automatically in 2 hours.',
    'suspicious_activity': 'CER TV: Suspicious activity detected on your account. Please review your account security settings.'
  };
  
  const message = messages[alertType] || messages['suspicious_activity'];
  return sendSMSNotification(phoneNumber, message);
};

// Validate phone number format
const isValidPhoneNumber = (phoneNumber) => {
  // Basic E.164 format validation
  const e164Regex = /^\+?[1-9]\d{1,14}$/;
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  return e164Regex.test(formatPhoneNumber(phoneNumber)) && cleaned.length >= 10;
};

// Check if SMS service is available
const isSMSServiceAvailable = () => {
  return isTwilioEnabled && 
         process.env.TWILIO_PHONE_NUMBER && 
         process.env.TWILIO_ACCOUNT_SID && 
         process.env.TWILIO_AUTH_TOKEN;
};

module.exports = {
  generateVerificationCode,
  formatPhoneNumber,
  sendVerificationSMS,
  sendSMSNotification,
  sendSecurityAlertSMS,
  isValidPhoneNumber,
  isSMSServiceAvailable
};
