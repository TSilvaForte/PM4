import validator from 'validator';

export const validateEmail = (email: string): string => {
    return validator.isEmail(email) ? "" : "Invalid email format";
};

export const validatePassword = (password: string): string => {
    return validator.isLength(password, { min: 4, max: 10 }) ? "" : "Must be between 4 and 10 characters";
};

export const validateNameAndAddress = (value: string): string => {
    return value.length > 8 ? "" : 'This field must have more than 8 characters.';
};

export const validatePhone = (value: string): string => {
    return validator.isMobilePhone(value, undefined, { strictMode: false }) ? "" : 'Please enter a valid mobile phone number.';
};

export const validateNewPassword = (value: string): string => {
    const strongPasswordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/; // At least 8 characters with letters and numbers
    return strongPasswordPattern.test(value) ? "" : 'Password must be at least 8 characters long and include letters and numbers.';
};

export const validateRepeatPassword = (password: string, repeatPassword: string): string => {
    return password === repeatPassword ? "" : 'Passwords do not match.';
};
