import bcrypt from 'bcrypt'

import { clientRepository } from "../repositories/clientRepository.js"
import { httpResponse, IHttpResponse } from '../utils/httpResponseUtils.js'

const SALT_ROUNDS = 10

export const clientService = {
  createUser: async (data: {
    name: string
    email: string
    password: string
    cpf: string
  }): Promise<IHttpResponse> => {
    let response = null

    try {
      const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS)

      const newUser = await clientRepository.create({
        ...data,
        password: hashedPassword
      })

      const body = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      }

      response = httpResponse.ok(body)
      return response
    } catch (error: any) {
      response = httpResponse.badRequest()
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

      response = httpResponse.ok(body)
      return response
    } catch (error: any) {
      response = httpResponse.serverError()
      return response
    }
  },

  getClientById: async (id: number): Promise<IHttpResponse> => {
  let response = null

  if (isNaN(id)) {
    response = httpResponse.badRequest()
    return response
  }

  try {
    const client = await clientRepository.findClientById(id)

    if (!client) {
      response = httpResponse.notFound()
      return response
    }

    const body = {
      id: client.id,
      name: client.name,
      email: client.email,
    }

    response = httpResponse.ok(body)
    return response
  } catch (error: any) {
    response = httpResponse.serverError()
    return response
  }
},

  updateClientEmailAndPasswordById: async (id: number, data: { email?: string; password?: string }): Promise<IHttpResponse> => {
    let response = null

    if (isNaN(id)) {
      response = httpResponse.badRequest()
      return response
    }

    if (!data.email && !data.password) {
      response = httpResponse.badRequest()
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
        response = httpResponse.notFound()
        return response
      }

      response = httpResponse.ok()
      return response
    } catch (error: any) {
      response = httpResponse.serverError()
      return response
    }
  },

  deleteClient: async (id: number): Promise<IHttpResponse> => {
    let response = null

    if (isNaN(id)) {
      response = httpResponse.badRequest()
      return response
    }

    const clientDeleted = await clientRepository.deleteClientById(id)

    try {
      if (clientDeleted) {
        response = httpResponse.ok()
        return response
      } else {
        response = httpResponse.notFound()
        return response
      }
    } catch (error) {
      response = httpResponse.serverError()
      return response
    }
  },
}
