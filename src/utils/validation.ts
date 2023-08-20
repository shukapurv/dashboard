import parsePhoneNumber from 'libphonenumber-js';

export function isValidFirstName(firstName: string): boolean {
  return firstName.trim() !== '';
}

export function isValidLastName(lastName: string): boolean {
  return lastName.trim() !== '';
}

export function isValidPhoneNumber(phoneNumber: string): boolean {
  try {
    const parsedPhoneNumber =  parsePhoneNumber('+91'+ phoneNumber);
    console.log(parsedPhoneNumber);
    return parsedPhoneNumber?.isValid() || false;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
