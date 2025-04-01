// 菜单触发逻辑
const menu = document.querySelector('.float-menu');
const trigger = menu.querySelector('.menu-trigger');
const items = menu.querySelector('.menu-items');

// 切换菜单显示
trigger.addEventListener('click', (e) => {
  e.stopPropagation();
  items.classList.toggle('show');
});

// 点击外部关闭菜单
document.addEventListener('click', (e) => {
  if (!menu.contains(e.target)) {
    items.classList.remove('show');
  }
});

// 在点击事件处理中新增
trigger.addEventListener('click', (e) => {
  const position = e.target.closest('a')?.dataset.position || 'auto';
  adjustMenuPosition(position); // 📍新增函数调用
});

// 📍新增方向适配函数
function adjustMenuPosition(preferredPosition) {
  const triggerRect = trigger.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  
  // 自动判断逻辑
  if (preferredPosition === 'auto') {
    const spaceRight = viewportWidth - triggerRect.right;
    const spaceLeft = triggerRect.left;
    preferredPosition = spaceRight > spaceLeft ? 'right' : 'left';
  }

  items.classList.remove('left', 'right');
  items.classList.add(preferredPosition);
  
  // 移动端强制居中
  if (window.innerWidth <= 768) {
    items.style.left = '50%';
    items.style.right = 'auto';
    items.style.transform = 'translateX(-50%)';
  }
}

// 移动端触摸支持
let touchStartY = 0;
trigger.addEventListener('touchstart', (e) => {
  touchStartY = e.touches[0].clientY;
});
trigger.addEventListener('touchend', (e) => {
  if (Math.abs(e.changedTouches[0].clientY - touchStartY) < 10) {
    items.classList.toggle('show');
  }
});
