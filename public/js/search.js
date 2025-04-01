document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const engines = {
        baidu: 'https://www.baidu.com/s?wd=',
        google: 'https://www.google.com/search?q=',
        sogou: 'https://www.sogou.com/web?query=',
        onion: 'https://onion.example/search?q=',
        duckduckgo: 'https://duckduckgo.com/?q='
    };

    const engine = document.getElementById('engine').value;
    const keyword = document.getElementById('keyword').value;
    
    if (keyword) {
        window.open(`${engines[engine]}${encodeURIComponent(keyword)}`, '_blank');
    }
});
