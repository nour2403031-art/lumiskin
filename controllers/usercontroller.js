const User = require('../models/user');

exports.getLogin = (req, res) => {
  res.render('login', { user: req.session.user || '', error: '' });
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  const found = await User.findOne({ email, password });
  if (found) {
    req.session.user = found.name;
    res.redirect('/');
  } else {
    res.render('login', { user: '', error: 'Invalid email or password' });
  }
};

exports.getSignup = (req, res) => {
  res.render('signup', { user: req.session.user || '', error: '' });
};

exports.postSignup = async (req, res) => {
  const { fname, lname, email, password } = req.body;
  const name = fname + ' ' + lname;
  const existing = await User.findOne({ email });
  if (existing) {
    res.render('signup', { user: '', error: 'Email already registered' });
  } else {
    await User.create({ name, email, password });
    res.redirect('/user/login');
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

exports.getCart = (req, res) => {
  res.render('cart', { user: req.session.user || '' });
};