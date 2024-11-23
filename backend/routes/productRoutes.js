const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');

// const {create} = require ('../controllers/productController');

const productController = require ('../controllers/productController');
const { isAuthenticated } = require('../middleware/auth');

router.post('/create', upload.array('images'), productController.create);

router.put('/update/:id', upload.array('images'), productController.update)

router.get('/single/:id', isAuthenticated,  productController.getSingle)

router.get('/all', productController.all);

router.delete('/delete/:id',productController.delete);
module.exports = router;

