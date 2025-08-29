export enum ValidationErrorMessages {
    IS_EMAIL = 'The value must be a valid email address.',
    IS_NUMBER = 'The value must be a number.',
    IS_POSITIVE_NUMBER = 'The value must be a positive number.',
    IS_STRING = 'The value must be a non-empty string.',
    IS_BOOLEAN = 'The value must be a boolean.',
    IS_CPF = 'The value must be a valid CPF.',
    IS_PHONE_NUMBER = 'The value must be a valid phone number (8-15 digits, may start with "+").',
    IS_PASSWORD_STRONG = 'The password must be at least 8 characters long and include uppercase, lowercase and numeric characters.',
    IS_NON_EMPTY_ARRAY = 'The value must be a non-empty array.',
    IS_NULL_OR_EMPTY = 'The value cannot be null, undefined, or an empty string.',
    IS_EMAIL_UNIQUE = 'The email provided is already registered.',
    IS_CPF_UNIQUE = 'The CPF provided is already registered.'
}
