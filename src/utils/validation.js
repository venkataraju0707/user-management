export const validateUser = (userData) => {
  const errors = {};

  if (!userData.firstName.trim()) {
    errors.firstName = 'First name is required';
  } else if (userData.firstName.trim().length < 2) {
    errors.firstName = 'First name must be at least 2 characters long';
  }

  if (!userData.lastName.trim()) {
    errors.lastName = 'Last name is required';
  } else if (userData.lastName.trim().length < 2) {
    errors.lastName = 'Last name must be at least 2 characters long';
  }

  if (!userData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(userData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  return errors;
};

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};