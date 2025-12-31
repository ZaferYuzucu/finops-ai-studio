// Form validation utilities

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { isValid: boolean; message?: string } => {
  if (password.length < 8) {
    return { isValid: false, message: 'Şifre en az 8 karakter olmalıdır' };
  }
  if (!/[A-Z]/.test(password)) {
    return { isValid: false, message: 'Şifre en az bir büyük harf içermelidir' };
  }
  if (!/[a-z]/.test(password)) {
    return { isValid: false, message: 'Şifre en az bir küçük harf içermelidir' };
  }
  if (!/[0-9]/.test(password)) {
    return { isValid: false, message: 'Şifre en az bir rakam içermelidir' };
  }
  return { isValid: true };
};

export const validateName = (name: string): boolean => {
  return name.trim().length >= 2;
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone);
};
















