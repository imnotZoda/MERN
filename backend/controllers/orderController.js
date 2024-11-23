const { constants } = require('crypto');
const Order = require('../models/Orders')
const Product = require('../models/Product');
const Orders = require('../models/Orders');

exports.create = async (req, res, next) => {

    try {
        req.body.user = req.user._id
        const order = await Order.create(req.body);
        const orderItems = order.order_items

        for (index in orderItems) {
            const product = await Product.findById(orderItems[index].product)

            const updatedStock = product.stock_quantity - orderItems[index].quantity

            product.stock_quantity = updatedStock

            product.save()
        }

        res.json({
            message: "Order"
        })
    } catch (error) {
        console.log(error)
    }
}

exports.all = async (req, res, next) => {
    try {
        const orders = await Order.find()
            .populate({
                path: 'order_items.product',
                select: 'name images sell_price'
            })
            .populate({
                path: 'user',
                select: 'username email images',
            });

        res.json({
            message: "Order List",
            orders: orders,
        })
    } catch (error) {
        console.log(error)
    }
}

exports.updateStatus = async (req, res, next) => {

    try {
        const newStatus = req.body.status

        const order = await Order.findById(req.params.id)
        order.status = newStatus
        order.save()
        res.json({
            message: 'Order status updated',
            order: order,
        }) 

    }catch (err){
        console.log(err)
    }
}