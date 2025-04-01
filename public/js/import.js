document.querySelector('#import-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const progressContainer = document.getElementById('import-progress');
  const progressBar = progressContainer.querySelector('.progress');
  const progressText = progressContainer.querySelector('.progress-text');
  const statusMessage = progressContainer.querySelector('.status-message');

  // 重置状态
  progressContainer.style.display = 'block';
  progressBar.style.width = '0%';
  progressText.textContent = '0%';
  statusMessage.textContent = '开始导入...';

  try {
    // 提交导入请求
    const response = await fetch('/bookmarks/import', {
      method: 'POST',
      body: formData
    });
    
    const { taskId } = await response.json();
    
    // 轮询进度
    const checkProgress = setInterval(async () => {
      const res = await fetch(`/bookmarks/import/progress/${taskId}`);
      const progress = await res.json();
      
      switch(progress.status) {
        case 'processing':
          progressBar.style.width = `${progress.progress}%`;
          progressText.textContent = `${progress.progress}%`;
          statusMessage.textContent = `正在导入 ${progress.processed}/${progress.total}...`;
          break;
          
        case 'completed':
          clearInterval(checkProgress);
          statusMessage.textContent = `✅ 成功导入 ${progress.total} 条书签`;
          setTimeout(() => location.reload(), 2000);
          break;
          
        case 'failed':
          clearInterval(checkProgress);
          statusMessage.innerHTML = `❌ 导入失败: ${progress.error}`;
          break;
      }
    }, 1000);

  } catch (error) {
    statusMessage.textContent = `❌ 请求失败: ${error.message}`;
  }
});
