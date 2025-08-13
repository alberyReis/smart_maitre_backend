import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '../database/database'

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

class ClientModel extends Model<IClientAttributes, IClientCreationAttributes> implements IClientAttributes {
    public id!: number
    public name!: string
    public email!: string
    public password!: string
    public cpf!: string
    public readonly createdAt!: Date
    public readonly updatedAt!: Date
}

ClientModel.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
        ,
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cpf: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'clients',
        timestamps: true,
    }
)

export {
    ClientModel
} 
