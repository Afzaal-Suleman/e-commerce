const express = require('express')
const router = express.Router()
const { createProduct, fetchAllProduct, fetchByCategories, fetchCategories, fetchProductById, editProduct, fetchBrands } = require('../controllers/Product');

router.post('/', createProduct)
router.get('/allproduct', fetchAllProduct)
router.get('/allCategories', fetchByCategories)
router.get('/getAllcategories', fetchCategories)
router.get('/fetchProductById/:id', fetchProductById)
router.put('/editProduct', editProduct)
router.get('/fetchallhbrand', fetchBrands)



exports.router = router;
