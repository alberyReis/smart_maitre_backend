export const sanitizer = {
    trim: (value: any): string => {
        if (typeof value === 'string') return value.trim()
        return value
    },

    toLowerCase: (value: any): string => {
        if (typeof value === 'string') return value.toLowerCase()
        return value
    },

    toUpperCase: (value: any): string => {
        if (typeof value === 'string') return value.toUpperCase()
        return value
    },

    normalizeEmail: (value: any): string => {
        if (typeof value === 'string') {
            return value.trim().toLowerCase()
        }
        return value
    },

    removeSpecialChars: (value: any): string => {
        if (typeof value === 'string') {
            return value.replace(/[^a-zA-Z0-9\s]/g, '')
        }
        return value
    },

    onlyNumbers: (value: any): string => {
        if (typeof value === 'string' || typeof value === 'number') {
            return String(value).replace(/\D/g, '')
        }
        return value
    },
}
