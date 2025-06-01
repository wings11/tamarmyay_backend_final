// const express = require('express');
// const router = express.Router();
// const Order = require('../models/Order');
// const FoodItem = require('../models/FoodItem');
// const OrderItem = require('../models/OrderItem');
// const { Op } = require('sequelize');

// // Create or update order
// router.post('/', async (req, res) => {
//   try {
//     const { orderType, tableNumber, buildingName, customerName, items } = req.body;

//     // Validate input
//     if (!orderType || !items || items.length === 0) {
//       return res.status(400).json({ error: 'Order type and items are required' });
//     }

//     // For dine-in, ensure tableNumber is provided
//     if (orderType === 'dine-in' && !tableNumber) {
//       return res.status(400).json({ error: 'Table number is required for dine-in orders' });
//     }

//     // For delivery, ensure customerName or buildingName is provided if needed
//     if (orderType === 'delivery' && (!customerName || !buildingName)) {
//       return res.status(400).json({ error: 'Customer name and building name are required for delivery orders' });
//     }

//     // Check for existing "In Process" order
//     let order;
//     if (orderType === 'dine-in') {
//       order = await Order.findOne({
//         where: {
//           orderType,
//           tableNumber,
//           status: 'In Process',
//         },
//         include: [{
//           model: FoodItem,
//           as: 'FoodItems',
//           through: { attributes: ['quantity'] },
//         }],
//       });
//     } else {
//       // For delivery, you might want to match by customerName or buildingName
//       // Adjust this logic based on your requirements
//       order = await Order.findOne({
//         where: {
//           orderType,
//           customerName,
//           buildingName,
//           status: 'In Process',
//         },
//         include: [{
//           model: FoodItem,
//           as: 'FoodItems',
//           through: { attributes: ['quantity'] },
//         }],
//       });
//     }

//     if (order) {
//       // Existing order found, append items
//       for (const item of items) {
//         const existingItem = order.FoodItems.find(fi => fi.id === item.foodItem.id);
//         if (existingItem) {
//           // Update quantity if item already exists
//           const orderItem = await OrderItem.findOne({
//             where: {
//               order_id: order.id,
//               food_item_id: item.foodItem.id,
//             },
//           });
//           if (orderItem) {
//             await orderItem.update({ quantity: orderItem.quantity + item.quantity });
//           }
//         } else {
//           // Add new item
//           await OrderItem.create({
//             order_id: order.id,
//             food_item_id: item.foodItem.id,
//             quantity: item.quantity,
//           });
//         }
//       }
//       // Refresh order to include updated items
//       await order.reload({
//         include: [{
//           model: FoodItem,
//           as: 'FoodItems',
//           through: { attributes: ['quantity'] },
//         }],
//       });
//     } else {
//       // Create new order
//       order = await Order.create({
//         orderType,
//         tableNumber: orderType === 'dine-in' ? tableNumber : null,
//         buildingName: orderType === 'delivery' ? buildingName : null,
//         customerName: orderType === 'delivery' ? customerName : null,
//         status: 'In Process',
//       });
//       for (const item of items) {
//         await OrderItem.create({
//           order_id: order.id,
//           food_item_id: item.foodItem.id,
//           quantity: item.quantity,
//         });
//       }
//       // Fetch the order with items
//       await order.reload({
//         include: [{
//           model: FoodItem,
//           as: 'FoodItems',
//           through: { attributes: ['quantity'] },
//         }],
//       });
//     }

//     res.status(201).json(order);
//   } catch (error) {
//     console.error('Error creating or updating order:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // Get orders by status, table number, or order type
// router.get('/', async (req, res) => {
//   try {
//     const { status, tableNumber, orderType } = req.query;
//     const where = {};
//     if (status) where.status = status;
//     if (tableNumber) where.tableNumber = tableNumber;
//     if (orderType) where.orderType = orderType;
//     const orders = await Order.findAll({
//       where,
//       include: [{
//         model: FoodItem,
//         as: 'FoodItems',
//         through: { attributes: ['quantity'] },
//       }],
//     });
//     res.json(orders);
//   } catch (error) {
//     console.error('Error fetching orders:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // Update order status and payment method
// router.put('/:id', async (req, res) => {
//   try {
//     const { status, paymentMethod, customerNote } = req.body;
//     const order = await Order.findByPk(req.params.id);
//     if (!order) return res.status(404).json({ error: 'Order not found' });
//     await order.update({ status, paymentMethod, customerNote });
//     res.json(order);
//   } catch (error) {
//     console.error('Error updating order:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // Delete an order by ID
// router.delete('/:id', async (req, res) => {
//   try {
//     const order = await Order.findByPk(req.params.id);
//     if (!order) return res.status(404).json({ error: 'Order not found' });

//     // Delete associated order items first
//     await OrderItem.destroy({ where: { order_id: order.id } });

//     // Delete the order
//     await order.destroy();

