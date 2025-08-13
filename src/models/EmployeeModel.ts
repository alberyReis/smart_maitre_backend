import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '../database/database'

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

class EmployeeModel extends Model<IEmployeeAttributes, IEmployeeCreationAttributes> implements IEmployeeAttributes {
  public id!: number
  public name!: string
  public email!: string
  public password!: string
  public registration!: string
  public role!: 'manager' | 'cook' | 'waiter'
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

EmployeeModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    registration: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('manager', 'cook', 'waiter'),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'employees',
    timestamps: true,
  }
)

export {
  EmployeeModel
}
