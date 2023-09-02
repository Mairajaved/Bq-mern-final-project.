const app = require('express')
const router = app.Router()
const { AddReviews, getProducts, postProducts, ProductbyBrand, ProductbyCategory, ProductbyId,deletePro ,updatePro } = require('./controller')

router.get('/get-all-products', getProducts)
router.get('/get-product-by-id/:_id', ProductbyId)
router.get('/get-product-by-category/:category', ProductbyCategory)
router.get('/get-product-by-brand/:brand', ProductbyBrand)
router.post('/add-products', postProducts)
router.post('/add-reviews', AddReviews)
router.delete('/delete-products',deletePro )
router.put('/update-products', updatePro)

module.exports = router