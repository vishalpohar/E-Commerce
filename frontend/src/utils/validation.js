const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const STRONG_PASSWORD_PATTERN =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const validateEmail = (email) => {
    if (!email) return "Email is required.";
    if (!EMAIL_PATTERN.test(email)) return "Please enter a valid email address.";
    return "";
};

export const validatePassword = (password) => {
    if (!password) return "Password is required.";
    if (!STRONG_PASSWORD_PATTERN.test(password)) 
        return "Password must be at least 8 characters long and include an uppercase letter, lowercase letter, number, and special character.";
    return "";
}

export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) return "Please confirm your password.";
  if (password !== confirmPassword)
    return "Passwords do not match. Please try again";
  return "";
};