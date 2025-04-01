const express = require('express');
const router = express.Router();
const Bookmark = require('../models/bookmark');

// 添加书签
router.post('/', async (req, res) => {
  try {
    await Bookmark.create(req.body);
    res.redirect('/admin');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// 删除书签
router.delete('/:id', async (req, res) => {
  try {
    await Bookmark.destroy({ where: { id: req.params.id } });
    res.redirect('/admin');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
