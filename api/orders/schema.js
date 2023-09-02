const { Schema, model } = require('mongoose')

const OrdersSchema = new Schema({
    customerName: {
        type: String,
        required: true,
    },

    customerEmail: {
        type: String,
        required: true,
    },
    customerId: {
        type: String,
        required: true,
    },
    customerContact: {
        type: String,
        required: true,
    },
    customerAddress: {
        type: String,
        required: true,
    },
    order: {
        type: Array,
        required: true,
    },
    totalBill: {
        type: Number,
        required: true
    },
    order_at: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: "pending"
    },

    StatusMessage: {
        type: String,
        default: "Order Placed Successfully, Please Track your Order after 48 Hours"
    }
})

const Orders = model('order', OrdersSchema)
module.exports = Orders