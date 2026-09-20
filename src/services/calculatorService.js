export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  return input.replace(/[<>&"']/g, '').trim();
};

export const calculateBMI = (heightCm, weightKg) => {
  const hInMeters = heightCm / 100;
  if (hInMeters <= 0) return '0.0';
  return (weightKg / (hInMeters * hInMeters)).toFixed(1);
};

export const generateMathCaptcha = () => {
  const n1 = Math.floor(Math.random() * 9) + 1;
  const n2 = Math.floor(Math.random() * 9) + 1;
  return { num1: n1, num2: n2, answer: n1 + n2 };
};

export const validateContactForm = (formData, captchaAnswer, honeypot) => {
  const errors = {};
  const nameRegex = /^[a-zA-Z\s]{2,50}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[0-9+\-\s()]{7,15}$/;

  if (!nameRegex.test(sanitizeInput(formData.fullName))) {
    errors.fullName = 'Valid name required (letters only, min 2 chars).';
  }
  if (!emailRegex.test(sanitizeInput(formData.email))) {
    errors.email = 'Valid email address required.';
  }
  if (!phoneRegex.test(sanitizeInput(formData.phone))) {
    errors.phone = 'Valid phone number required.';
  }
  if (parseInt(formData.userCaptchaAnswer, 10) !== captchaAnswer) {
    errors.userCaptchaAnswer = 'Incorrect math answer. Please try again.';
  }
  if (honeypot !== '') {
    errors.botDetected = 'Bot submission detected.';
  }

  return { isValid: Object.keys(errors).length === 0, errors };
};
