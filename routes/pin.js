const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AdminPin = require('../models/AdminPin');
const User = require('../models/User');
const authenticateToken = require('../middleware/authenticateToken'); // Assume you have middleware to verify JWT

// Middleware to check if user is admin
const isAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error('Error in isAdmin middleware:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Verify PIN
router.post('/verify', async (req, res) => {
  try {
    const { pin } = req.body;
    if (!pin) return res.status(400).json({ error: 'PIN is required' });

    const adminPin = await AdminPin.findOne({ order: [['createdAt', 'DESC']] });
    if (!adminPin) return res.status(500).json({ error: 'PIN not configured' });

    const isMatch = await bcrypt.compare(pin, adminPin.pin);
    if (!isMatch) return res.status(401).json({ error: 'Invalid PIN' });

    res.json({ message: 'PIN verified successfully' });
  } catch (error) {
    console.error('Error verifying PIN:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update PIN (Admin only)
router.put('/update', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { newPin } = req.body;
    if (!newPin) return res.status(400).json({ error: 'New PIN is required' });

    const hashedPin = await bcrypt.hash(newPin, 10);
    const adminPin = await AdminPin.findOne({ order: [['createdAt', 'DESC']] });

    if (adminPin) {
      await adminPin.update({ pin: hashedPin });
    } else {
      await AdminPin.create({ pin: hashedPin });
    }

    res.json({ message: 'PIN updated successfully' });
  } catch (error) {
    console.error('Error updating PIN:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;