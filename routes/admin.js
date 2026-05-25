const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { requireLogin } = require('../middleware/auth');

// Admin page requires login
router.get('/', requireLogin, adminController.getDashboard);

module.exports = router;
