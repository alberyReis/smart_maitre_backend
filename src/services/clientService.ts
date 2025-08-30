import bcrypt from 'bcrypt'

import { validator } from '../validators/validators'
import { sanitizer } from '../validators/sanitizers'
import { clientRepository } from "../repositories/clientRepository.js"
import { httpResponse, IHttpResponse } from '../utils/httpResponse.js'
import { ValidationMessage } from '../validators/validatorMessages'

const SALT_ROUNDS = 10

export const clientService = {
    createUser: async (data: {
        name: string
        email: string
        password: string
        cpf: string
    }): Promise<IHttpResponse> => {
        let response = null

        let name = sanitizer.removeSpecialChars(data.name)
        name = sanitizer.trim(name)

        let email = sanitizer.normalizeEmail(data.email)
        sanitizer.toLowerCase(email)
        sanitizer.trim(email)

        let password = sanitizer.trim(data.password)

        let cpf = sanitizer.removeSpecialChars(data.cpf)
        cpf = sanitizer.trim(cpf)

        if (!validator.isNullOrEmpty(name)) {
            response = httpResponse.badRequest(ValidationMessage.NAME_REQUIRED)
            return response
        }

        if (!validator.isString(name)) {
            response = httpResponse.badRequest(ValidationMessage.NAME_NOT_STRING)
            return response
        }

        if (!validator.isNullOrEmpty(email)) {
            response = httpResponse.badRequest(ValidationMessage.EMAIL_REQUIRED)
            return response
        }

        if (!validator.isString(email)) {
            response = httpResponse.badRequest(ValidationMessage.EMAIL_NOT_STRING)
            return response
        }

        if (!validator.isEmail(email)) {
            response = httpResponse.badRequest(ValidationMessage.EMAIL_INVALID)
            return response
        }

        if (await validator.checkEmailExists(email)) {
            response = httpResponse.badRequest(ValidationMessage.EMAIL_NOT_UNIQUE)
            return response
        }

        if (!validator.isNullOrEmpty(password)) {
            response = httpResponse.badRequest(ValidationMessage.PASSWORD_REQUIRED)
            return response
        }

        if (!validator.isString(password)) {
            response = httpResponse.badRequest(ValidationMessage.PASSWORD_NOT_STRING)
            return response
        }


        if (!validator.isPasswordStrong(password)) {
            response = httpResponse.badRequest(ValidationMessage.PASSWORD_INVALID)
            return response
        }

        if (!validator.isNullOrEmpty(cpf)) {
            response = httpResponse.badRequest(ValidationMessage.CPF_REQUIRED)
            return response
        }

        if (!validator.isString(cpf)) {
            response = httpResponse.badRequest(ValidationMessage.CPF_NOT_STRING)
            return response
        }


        if (!validator.isCpf(cpf)) {
            response = httpResponse.badRequest(ValidationMessage.CPF_INVALID)
            return response
        }

        if (await validator.checkCpfExists(cpf)) {
            response = httpResponse.badRequest(ValidationMessage.CPF_NOT_UNIQUE)
            return response
        }

        try {
            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

            const newUser = await clientRepository.create({
                name,
                email,
                cpf,
                password: hashedPassword
            })

            const body = {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
            }

            response = httpResponse.ok(ValidationMessage.USER_CREATED, body)
            return response
        } catch (error: any) {
            response = httpResponse.serverError(ValidationMessage.SERVER_ERROR)
            return response
        }
    },

    getAllClients: async (): Promise<IHttpResponse> => {
        let response = null

        try {
            const allClients = await clientRepository.findAll()

            const body = allClients.map((client) => ({
                id: client.id,
                name: client.name,
                email: client.email,
            }))

            if (body.length === 0) {
                response = httpResponse.notFound(ValidationMessage.NOT_FOUND)
                return response
            }

            response = httpResponse.ok(ValidationMessage.USER_CREATED, body)
            return response
        } catch (error: any) {
            response = httpResponse.serverError(ValidationMessage.SERVER_ERROR)
            return response
        }
    },

    getClientById: async (id: number): Promise<IHttpResponse> => {
        let response = null

        if (!validator.isNumber(id)) {
            response = httpResponse.badRequest(ValidationMessage.ID_NOT_NUMBER)
            return response
        }

        if (!validator.isPositiveNumber(id)) {
            response = httpResponse.badRequest(ValidationMessage.ID_NOT_POSITIVE)
            return response
        }

        if (!await validator.checkIdExists(id)) {
            response = httpResponse.badRequest(ValidationMessage.ID_NOT_FOUND)
            return response
        }

        try {
            const client = await clientRepository.findClientById(id)

            const body = {
                id: client?.id,
                name: client?.name,
                email: client?.email,
            }

            response = httpResponse.ok(ValidationMessage.USERS_FETCHED, body)
            return response
        } catch (error: any) {
            response = httpResponse.serverError(ValidationMessage.SERVER_ERROR)
            return response
        }
    },

    updateClientEmailAndPasswordById: async (id: number, data: { email?: string; password?: string }): Promise<IHttpResponse> => {
        let response = null

        let email = sanitizer.normalizeEmail(data.email)
        email = sanitizer.toLowerCase(email)
        email = sanitizer.trim(email)

        let password = sanitizer.trim(data.password)

        if (!validator.isNumber(id)) {
            response = httpResponse.badRequest(ValidationMessage.ID_NOT_NUMBER)
            return response
        }

        if (!validator.isPositiveNumber(id)) {
            response = httpResponse.badRequest(ValidationMessage.ID_NOT_POSITIVE)
            return response
        }

        if (!await validator.checkIdExists(id)) {
            response = httpResponse.badRequest(ValidationMessage.ID_NOT_FOUND)
            return response
        }

        if (!validator.isNullOrEmpty(email)) {
            response = httpResponse.badRequest(ValidationMessage.EMAIL_REQUIRED)
            return response
        }

        if (!validator.isString(email)) {
            response = httpResponse.badRequest(ValidationMessage.EMAIL_NOT_STRING)
            return response
        }

        if (!validator.isEmail(email)) {
            response = httpResponse.badRequest(ValidationMessage.EMAIL_INVALID)
            return response
        }

        if (await validator.checkEmailExists(email)) {
            response = httpResponse.badRequest(ValidationMessage.EMAIL_NOT_UNIQUE)
            return response
        }

        if (!validator.isNullOrEmpty(password)) {
            response = httpResponse.badRequest(ValidationMessage.PASSWORD_REQUIRED)
            return response
        }

        if (!validator.isString(password)) {
            response = httpResponse.badRequest(ValidationMessage.PASSWORD_NOT_STRING)
            return response
        }

        if (!validator.isPasswordStrong(password)) {
            response = httpResponse.badRequest(ValidationMessage.PASSWORD_INVALID)
            return response
        }

        try {
            const updateData: any = {}
            updateData.email = email
            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
            updateData.password = hashedPassword

            const clientUpdated = await clientRepository.updateClientEmailAndPasswordById(id, updateData)

            if (clientUpdated) {
                response = httpResponse.ok(ValidationMessage.EMAIL_PASSWORD_UPDATED)
                return response
            } else {
                response = httpResponse.notFound(ValidationMessage.NOT_FOUND)
                return response
            }
        } catch (error: any) {
            response = httpResponse.serverError(ValidationMessage.SERVER_ERROR)
            return response
        }
    },

    deleteClient: async (id: number): Promise<IHttpResponse> => {
        let response = null

        if (!validator.isNumber(id)) {
            response = httpResponse.badRequest(ValidationMessage.ID_NOT_NUMBER)
            return response
        }

        if (!validator.isPositiveNumber(id)) {
            response = httpResponse.badRequest(ValidationMessage.ID_NOT_POSITIVE)
            return response
        }

        if (!await validator.checkIdExists(id)) {
            response = httpResponse.badRequest(ValidationMessage.ID_REQUIRED)
            return response
        }

        try {
            const clientDeleted = await clientRepository.deleteClientById(id)

            if (clientDeleted) {
                response = httpResponse.ok(ValidationMessage.CLIENT_DELETED)
                return response
            } else {
                response = httpResponse.notFound(ValidationMessage.NOT_FOUND)
                return response
            }
        } catch (error) {
            response = httpResponse.serverError(ValidationMessage.SERVER_ERROR)
            return response
        }
    },
}
