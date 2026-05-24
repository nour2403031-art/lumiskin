const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');
const { requireLogin, redirectIfLoggedIn } = require('../middleware/auth');

// Logged-in users can't visit login or signup
router.get('/login', redirectIfLoggedIn, userController.getLogin);
router.post('/login', redirectIfLoggedIn, userController.postLogin);
router.get('/signup', redirectIfLoggedIn, userController.getSignup);
router.post('/signup', redirectIfLoggedIn, userController.postSignup);

// These pages require login
router.get('/logout', requireLogin, userController.logout);
router.get('/cart', requireLogin, userController.getCart);
router.get('/cart/data', requireLogin, userController.getCartData);
router.post('/cart/save', requireLogin, userController.saveCart);

module.exports = router;
