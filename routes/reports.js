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
      // Parse dates properly - append time to ensure correct parsing
      const start = new Date(`${startDate}T00:00:00.000Z`);
      const end = new Date(`${endDate}T23:59:59.999Z`);
      
      console.log('Date filter - Start:', start.toISOString(), 'End:', end.toISOString());
      
      where.createdAt = {
        [Op.between]: [start, end]
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
    
    console.log('Found orders:', orders.length);

    let totalRevenue = 0;
    const paymentMethods = { Cash: 0, Card: 0, Mobile: 0 };
    const orderCount = orders.length;

    // Track food item sales
    const foodItemSales = {};

    for (const order of orders) {
      let orderTotal = 0;
      for (const item of order.FoodItems) {
        const quantity = item.OrderItem?.quantity || 0;
        orderTotal += item.price * quantity;
        
        // Aggregate food item sales
        if (foodItemSales[item.id]) {
          foodItemSales[item.id].quantitySold += quantity;
          foodItemSales[item.id].totalRevenue += item.price * quantity;
        } else {
          foodItemSales[item.id] = {
            id: item.id,
            name: item.name,
            price: item.price,
            quantitySold: quantity,
            totalRevenue: item.price * quantity
          };
        }
      }
      totalRevenue += orderTotal;
      if (order.paymentMethod) {
        paymentMethods[order.paymentMethod] = (paymentMethods[order.paymentMethod] || 0) + orderTotal;
      }
    }

    // Convert to array and sort by quantity sold (descending)
    const topSellingItems = Object.values(foodItemSales)
      .sort((a, b) => b.quantitySold - a.quantitySold);

    res.json({
      totalRevenue: totalRevenue.toFixed(2),
      orderCount,
      paymentMethods,
      orders,
      topSellingItems
    });
  } catch (error) {
    console.error('Error generating sales report:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;