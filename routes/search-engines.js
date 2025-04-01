const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../app');
const SearchEngine = require('../models/search-engine');

// 获取所有引擎
router.get('/', ensureAuthenticated, async (req, res) => {
  try {
    const engines = await SearchEngine.findAll({
      where: { 
        [Op.or]: [
          { UserId: req.user.id },
          { isDefault: true }
        ]
      }
    });
    res.json(engines);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// 创建引擎
router.post('/', ensureAuthenticated, async (req, res) => {
  try {
    await SearchEngine.create({
      ...req.body,
      UserId: req.user.id
    });
    res.redirect('/admin/search-engines');
  } catch (error) {
    console.error(error);
    res.status(500).send('创建失败');
  }
});

// 删除引擎
router.delete('/:id', ensureAuthenticated, async (req, res) => {
  try {
    await SearchEngine.destroy({
      where: { 
        id: req.params.id,
        UserId: req.user.id 
      }
    });
    res.redirect('/admin/search-engines');
  } catch (error) {
    console.error(error);
    res.status(500).send('删除失败');
  }
});
