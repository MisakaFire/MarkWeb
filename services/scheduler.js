const schedule = require('node-schedule');
const { BackupConfig } = require('../models');
const { performBackup } = require('./backup-service');

function initScheduler() {
  // 每天2:00执行备份检查
  schedule.scheduleJob('0 2 * * *', async () => {
    const configs = await BackupConfig.findAll();
    configs.forEach(config => {
      if(shouldBackup(config)) {
        performBackup(config.UserId);
      }
    });
  });
}

function shouldBackup(config) {
  const now = new Date();
  const diff = now - config.lastBackup;
  switch(config.frequency) {
    case 'daily': return diff > 24 * 3600 * 1000;
    case 'weekly': return diff > 7 * 24 * 3600 * 1000;
    case 'monthly': return diff > 30 * 24 * 3600 * 1000;
    default: return false;
  }
}
