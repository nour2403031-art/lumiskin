const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

router.get('/', indexController.getHome);
router.get('/about', indexController.getAbout);
router.get('/products', indexController.getProducts);
router.get('/quiz', indexController.getQuiz);
router.get('/mythvsfact', indexController.getMythVsFact);
router.get('/cerave', indexController.getCerave);
router.get('/laroche', indexController.getLaroche);
router.get('/uriage', indexController.getUriage);

module.exports = router;
