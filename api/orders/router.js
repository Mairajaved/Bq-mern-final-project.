const app = require('express')
const router = app.Router()
const { placeOrder, allOrders, trackOrder,updateOrder } = require('./controller')

router.post('/place-order', placeOrder)
router.get('/get-all-orders', allOrders)
router.get('/track-order/:_id', trackOrder)
router.put('/update-order', updateOrder)

module.exports = router
