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

// 书签排序
router.put('/sort', async (req, res) => {
  try {
    const { orders } = req.body;
    
    await Promise.all(
      orders.map(({ id, order }) => 
        Bookmark.update({ order }, { where: { id } })
    );
    
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).send('排序更新失败');
  }
});

module.exports = router;
