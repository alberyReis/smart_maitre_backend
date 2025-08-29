import { ClientModel } from "../models/ClientModel"

const clientRepository = {
  create: async (data: {
    name: string
    email: string
    password: string
    cpf: string
  }) => {
    return ClientModel.create(data)
  },

  findAll: async () => {
    return ClientModel.findAll()
  },

  findClientById: async (id: number) => {
    return ClientModel.findByPk(id)
  },

  updateClientEmailAndPasswordById: async (
    id: number,
    data: {
      email?: string;
      password?: string
    }
  ): Promise<boolean> => {
    const [updatedCount] = await ClientModel.update(data, { where: { id } })
    return updatedCount > 0
  },

  deleteClientById: async (id: number): Promise<boolean> => {
    const deletedCount = await ClientModel.destroy({ where: { id } })
    return deletedCount > 0
  },
}

export { clientRepository }