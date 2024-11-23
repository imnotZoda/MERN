const mongoose = require('mongoose');

const categoryModel = new mongoose.Schema({

    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },

    shipping_method: {
        type:String,
        required: true,
    },

    payment_method: {
        type:String,
        required: true,
    },

    contact_number: {
        type:String,
        required: true,
    },

    order_items: [{
        product: {
            type:  mongoose.Schema.ObjectId,
            ref: 'Product',
        },
        quantity: {
            type: Number,
            required: true,
        }
    }],

    status: {
        type:  String,
        required: true,
        default: 'Pending',
    }
    
}, { timestamps: true })

module.exports = mongoose.model('Order', categoryModel)