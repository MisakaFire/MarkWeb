const express = require('express');
const router = express.Router();
const Category = require('../models/category');

// 获取所有分类
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// 创建分类
router.post('/', async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.redirect('/admin/categories');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// 删除分类
router.delete('/:id', async (req, res) => {
  try {
    await Category.destroy({ where: { id: req.params.id } });
    res.redirect('/admin/categories');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
