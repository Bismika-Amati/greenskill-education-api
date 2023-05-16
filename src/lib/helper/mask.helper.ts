import {
  PasswordMaskOptions,
  PhoneMaskOptions,
  maskPassword,
  maskPhone,
} from 'maskdata';

const maskOptions = {
  maskWith: '*',
  maxMaskedCharacters: 16,
  unmaskedStartCharacters: 2,
  unmaskedEndCharacters: 1,
};

const phoneMaskOptions = {
  maskWith: '*',
  unmaskedStartDigits: 4,
  unmaskedEndDigits: 1,
};

export function hiddenString(
  value,
  opts: PasswordMaskOptions = maskOptions,
): string {
  return maskPassword(value, opts);
}

export function hiddenPhone(
  value,
  opts: PhoneMaskOptions = phoneMaskOptions,
): string {
  return maskPhone(value, opts);
}
