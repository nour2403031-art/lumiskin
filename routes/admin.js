const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admincontroller');
const { requireLogin } = require('../middleware/auth');

// Admin page requires login
router.get('/', requireLogin, adminController.getDashboard);

module.exports = router;
