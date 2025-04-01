const express = require('express');
const router = express.Router();
const multer = require('multer');
const { ensureAuthenticated } = require('../app');
const { Bookmark, Category } = require('../models');

const upload = multer({ 
  limits: { fileSize: 2 * 1024 * 1024 }, // 限制2MB
  fileFilter: (req, file, cb) => {
    file.mimetype === 'application/json' ? cb(null, true) : cb(new Error('仅支持JSON文件'))
  }
});

// 导出书签
router.get('/export', ensureAuthenticated, async (req, res) => {
  try {
    const bookmarks = await Bookmark.findAll({
      where: { UserId: req.user.id },
      include: [Category]
    });
    
    const data = {
      meta: { exportedAt: new Date(), count: bookmarks.length },
      bookmarks: bookmarks.map(b => ({
        title: b.title,
        url: b.url,
        logo: b.logo,
        description: b.description,
        category: b.Category.name
      }))
    };

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename=bookmarks.json');
    res.send(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(error);
    res.status(500).send('导出失败');
  }
});

// 导入书签
router.post('/import', ensureAuthenticated, upload.single('bookmarksFile'), async (req, res) => {
  try {
    if (!req.file) throw new Error('未选择文件');
    
    const data = JSON.parse(req.file.buffer.toString());
    if (!data.bookmarks) throw new Error('文件格式不正确');

    const transaction = await sequelize.transaction();
    
    try {
      for (const item of data.bookmarks) {
        let category = await Category.findOne({
          where: { 
            name: item.category,
            UserId: req.user.id
          },
          transaction
        });
        
        if (!category) {
          category = await Category.create({
            name: item.category,
            UserId: req.user.id,
            color: '#666666'
          }, { transaction });
        }

        await Bookmark.create({
          ...item,
          UserId: req.user.id,
          CategoryId: category.id
        }, { transaction });
      }
      
      await transaction.commit();
      req.flash('success', `成功导入 ${data.bookmarks.length} 条书签`);
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
    
    res.redirect('/admin');
  } catch (error) {
    console.error(error);
    req.flash('error', error.message);
    res.redirect('/admin');
  }
});

module.exports = router;
