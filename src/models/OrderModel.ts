import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '../database/database'

interface IOrderAttributes {
  id: number
  tableNumber: number
  status: 'pending' | 'preparing' | 'ready' | 'served' | 'cancelled'
  total: number
  createdAt?: Date
  updatedAt?: Date
}

interface IOrderCreationAttributes extends Optional<IOrderAttributes, 'id' | 'status' | 'total'> {}

class OrderModel extends Model<IOrderAttributes, IOrderCreationAttributes> implements IOrderAttributes {
  public id!: number
  public tableNumber!: number
  public status!: 'pending' | 'preparing' | 'ready' | 'served' | 'cancelled'
  public total!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

OrderModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    tableNumber: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'preparing', 'ready', 'served', 'cancelled'),
      allowNull: false,
      defaultValue: 'pending',
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: 'orders',
    timestamps: true,
  }
)

export {
  OrderModel
}
