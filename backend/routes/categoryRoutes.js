const express = require('express');
const router = express.Router();

const { create, getCategory, getAllCategory, updateCategory, deleteCategory } = require('../controllers/categoryController')


router.post('/create', create );

router.get('/:id', getCategory);

router.get('/get/lahat', getAllCategory);

router.put('/update/:id', updateCategory);

router.delete('/delete/:id', deleteCategory)

module.exports = router;