export const LABELS = {
  firstName: "First Name",
  lastName: "Last Name",
  email: "Email Address",
  password: "Password",
  confirmPassword: "Confirm Password",
  location: "Location",
  dateOfBirth: "Date of Birth",
};

export const PLACEHOLDERS = {
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  password: "Create a password",
  confirmPassword: "Confirm your password",
  location: "Chennai, India",
};

export const ERRORS = {
  required: (field) => `${field} is required`,
  invalidEmail: "Email is invalid",
  passwordMinLength: "Password must be at least 6 characters",
  passwordMismatch: "Passwords do not match",
  general: "Registration failed. Please try again.",
};