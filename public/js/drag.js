import Sortable from 'sortablejs';

document.addEventListener('DOMContentLoaded', () => {
  // 初始化书签拖拽
  const grid = document.querySelector('.bookmarks-grid');
  
  new Sortable(grid, {
    animation: 150,
    ghostClass: 'dragging-ghost',
    onEnd: async (evt) => {
      const bookmarks = Array.from(grid.children);
      const orders = bookmarks.map((item, index) => ({
        id: item.dataset.id,
        order: index + 1
      }));

      try {
        await fetch('/bookmarks/sort', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ orders })
        });
        
        // 可视反馈
        evt.item.style.transform = 'scale(1)';
      } catch (error) {
        console.error('排序保存失败:', error);
        // 回退到原始位置
        grid.insertBefore(evt.item, grid.children[evt.oldIndex]);
      }
    }
  });
});
