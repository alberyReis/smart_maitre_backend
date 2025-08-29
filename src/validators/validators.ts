import { ClientModel } from "../models/ClientModel"

export const validator = {
    isEmail: (...values: any[]): boolean => {
        return values.every(value => typeof value === 'string' && /^\S+@\S+\.\S+$/.test(value))
    },

    isNumber: (...values: any[]): boolean => {
        return values.every(value => typeof value === 'number' && !isNaN(value))
    },

    isPositiveNumber: (...values: any[]): boolean => {
        return values.every(value => typeof value === 'number' && value > 0)
    },

    isString: (...values: any[]): boolean => {
        return values.every(value => typeof value === 'string' && value.trim().length > 0)
    },

    isBoolean: (...values: any[]): boolean => {
        return values.every(value => typeof value === 'boolean')
    },

    isCpf: (...values: any[]): boolean => {
        return values.every(value => {
            if (typeof value !== 'string') return false
            const cleaned = value.replace(/\D/g, '')
            if (cleaned.length !== 11 || /^(\d)\1+$/.test(cleaned)) return false

            let sum = 0
            for (let i = 0; i < 9; i++) sum += parseInt(cleaned[i]) * (10 - i)
            let firstCheck = (sum * 10) % 11
            if (firstCheck === 10) firstCheck = 0
            if (firstCheck !== parseInt(cleaned[9])) return false

            sum = 0
            for (let i = 0; i < 10; i++) sum += parseInt(cleaned[i]) * (11 - i)
            let secondCheck = (sum * 10) % 11
            if (secondCheck === 10) secondCheck = 0
            return secondCheck === parseInt(cleaned[10])
        })
    },

    isPhoneNumber: (...values: any[]): boolean => {
        return values.every(value => typeof value === 'string' && /^\+?\d{8,15}$/.test(value))
    },

    isPasswordStrong: (...values: any[]): boolean => {
        return values.every(value => typeof value === 'string' && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value))
    },

    isNonEmptyArray: (...values: any[]): boolean => {
        return values.every(value => Array.isArray(value) && value.length > 0)
    },

    isNullOrEmpty: (...values: any[]): boolean => {
        return values.every(value => value !== null && value !== '')
    },

    checkEmailExists: async (email: string): Promise<boolean> => {
        const client = await ClientModel.findOne({ where: { email } })
        return client !== null
    },

    checkCpfExists: async (cpf: string): Promise<boolean> => {
        const client = await ClientModel.findOne({ where: { cpf } })
        return client !== null
    },
}
