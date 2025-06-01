const express = require('express');
const router = express.Router();
const FoodItem = require('../models/FoodItem');

// Fixed categories
const CATEGORIES = [
  'Lunch Box',
  'ဟင်းပွဲ',
  'မြန်မာ အစားအစာ',
  'တရုတ် အစားအစာ',
  'အသုပ်',
  'အချိုရည်',
  'Add On'
];

// Get all food items
router.get('/', async (req, res) => {
  try {
    const foodItems = await FoodItem.findAll();
    res.json(foodItems);
  } catch (error) {
    console.error('Error fetching food items:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get food items by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    if (!CATEGORIES.includes(category)) {
      return res.status(400).json({ error: 'Invalid category' });
    }
    const foodItems = await FoodItem.findAll({
      where: { category }
    });
    res.json(foodItems);
  } catch (error) {
    console.error('Error fetching food items by category:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get list of categories
router.get('/categories', async (req, res) => {
  try {
    res.json(CATEGORIES);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create food item
router.post('/', async (req, res) => {
  try {
    const { name, category, price, description } = req.body;
    if (!CATEGORIES.includes(category)) {
      return res.status(400).json({ error: 'Invalid category' });
    }
    const foodItem = await FoodItem.create({
      name,
      category,
      price,
      description
    });
    res.status(201).json(foodItem);
  } catch (error) {
    console.error('Error creating food item:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update food item
router.put('/:id', async (req, res) => {
  try {
    const { name, category, price, description } = req.body;
    if (category && !CATEGORIES.includes(category)) {
      return res.status(400).json({ error: 'Invalid category' });
    }
    const foodItem = await FoodItem.findByPk(req.params.id);
    if (!foodItem) {
      return res.status(404).json({ error: 'Food item not found' });
    }
    await foodItem.update({ name, category, price, description });
    res.json(foodItem);
  } catch (error) {
    console.error('Error updating food item:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete food item
router.delete('/:id', async (req, res) => {
  try {
    const foodItem = await FoodItem.findByPk(req.params.id);
    if (!foodItem) {
      return res.status(404).json({ error: 'Food item not found' });
    }
    await foodItem.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting food item:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;