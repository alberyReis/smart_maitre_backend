import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '../database/database'

interface IProductAttributes {
  id: number
  restaurantId: number
  name: string
  description?: string
  price: number
  createdAt?: Date
  updatedAt?: Date
}

interface IProductCreationAttributes extends Optional<IProductAttributes, 'id' | 'description'> {}

class ProductModel extends Model<IProductAttributes, IProductCreationAttributes> implements IProductAttributes {
  public id!: number
  public restaurantId!: number
  public name!: string
  public description?: string
  public price!: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

ProductModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    restaurantId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'products',
    timestamps: true,
  }
)

export {
  ProductModel
}
