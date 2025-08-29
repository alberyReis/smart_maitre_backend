import bcrypt from 'bcrypt'

import { validator } from '../validators/validators'
import { sanitizer } from '../validators/sanitizers'
import { clientRepository } from "../repositories/clientRepository.js"
import { httpResponse, IHttpResponse } from '../utils/httpResponse.js'
import { ValidationErrorMessages } from '../validators/validatorErrorMessages'

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

    if (!validator.isNullOrEmpty(name, email, password, cpf)) {
      response = httpResponse.badRequest(ValidationErrorMessages.IS_NULL_OR_EMPTY)
      return response
    }

    if (!validator.isString(name, email, password, cpf)) {
      response = httpResponse.badRequest(ValidationErrorMessages.IS_STRING)
      return response
    }

    if (!validator.isEmail(email)) {
      response = httpResponse.badRequest(ValidationErrorMessages.IS_EMAIL)
      return response
    }

    if(await validator.checkEmailExists(email)) {
      response = httpResponse.badRequest(ValidationErrorMessages.IS_EMAIL_UNIQUE)
      return response
    }

    if (!validator.isPasswordStrong(password)) {
      response = httpResponse.badRequest(ValidationErrorMessages.IS_PASSWORD_STRONG)
      return response
    }

    if (!validator.isCpf(cpf)) {
      response = httpResponse.badRequest(ValidationErrorMessages.IS_CPF)
      return response
    }

    if(await validator.checkCpfExists(cpf)) {
      response = httpResponse.badRequest(ValidationErrorMessages.IS_CPF_UNIQUE)
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

      response = httpResponse.ok('user successfully created', body)
      return response
    } catch (error: any) {
      response = httpResponse.badRequest('an error occurred while creating the user')
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

      response = httpResponse.ok('', body)
      return response
    } catch (error: any) {
      response = httpResponse.serverError('')
      return response
    }
  },

  getClientById: async (id: number): Promise<IHttpResponse> => {
    let response = null

    if (isNaN(id)) {
      response = httpResponse.badRequest('')
      return response
    }

    try {
      const client = await clientRepository.findClientById(id)

      if (!client) {
        response = httpResponse.notFound('')
        return response
      }

      const body = {
        id: client.id,
        name: client.name,
        email: client.email,
      }

      response = httpResponse.ok('', body)
      return response
    } catch (error: any) {
      response = httpResponse.serverError('')
      return response
    }
  },

  updateClientEmailAndPasswordById: async (id: number, data: { email?: string; password?: string }): Promise<IHttpResponse> => {
    let response = null

    if (isNaN(id)) {
      response = httpResponse.badRequest('')
      return response
    }

    if (!data.email && !data.password) {
      response = httpResponse.badRequest('')
      return response
    }

    try {
      const updateData: any = {}

      if (data.email) {
        updateData.email = data.email
      }

      if (data.password) {
        const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS)
        updateData.password = hashedPassword
      }

      const updated = await clientRepository.updateClientEmailAndPasswordById(id, updateData)

      if (!updated) {
        response = httpResponse.notFound('')
        return response
      }

      response = httpResponse.ok('')
      return response
    } catch (error: any) {
      response = httpResponse.serverError('')
      return response
    }
  },

  deleteClient: async (id: number): Promise<IHttpResponse> => {
    let response = null

    if (isNaN(id)) {
      response = httpResponse.badRequest('')
      return response
    }

    const clientDeleted = await clientRepository.deleteClientById(id)

    try {
      if (clientDeleted) {
        response = httpResponse.ok('')
        return response
      } else {
        response = httpResponse.notFound('')
        return response
      }
    } catch (error) {
      response = httpResponse.serverError('')
      return response
    }
  },
}
