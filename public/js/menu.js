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
