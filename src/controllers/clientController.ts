import { Request, Response } from 'express'
import { clientService } from '../services/clientService'

export const clientController = {
  createClient: async (req: Request, res: Response) => {
    const { name, email, password, cpf } = req.body
    const response = await clientService.createUser({ name, email, password, cpf })
    res.status(response.statusCode).json({
      message: response.message,
      data: response.body
    })
  },

  getAllClients: async (req: Request, res: Response) => {
    const response = await clientService.getAllClients()
    res.status(response.statusCode).json({
      message: response.message,
      data: response.body
    })
  },

  getClientById: async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const response = await clientService.getClientById(id)
    res.status(response.statusCode).json({
      message: response.message,
      data: response.body
    })
  },

  updateClientEmailAndPasswordById: async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const { email, password } = req.body
    const response = await clientService.updateClientEmailAndPasswordById(id, { email, password })
    res.status(response.statusCode).json({
      message: response.message,
      data: response.body
    })
  },

  deleteClient: async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const response = await clientService.deleteClient(id)
    res.status(response.statusCode).json({
      message: response.message,
      data: response.body
    })
  },
}