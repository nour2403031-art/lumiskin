const User = require('../models/user');
const Product = require('../models/product');

// ── Show Dashboard ────────────────────────────────────────────────────────────
// This runs when someone visits /admin
// It fetches ALL users and ALL products from database
// Then sends them to admin.ejs to display
exports.getDashboard = async (req, res) => {
  // Must be logged in AND be admin
  if (!req.session.user) return res.redirect('/user/login');
  if (req.session.role !== 'admin') return res.redirect('/');

  try {
    const users    = await User.find();
    const products = await Product.find();
    res.render('admin', {
      user: req.session.user,
      users,
      products
    });
  } catch (err) {
    res.redirect('/');
  }
};

// ── Add Product ───────────────────────────────────────────────────────────────
// This runs when admin submits the "Add Product" form
// It takes the form data and saves it as a new product in database
exports.addProduct = async (req, res) => {
  try {
    const { name, brand, price, category, tag } = req.body;
    await Product.create({ name, brand, price, category, tag });
    res.redirect('/admin');
  } catch (err) {
    res.redirect('/admin');
  }
};

// ── Delete Product ────────────────────────────────────────────────────────────
// This runs when admin clicks "Delete" on a product
// :id in the URL tells us WHICH product to delete
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/admin');
  } catch (err) {
    res.redirect('/admin');
  }
};

// ── Delete User ───────────────────────────────────────────────────────────────
// This runs when admin clicks "Delete" on a user
// Same idea as delete product but for users
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/admin');
  } catch (err) {
    res.redirect('/admin');
  }
};

// ── Show Edit Product Page ────────────────────────────────────────────────────
// This runs when admin clicks "Edit" on a product
// It finds that specific product and sends it to editProduct.ejs
exports.getEditProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render('editProduct', { user: req.session.user, product });
  } catch (err) {
    res.redirect('/admin');
  }
};

// ── Save Edited Product ───────────────────────────────────────────────────────
// This runs when admin submits the edit form
// It finds the product by id and updates it with new values
exports.postEditProduct = async (req, res) => {
  try {
    const { name, brand, price, category, tag } = req.body;
    await Product.findByIdAndUpdate(req.params.id, { 
      name, 
      brand, 
      price, 
      category, 
      tag 
    });
    res.redirect('/admin');
  } catch (err) {
    res.redirect('/admin');
  }
};

// Show edit user page
exports.getEditUser = async (req, res) => {
  if (!req.session.user || req.session.role !== 'admin') return res.redirect('/user/login');
  try {
    const editUser = await User.findById(req.params.id);
    res.render('editUser', { user: req.session.user, editUser });
  } catch (err) {
    res.redirect('/admin');
  }
};

// Save edited user
exports.postEditUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    await User.findByIdAndUpdate(req.params.id, { name, email });
    res.redirect('/admin');
  } catch (err) {
    res.redirect('/admin');
  }
};