const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const Order = require('../models/Order');
const FoodItem = require('../models/FoodItem');

// Get sales report
router.get('/sales', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const where = { status: 'Completed' };
    if (startDate && endDate) {
      where.createdAt = {
        [Op.between]: [new Date(startDate), new Date(endDate)]
      };
    }

    const orders = await Order.findAll({
      where,
      include: [{
        model: FoodItem,
        as: 'FoodItems',
        through: { attributes: ['quantity'] }
      }]
    });

    let totalRevenue = 0;
    const paymentMethods = { Cash: 0, Card: 0, Mobile: 0 };
    const orderCount = orders.length;

    for (const order of orders) {
      let orderTotal = 0;
      for (const item of order.FoodItems) {
        orderTotal += item.price * (item.OrderItem?.quantity || 0);
      }
      totalRevenue += orderTotal;
      if (order.paymentMethod) {
        paymentMethods[order.paymentMethod] = (paymentMethods[order.paymentMethod] || 0) + orderTotal;
      }
    }

    res.json({
      totalRevenue: totalRevenue.toFixed(2),
      orderCount,
      paymentMethods,
      orders
    });
  } catch (error) {
    console.error('Error generating sales report:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;