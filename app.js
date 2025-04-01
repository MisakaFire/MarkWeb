// 在app.js顶部添加
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
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

// 在中间件配置区域添加 ✅修改开始
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
require('./config/auth');

// 会话配置
app.use(session({
  secret: 'your_session_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// 添加用户全局变量
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
// ✅修改结束

// 路由配置
app.use('/', require('./routes/index'));
app.use('/bookmarks', require('./routes/bookmarks'));
app.use('/admin', require('./routes/admin'));

// 在现有路由配置前添加 ✅新增
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  req.flash('error', '请先登录');
  res.redirect('/login');
}

// 启动服务器
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
});

// 在现有路由配置后添加
app.use('/categories', require('./routes/categories'));
