const express = require('express');
const router = express.Router();
const admincontroller = require('../controllers/admincontroller');
const { requireLogin } = require('../middleware/auth');

// Admin page requires login
router.get('/', requireLogin, admincontroller.getDashboard);

module.exports = router;
