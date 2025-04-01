// ✅替换为以下内容
const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../app');
const Bookmark = require('../models/bookmark');
const Category = require('../models/category');

router.get('/', ensureAuthenticated, async (req, res) => {
  try {
    const bookmarks = await Bookmark.findAll({ 
      where: { UserId: req.user.id } 
    });
    const categories = await Category.findAll({
      where: { UserId: req.user.id }
    });
    res.render('admin', { bookmarks, categories });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});
  try {
    const bookmarks = await Bookmark.findAll();
    res.render('admin', { bookmarks });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
