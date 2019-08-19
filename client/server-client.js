const express = require('express');
const path = require('path');
const app = express();
const history = require('connect-history-api-fallback');

// 注意中间件顺序， 先用 history 实现重写(rewriting), 然后 在静态化内容
app.use(history({ 
    // verbose: true,
    index: '/index.html'
}));
app.use(express.static(__dirname + '/dist'));
app.listen(8000, () => console.log('app listening on port 8000!'))