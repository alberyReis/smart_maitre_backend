import { DataTypes, Model } from 'sequelize'
import { IEmployeeAttributes, IEmployeeCreationAttributes } from '../types/IEmployee'
import { sequelize } from '../database/database'

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
