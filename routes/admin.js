const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Visit /admin → show dashboard with all products and users
router.get('/', adminController.getDashboard);

// Admin submits add product form → save to database
router.post('/add-product', adminController.addProduct);

// Admin clicks delete on a product → remove from database
router.get('/delete-product/:id', adminController.deleteProduct);

// Admin clicks delete on a user → remove from database
router.get('/delete-user/:id', adminController.deleteUser);

// Admin clicks edit on a product → show edit page
router.get('/edit-product/:id', adminController.getEditProduct);

// Admin submits edit form → update in database
router.post('/edit-product/:id', adminController.postEditProduct);

router.get('/edit-user/:id', adminController.getEditUser);
router.post('/edit-user/:id', adminController.postEditUser);

module.exports = router;