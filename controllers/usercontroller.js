const User = require('../models/user');

exports.getLogin = (req, res) => {
  res.render('login', { user: req.session.user || '', error: '' });
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  const found = await User.findOne({ email, password });
  if (found) {
    req.session.user = found.name;
    req.session.userId = found._id.toString();
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

// GET /user/cart/data — returns the logged-in user's cart as JSON
exports.getCartData = async (req, res) => {
  if (!req.session.userId) {
    return res.json({ loggedIn: false, cart: [] });
  }
  const user = await User.findById(req.session.userId).select('cart');
  res.json({ loggedIn: true, cart: user ? user.cart : [] });
};

// POST /user/cart/save — saves the full cart array to MongoDB
exports.saveCart = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not logged in' });
  }
  const { cart } = req.body;
  if (!Array.isArray(cart)) {
    return res.status(400).json({ error: 'Invalid cart data' });
  }
  await User.findByIdAndUpdate(req.session.userId, { cart });
  res.json({ success: true });
};