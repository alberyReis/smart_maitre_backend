import { Optional } from "sequelize"

interface IClientAttributes {
    id: number
    name: string
    email: string
    password: string
    cpf: string
    createdAt?: Date
    updatedAt?: Date
}

interface IClientCreationAttributes extends Optional<IClientAttributes, 'id'> { }

export { 
    IClientAttributes,
    IClientCreationAttributes
}