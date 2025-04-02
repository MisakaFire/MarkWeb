const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../app');
const { WebDAV } = require('webdav');
const { BackupConfig } = require('../models');

// WebDAV连接测试
router.post('/test-webdav', ensureAuthenticated, async (req, res) => {
  try {
    const client = createWebDAVClient(req.body);
    await client.getDirectoryContents('/');
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: '连接失败' });
  }
});

// 保存备份配置
router.post('/config', ensureAuthenticated, async (req, res) => {
  const encrypted = encryptData(req.body.password); // 加密函数需实现
  await BackupConfig.upsert({
    ...req.body,
    encryptedPassword: encrypted,
    UserId: req.user.id
  });
  res.redirect('/admin/backup');
});

// 触发立即备份
router.post('/trigger', ensureAuthenticated, async (req, res) => {
  await performBackup(req.user.id);
  res.redirect('/admin/backup?success=true');
});

// 创建WebDAV客户端
function createWebDAVClient(config) {
  return new WebDAV({
    endpoint: config.endpoint,
    username: config.username,
    password: decryptData(config.encryptedPassword) // 解密函数需实现
  });
}
