require('dotenv').config();
const { Sequelize, Op } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    dialectOptions: {
      ssl: { require: true, rejectUnauthorized: false }
    },
    logging: false
  }
);

async function test() {
  try {
    // List all tables
    const [tables] = await sequelize.query(`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`);
    console.log('Tables in database:');
    console.log(tables);
    
    // Check all orders from tam_orders
    const [allOrders] = await sequelize.query('SELECT id, status, created_at FROM tam_orders LIMIT 10');
    console.log('\nAll orders (first 10):');
    console.log(allOrders);
    
    // Check completed orders
    const [completed] = await sequelize.query(`SELECT id, status, created_at FROM tam_orders WHERE status = 'Completed' LIMIT 5`);
    console.log('\nCompleted orders:');
    console.log(completed);
    
    // Check order items
    const [orderItems] = await sequelize.query('SELECT * FROM tam_order_items LIMIT 5');
    console.log('\nOrder Items (first 5):');
    console.log(orderItems);
    
    process.exit(0);
  } catch (e) {
    console.error('Error:', e.message);
    process.exit(1);
  }
}

test();
