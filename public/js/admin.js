// 表单提交处理
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', function(e) {
    const btn = this.querySelector('button[type="submit"]');
    
    // 显示加载状态
    btn.innerHTML = `
      <span class="btn-loader"></span>
      ${btn.textContent}
    `;
    btn.disabled = true;
  });
});
