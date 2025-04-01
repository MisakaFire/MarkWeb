// 原固定引擎配置 ❌删除
// const engines = { baidu: '...', google: '...' };

// ✅替换为动态加载
let searchEngines = [];

async function loadSearchEngines() {
  try {
    const response = await fetch('/search-engines');
    searchEngines = await response.json();
    
    const select = document.getElementById('engine');
    select.innerHTML = searchEngines
      .map(engine => `<option value="${engine.id}">${engine.name}</option>`)
      .join('');
  } catch (error) {
    console.error('加载搜索引擎失败:', error);
  }
}

document.getElementById('searchForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const engineId = document.getElementById('engine').value;
  const keyword = document.getElementById('keyword').value;
  
  const engine = searchEngines.find(e => e.id == engineId);
  if (engine && keyword) {
    const searchUrl = engine.baseUrl.replace('{q}', encodeURIComponent(keyword));
    window.open(searchUrl, '_blank');
  }
});

// 初始化加载
loadSearchEngines();
