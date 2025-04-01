async function loadBookmarks() {
  showLoading(); // 📍新增
  try {
    const res = await fetch('/api/bookmarks');
    // ...原有处理逻辑...
  } finally {
    hideLoading(); // 📍新增
  }
}
