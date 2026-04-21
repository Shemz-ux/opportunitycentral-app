/**
 * Email validation utility functions
 */

/**
 * Validates email format using RFC 5322 compliant regex
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if email is valid, false otherwise
 */
export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return false;
  }

  // Trim whitespace
  email = email.trim();

  // Check if empty after trim
  if (email.length === 0) {
    return false;
  }

  // RFC 5322 compliant email regex
  // This regex validates most common email formats
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  return emailRegex.test(email);
};

/**
 * Validates email with additional checks and returns detailed error message
 * @param {string} email - Email address to validate
 * @returns {object} - { isValid: boolean, error: string|null }
 */
export const validateEmail = (email) => {
  // Check if email is provided
  if (!email || typeof email !== 'string') {
    return {
      isValid: false,
      error: 'Email address is required'
    };
  }

  // Trim whitespace
  email = email.trim();

  // Check if empty after trim
  if (email.length === 0) {
    return {
      isValid: false,
      error: 'Email address is required'
    };
  }

  // Check minimum length
  if (email.length < 3) {
    return {
      isValid: false,
      error: 'Email address is too short'
    };
  }

  // Check maximum length (RFC 5321)
  if (email.length > 254) {
    return {
      isValid: false,
      error: 'Email address is too long'
    };
  }

  // Check for @ symbol
  if (!email.includes('@')) {
    return {
      isValid: false,
      error: 'Email address must contain @'
    };
  }

  // Split email into local and domain parts
  const parts = email.split('@');
  
  // Check for multiple @ symbols
  if (parts.length !== 2) {
    return {
      isValid: false,
      error: 'Email address must contain exactly one @'
    };
  }

  const [localPart, domain] = parts;

  // Validate local part (before @)
  if (localPart.length === 0) {
    return {
      isValid: false,
      error: 'Email address must have characters before @'
    };
  }

  if (localPart.length > 64) {
    return {
      isValid: false,
      error: 'Email address local part is too long'
    };
  }

  // Validate domain part (after @)
  if (domain.length === 0) {
    return {
      isValid: false,
      error: 'Email address must have a domain after @'
    };
  }

  // Check for at least one dot in domain
  if (!domain.includes('.')) {
    return {
      isValid: false,
      error: 'Email domain must contain at least one'
    };
  }

  // Check domain doesn't start or end with dot
  if (domain.startsWith('.') || domain.endsWith('.')) {
    return {
      isValid: false,
      error: 'Email domain cannot start or end with a dot'
    };
  }

  // Check for consecutive dots
  if (domain.includes('..')) {
    return {
      isValid: false,
      error: 'Email domain cannot contain consecutive dots'
    };
  }

  // Validate TLD (top-level domain) - must be at least 2 characters
  const domainParts = domain.split('.');
  const tld = domainParts[domainParts.length - 1];
  
  if (tld.length < 2) {
    return {
      isValid: false,
      error: 'Email domain extension must be at least 2 characters'
    };
  }

  // Final regex validation
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      error: 'Please enter a valid email address'
    };
  }

  return {
    isValid: true,
    error: null
  };
};

/**
 * Sanitizes email by trimming whitespace and converting to lowercase
 * @param {string} email - Email address to sanitize
 * @returns {string} - Sanitized email
 */
export const sanitizeEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return '';
  }

  return email.trim().toLowerCase();
};

/**
 * Checks if email is from a disposable email provider
 * @param {string} email - Email address to check
 * @returns {boolean} - True if disposable, false otherwise
 */
export const isDisposableEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return false;
  }

  const domain = email.split('@')[1]?.toLowerCase();
  
  // Common disposable email domains
  const disposableDomains = [
    'tempmail.com',
    'guerrillamail.com',
    '10minutemail.com',
    'mailinator.com',
    'throwaway.email',
    'temp-mail.org',
    'fakeinbox.com',
    'trashmail.com',
    'yopmail.com',
    'maildrop.cc'
  ];

  return disposableDomains.includes(domain);
};
