const User = require('../models/user');

// ── GET /user/login ───────────────────────────────────────────────────────────
exports.getLogin = (req, res) => {
  res.render('login', { user: req.session.user || '', error: '' });
};

// ── POST /user/login ──────────────────────────────────────────────────────────
exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.render('login', { user: '', error: 'Please fill in all fields.' });
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.render('login', { user: '', error: 'Please enter a valid email address.' });
  }

  try {
    const found = await User.findOne({ email: email.toLowerCase().trim() });

    if (!found) {
      return res.render('login', { user: '', error: 'Invalid email or password.' });
    }

    const isMatch = await found.comparePassword(password);
    if (!isMatch) {
      return res.render('login', { user: '', error: 'Invalid email or password.' });
    }

    req.session.user = found.name;
    req.session.userId = found._id.toString();
    res.redirect('/');

  } catch (err) {
    console.error('Login error:', err.message);
    res.render('login', { user: '', error: 'Something went wrong. Please try again.' });
  }
};

// ── GET /user/signup ──────────────────────────────────────────────────────────
exports.getSignup = (req, res) => {
  res.render('signup', { user: req.session.user || '', error: '' });
};

// ── POST /user/signup ─────────────────────────────────────────────────────────
exports.postSignup = async (req, res) => {
  const { fname, lname, email, password, confirmPassword } = req.body;

  // Check all fields exist
  if (!fname || !lname || !email || !password || !confirmPassword) {
    return res.render('signup', { user: '', error: 'All fields are required.' });
  }

  // Name validation
  if (fname.trim().length < 2) {
    return res.render('signup', { user: '', error: 'First name must be at least 2 characters.' });
  }

  if (lname.trim().length < 2) {
    return res.render('signup', { user: '', error: 'Last name must be at least 2 characters.' });
  }

  // Email validation
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.render('signup', { user: '', error: 'Please enter a valid email address.' });
  }

  // Password strength validation
  if (password.length < 8) {
    return res.render('signup', { user: '', error: 'Password must be at least 8 characters.' });
  }

  if (!/[A-Z]/.test(password)) {
    return res.render('signup', { user: '', error: 'Password must contain at least 1 uppercase letter.' });
  }

  if (!/\d/.test(password)) {
    return res.render('signup', { user: '', error: 'Password must contain at least 1 number.' });
  }

  // Confirm password
  if (password !== confirmPassword) {
    return res.render('signup', { user: '', error: 'Passwords do not match.' });
  }

  try {
    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.render('signup', { user: '', error: 'This email is already registered.' });
    }

    const name = `${fname.trim()} ${lname.trim()}`;
    await User.create({ name, email: email.toLowerCase().trim(), password });
    res.redirect('/user/login');

  } catch (err) {
    console.error('Signup error:', err.message);
    res.render('signup', { user: '', error: 'Something went wrong. Please try again.' });
  }
};

// ── GET /user/logout ──────────────────────────────────────────────────────────
exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) console.error('Logout error:', err.message);
    res.redirect('/');
  });
};

// ── GET /user/cart ────────────────────────────────────────────────────────────
exports.getCart = (req, res) => {
  res.render('cart', { user: req.session.user || '' });
};

// ── GET /user/cart/data ───────────────────────────────────────────────────────
exports.getCartData = async (req, res) => {
  if (!req.session.userId) {
    return res.json({ loggedIn: false, cart: [] });
  }
  try {
    const user = await User.findById(req.session.userId).select('cart');
    res.json({ loggedIn: true, cart: user ? user.cart : [] });
  } catch (err) {
    res.json({ loggedIn: false, cart: [] });
  }
};

// ── POST /user/cart/save ──────────────────────────────────────────────────────
exports.saveCart = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ error: 'Not logged in' });
  }
  const { cart } = req.body;
  if (!Array.isArray(cart)) {
    return res.status(400).json({ error: 'Invalid cart data' });
  }
  try {
    await User.findByIdAndUpdate(req.session.userId, { cart });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save cart' });
  }
};
