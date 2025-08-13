import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '../database/database'

interface IOrderItemAttributes {
  id: number
  orderId: number
  productId: number
  quantity: number
  price: number
  createdAt?: Date
  updatedAt?: Date
}

interface IOrderItemCreationAttributes extends Optional<IOrderItemAttributes, 'id'> {}

class OrderItemModel extends Model<IOrderItemAttributes, IOrderItemCreationAttributes> implements IOrderItemAttributes {
  public id!: number
  public orderId!: number
  public productId!: number
  public quantity!: number
  public price!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

OrderItemModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    orderId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'order_items',
    timestamps: true,
  }
)

export {
  OrderItemModel
}
