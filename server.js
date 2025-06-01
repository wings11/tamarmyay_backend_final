// require('dotenv').config();

// const express = require('express');
// const cors = require('cors');
// const authRoutes = require('./routes/auth');
// const itemsRoutes = require('./routes/items');
// const tablesRoutes = require('./routes/tables');
// const locationsRoutes = require('./routes/locations');
// const ordersRoutes = require('./routes/orders');

// const reportsRoutes = require('./routes/reports');
// const { sequelize } = require('./config/db');

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use('/api/auth', authRoutes);
// app.use('/api/items', itemsRoutes);
// app.use('/api/tables', tablesRoutes);
// app.use('/api/locations', locationsRoutes);
// app.use('/api/orders', ordersRoutes);

// app.use('/api/reports', reportsRoutes);

// const PORT = process.env.PORT || 5000;

// sequelize.sync().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
// }).catch((err) => {
//   console.error('Unable to connect to the database:', err);
// });


require('dotenv').config();

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const itemsRoutes = require('./routes/items');
const tablesRoutes = require('./routes/tables');
const locationsRoutes = require('./routes/locations');
const ordersRoutes = require('./routes/orders');
const pinRoutes = require('./routes/pin');
const reportsRoutes = require('./routes/reports');
const { sequelize } = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/items', itemsRoutes);
app.use('/api/tables', tablesRoutes);
app.use('/api/locations', locationsRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/pin', pinRoutes);
app.use('/api/reports', reportsRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});