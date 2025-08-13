import { OrderModel } from './OrderModel'
import { OrderItemModel } from './OrderItemModel'

OrderModel.hasMany(OrderItemModel, { foreignKey: 'orderId', as: 'items' })
OrderItemModel.belongsTo(OrderModel, { foreignKey: 'orderId' })
