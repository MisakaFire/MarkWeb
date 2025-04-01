const express = require('express');
const router = express.Router();
const multer = require('multer');
const { ensureAuthenticated } = require('../app');
const { Bookmark, Category } = require('../models');

// 在文件顶部新增
const { v4: uuidv4 } = require('uuid');

// 进度跟踪存储
const importTasks = new Map(); // 📍新增

const upload = multer({ 
  limits: { fileSize: 2 * 1024 * 1024 }, // 限制2MB
  fileFilter: (req, file, cb) => {
    file.mimetype === 'application/json' ? cb(null, true) : cb(new Error('仅支持JSON文件'))
  }
});

// 修改原导入路由 ✅替换开始
router.post('/import', ensureAuthenticated, upload.single('bookmarksFile'), async (req, res) => {
  try {
    if (!req.file) throw new Error('未选择文件');
    
    const data = JSON.parse(req.file.buffer.toString());
    if (!data.bookmarks) throw new Error('文件格式不正确');

    // 创建导入任务
    const taskId = uuidv4(); // 📍新增
    importTasks.set(taskId, { 
      total: data.bookmarks.length,
      processed: 0,
      status: 'processing',
      userId: req.user.id 
    });

    // 异步处理导入
    processImport(taskId, data); // 📍修改

    res.json({ taskId }); // 📍修改返回方式
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// 新增进度查询接口 📍新增
router.get('/import/progress/:taskId', (req, res) => {
  const task = importTasks.get(req.params.taskId);
  res.json(task || { status: 'not_found' });
});

// 提取导入处理函数 📍新增
async function processImport(taskId, data) {
  const task = importTasks.get(taskId);
  
  try {
    const transaction = await sequelize.transaction();
    
    for (const [index, item] of data.bookmarks.entries()) {
      // ...原有处理逻辑保持不变...
      
      // 更新进度
      importTasks.set(taskId, { 
        ...task,
        processed: index + 1,
        progress: ((index + 1) / task.total * 100).toFixed(1)
      });
    }

    await transaction.commit();
    importTasks.set(taskId, { ...task, status: 'completed' });
  } catch (error) {
    await transaction.rollback();
    importTasks.set(taskId, { 
      ...task, 
      status: 'failed',
      error: error.message 
    });
  }
}
// ✅替换结束

module.exports = router;
