import { ClientModel } from "../models/ClientModel"

export const validator = {
    isEmail: (value: any): boolean => {
        return typeof value === 'string' && /^\S+@\S+\.\S+$/.test(value)
    },

    isNumber: (value: any): boolean => {
        return typeof value === 'number' && !isNaN(value)
    },

    isPositiveNumber: (value: any): boolean => {
        return typeof value === 'number' && value > 0
    },

    isString: (value: any): boolean => {
        return typeof value === 'string' && value.trim().length > 0
    },

    isBoolean: (value: any): boolean => {
        return typeof value === 'boolean'
    },

    isCpf: (value: any): boolean => {
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
    },

    isPhoneNumber: (value: any): boolean => {
        return typeof value === 'string' && /^\+?\d{8,15}$/.test(value)
    },

    isPasswordStrong: (value: any): boolean => {
        return typeof value === 'string' && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value)
    },

    isNonEmptyArray: (value: any): boolean => {
        return Array.isArray(value) && value.length > 0
    },

    isNullOrEmpty: (value: any): boolean => {
        return value !== null && value !== ''
    },

    checkEmailExists: async (email: string): Promise<boolean> => {
        const client = await ClientModel.findOne({ where: { email } })
        return client !== null
    },

    checkCpfExists: async (cpf: string): Promise<boolean> => {
        const client = await ClientModel.findOne({ where: { cpf } })
        return client !== null
    },

    checkIdExists: async (id: number): Promise<boolean> => {
        const client = await ClientModel.findOne({ where: { id } })
        return client !== null
    },
}
