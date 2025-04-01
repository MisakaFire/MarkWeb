const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const { Sequelize } = require('sequelize');
const app = express();

// 数据库配置
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// 中间件配置
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// 路由配置
app.use('/', require('./routes/index'));
app.use('/bookmarks', require('./routes/bookmarks'));
app.use('/admin', require('./routes/admin'));

// 启动服务器
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
});

// 在现有路由配置后添加
app.use('/categories', require('./routes/categories'));
