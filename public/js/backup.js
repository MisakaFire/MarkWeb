document.getElementById('testConnection').addEventListener('click', async () => {
  const formData = new FormData(document.querySelector('form'));
  const response = await fetch('/backup/test-webdav', {
    method: 'POST',
    body: formData
  });
  
  if (response.ok) {
    alert('连接成功！');
  } else {
    alert('连接失败，请检查配置');
  }
});
