// 在文件顶部新增
let isMuted = localStorage.getItem('muteSound') === 'true';
const clickSound = new Audio('/sounds/click.mp3');

// 修改点击事件处理
trigger.addEventListener('click', (e) => {
  playSound(); // 播放音效
  // ...原有逻辑...
});

// 新增二级菜单处理
document.querySelectorAll('.has-submenu').forEach(item => {
  item.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      item.classList.toggle('open');
      e.preventDefault();
    }
  });
});

// 新增音效控制函数
function playSound() {
  if (!isMuted) {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => { /* 处理自动播放限制 */ });
  }
}

// 新增偏好同步
function loadPreferences() {
  const direction = localStorage.getItem('menuDirection') || 'auto';
  document.documentElement.style.setProperty('--menu-direction', direction);
}

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
