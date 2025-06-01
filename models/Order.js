const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const FoodItem = require('./FoodItem');
const Table = require('./Table');
const Location = require('./Location');
const OrderItem = require('./OrderItem');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  orderType: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['dine-in', 'delivery']]
    },
    field: 'order_type'
  },
  tableNumber: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'table_number'
  },
  buildingName: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'building_name'
  },
  customerName: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'customer_name'
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'In Process',
    validate: {
      isIn: [['In Process', 'Completed']]
    }
  },
  paymentMethod: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isIn: [['Cash', 'Card', 'Mobile', null]]
    },
    field: 'payment_method'
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.fn('NOW'),
    field: 'created_at'
  }
}, {
  tableName: 'tam_orders',
  timestamps: false
});

Order.belongsTo(Table, { foreignKey: 'tableNumber', targetKey: 'tableNumber' });
Order.belongsTo(Location, { foreignKey: 'buildingName', targetKey: 'buildingName' });
Order.belongsToMany(FoodItem, {
  through: OrderItem,
  foreignKey: 'order_id',
  otherKey: 'food_item_id',
  as: 'FoodItems'
});

Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'OrderItems' });
FoodItem.hasMany(OrderItem, { foreignKey: 'food_item_id' });

module.exports = Order;