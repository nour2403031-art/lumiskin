const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/login', userController.getLogin);
router.post('/login', userController.postLogin);
router.get('/signup', userController.getSignup);
router.post('/signup', userController.postSignup);
router.get('/logout', userController.logout);
router.get('/cart', userController.getCart);
router.get('/cart/data', userController.getCartData);
router.post('/cart/save', userController.saveCart);

module.exports = router;