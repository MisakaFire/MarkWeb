const express = require('express');
const router = express.Router();
const passport = require('passport');

// 登录页面
router.get('/login', (req, res) => {
  res.render('login', { message: req.flash('error') });
});

// 登录提交
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

// 注册页面
router.get('/register', (req, res) => {
  res.render('register', { message: req.flash('error') });
});

// 注册提交
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    await User.create({ email, password });
    res.redirect('/login');
  } catch (error) {
    req.flash('error', '注册失败: 邮箱已被使用');
    res.redirect('/register');
  }
});

// 退出登录
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
