export enum ValidationMessage {
    ID_REQUIRED = 'ID is required.',
    ID_NOT_NUMBER = 'ID must be a number.',
    ID_NOT_POSITIVE = 'ID must be a positive number.',
    ID_NOT_FOUND = 'The provided ID does not exist.',

    NAME_REQUIRED = 'Name is required.',
    NAME_NOT_STRING = 'Name must be a non-empty string.',

    EMAIL_INVALID = 'The email address is not valid.',
    EMAIL_REQUIRED = 'Email is required.',
    EMAIL_NOT_UNIQUE = 'The email address is already registered.',
    EMAIL_NOT_STRING = 'Email must be a non-empty string.',

    PASSWORD_REQUIRED = 'Password is required.',
    PASSWORD_INVALID = 'The password must be at least 8 characters long and include uppercase, lowercase, and numeric characters.',
    PASSWORD_NOT_STRING = 'Password must be a non-empty string.',

    CPF_REQUIRED = 'CPF is required.',
    CPF_INVALID = 'The CPF is not valid.',
    CPF_NOT_STRING = 'CPF must be a non-empty string.',
    CPF_NOT_UNIQUE = 'The CPF is already registered.',

    BOOLEAN_INVALID = 'The value must be a boolean.',
    ARRAY_EMPTY = 'The array cannot be empty.',
    PHONE_INVALID = 'The phone number must contain 8–15 digits and may start with "+".',

    SERVER_ERROR = 'An internal server error occurred.',
    NOT_FOUND = 'Resource not found.',

    USER_CREATED = 'User created successfully.',
    USERS_FETCHED = 'Users retrieved successfully.',
    USER_FETCHED = 'User retrieved successfully.',
    EMAIL_PASSWORD_UPDATED = 'Email and password updated successfully.',
    CLIENT_DELETED = 'Client deleted successfully.'
}
