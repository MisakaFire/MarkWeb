// 分类筛选功能
document.querySelectorAll('.category-filter button').forEach(button => {
  button.addEventListener('click', function() {
    // 移除所有激活状态
    document.querySelectorAll('.category-filter button').forEach(btn => {
      btn.classList.remove('active');
    });
    
    // 设置当前激活
    this.classList.add('active');
    const categoryId = this.dataset.category;

    // 显示对应分类
    document.querySelectorAll('.category-section').forEach(section => {
      section.style.display = 
        (categoryId === 'all' || section.dataset.category === categoryId) 
        ? 'block' 
        : 'none';
    });
  });
});
