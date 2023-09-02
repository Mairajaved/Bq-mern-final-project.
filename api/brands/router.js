const app = require('express')
const router = app.Router()

const { AddBrand, getAllBrands, brandByID, updateBrand, deleteBrand,brandByName } = require('./controller')

router.post('/add-brand', AddBrand)
router.get('/brandbyid/:_id', brandByID)
router.get('/brandbyname/:BrandName', brandByName)
router.get('/get-all-brands', getAllBrands)
router.put('/update-brand', updateBrand)
router.delete('/delete-brand', deleteBrand)


module.exports = router