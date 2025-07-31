import { Optional } from "sequelize"

interface IEmployeeAttributes {
  id: number
  name: string
  email: string
  password: string
  registration: string
  role: 'manager' | 'cook' | 'waiter'
  createdAt?: Date
  updatedAt?: Date
}

interface IEmployeeCreationAttributes extends Optional<IEmployeeAttributes, 'id'> {}

export {
    IEmployeeAttributes,
    IEmployeeCreationAttributes
}