//     res.json({ message: 'Order deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting order:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // Get order history
// router.get('/history', async (req, res) => {
//   try {
//     const { startDate, endDate, status } = req.query;
//     const where = {};
//     if (status) where.status = status;
//     if (startDate && endDate) {
//       where.createdAt = {
//         [Op.between]: [new Date(startDate), new Date(endDate)],
//       };
//     }
//     const orders = await Order.findAll({
//       where,
//       include: [{
//         model: FoodItem,
//         as: 'FoodItems',
//         through: { attributes: ['quantity'] },
//       }],
//       order: [['createdAt', 'DESC']],
//     });
//     res.json(orders);
//   } catch (error) {
//     console.error('Error fetching order history:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;




const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const FoodItem = require('../models/FoodItem');
const OrderItem = require('../models/OrderItem');
const AdminPin = require('../models/AdminPin');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

// Create or update order
router.post('/', async (req, res) => {
  try {
    const { orderType, tableNumber, buildingName, customerName, items } = req.body;

    // Validate input
    if (!orderType || !items || items.length === 0) {
      return res.status(400).json({ error: 'Order type and items are required' });
    }

    // For dine-in, ensure tableNumber is provided
    if (orderType === 'dine-in' && !tableNumber) {
      return res.status(400).json({ error: 'Table number is required for dine-in orders' });
    }

    // For delivery, ensure customerName or buildingName is provided if needed
    if (orderType === 'delivery' && (!customerName || !buildingName)) {
      return res.status(400).json({ error: 'Customer name and building name are required for delivery orders' });
    }

    // Check for existing "In Process" order
    let order;
    if (orderType === 'dine-in') {
      order = await Order.findOne({
        where: {
          orderType,
          tableNumber,
          status: 'In Process',
        },
        include: [{
          model: FoodItem,
          as: 'FoodItems',
          through: { attributes: ['quantity'] },
        }],
      });
    } else {
      order = await Order.findOne({
        where: {
          orderType,
          customerName,
          buildingName,
          status: 'In Process',
        },
        include: [{
          model: FoodItem,
          as: 'FoodItems',
          through: { attributes: ['quantity'] },
        }],
      });
    }

    if (order) {
      // Existing order found, append items
      for (const item of items) {
        const existingItem = order.FoodItems.find(fi => fi.id === item.foodItem.id);
        if (existingItem) {
          const orderItem = await OrderItem.findOne({
            where: {
              order_id: order.id,
              food_item_id: item.foodItem.id,
            },
          });
          if (orderItem) {
            await orderItem.update({ quantity: orderItem.quantity + item.quantity });
          }
        } else {
          await OrderItem.create({
            order_id: order.id,
            food_item_id: item.foodItem.id,
            quantity: item.quantity,
          });
        }
      }
      await order.reload({
        include: [{
          model: FoodItem,
          as: 'FoodItems',
          through: { attributes: ['quantity'] },
        }],
      });
    } else {
      // Create new order
      order = await Order.create({
        orderType,
        tableNumber: orderType === 'dine-in' ? tableNumber : null,
        buildingName: orderType === 'delivery' ? buildingName : null,
        customerName: orderType === 'delivery' ? customerName : null,
        status: 'In Process',
      });
      for (const item of items) {
        await OrderItem.create({
          order_id: order.id,
          food_item_id: item.foodItem.id,
          quantity: item.quantity,
        });
      }
      await order.reload({
        include: [{
          model: FoodItem,
          as: 'FoodItems',
          through: { attributes: ['quantity'] },
        }],
      });
    }

    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating or updating order:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get orders by status, table number, or order type
router.get('/', async (req, res) => {
  try {
    const { status, tableNumber, orderType } = req.query;
    const where = {};
    if (status) where.status = status;
    if (tableNumber) where.tableNumber = tableNumber;
    if (orderType) where.orderType = orderType;
    const orders = await Order.findAll({
      where,
      include: [{
        model: FoodItem,
        as: 'FoodItems',
        through: { attributes: ['quantity'] },
      }],
    });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update order status and payment method
router.put('/:id', async (req, res) => {
  try {
    const { status, paymentMethod, customerNote } = req.body;
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    await order.update({ status, paymentMethod, customerNote });
    res.json(order);
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete an order by ID
router.delete('/:id', async (req, res) => {
  try {
    const { pin } = req.body;
    if (!pin) return res.status(400).json({ error: 'PIN is required for deletion' });

    const adminPin = await AdminPin.findOne({ order: [['createdAt', 'DESC']] });
    if (!adminPin) return res.status(500).json({ error: 'PIN not configured' });

    const isMatch = await bcrypt.compare(pin, adminPin.pin);
    if (!isMatch) return res.status(401).json({ error: 'Invalid PIN' });

    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    await OrderItem.destroy({ where: { order_id: order.id } });
    await order.destroy();

    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get order history
router.get('/history', async (req, res) => {
  try {
    const { startDate, endDate, status } = req.query;
    const where = {};
    if (status) where.status = status;
    if (startDate && endDate) {
      where.createdAt = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      };
    }
    const orders = await Order.findAll({
      where,
      include: [{
        model: FoodItem,
        as: 'FoodItems',
        through: { attributes: ['quantity'] },
      }],
      order: [['createdAt', 'DESC']],
    });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching order history:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
