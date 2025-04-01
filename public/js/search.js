// 原提交事件监听 ❌删除
document.getElementById('searchForm').addEventListener('submit', function(e) {

// ✅替换为
document.getElementById('searchForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const searchBtn = this.querySelector('button[type="submit"]');
  const originalText = searchBtn.innerHTML;
  
  // 显示加载状态
  searchBtn.innerHTML = `
    <span class="btn-loader"></span>
    搜索中...
  `;
  searchBtn.disabled = true;

  try {
    // ...原有搜索逻辑保持不变...
  } finally {
    // 恢复按钮状态
    searchBtn.innerHTML = originalText;
    searchBtn.disabled = false;
  }
});
