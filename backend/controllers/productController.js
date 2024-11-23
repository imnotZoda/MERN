const Product = require('../models/Product');
const cloudinary = require('cloudinary');
const upload = require ('../utils/upload');



exports.create = async (req, res, next) => {

    try {

        req.body.images = await upload.multiple(req.files);


        const product = await Product.create(req.body);

        res.json({
            message: "Product sureball",
            product: product,
        })
    } catch (error) {
        console.log(error);
    }
}

exports.update = async (req, res, next) => {

    try {

        // console.log(req.body)
        // console.log(req.params)
        //console.log(req.files)

        const images = req.files;

        req.body.images = [];


        for (let i = 0; i < images.length; i++) {


            const data = await cloudinary.v2.uploader.upload(images[i].path);

            req.body.images.push({

                public_id: data.public_id,
                url: data.url,

            })
        };

        if (images.length === 0) {
            delete req.body.images
        }

        const product = await Product.findByIdAndUpdate(req.params.id, req.body);

        res.json({
            message: "Product Updated",
            product: product
        })

    } catch (error) {
        console.log(error);
    }
}

exports.getSingle = async (req, res, next) => {

    try {

        const product = await Product.findById(req.params.id)
            .populate({
                path: 'category',
                model: 'Category'

            });

        return res.json({
            message: "Data Available",
            product: product,
        })

    } catch (error) {

        console.log(error);
        return res.json({
            message: "Error",
            success: false,
        })

    }
}

exports.all = async (req, res, next) => {

    try {

        const products = await Product.find().populate({
            path: 'category',
            model: 'Category'

        })
        res.json({
            message: "Available Products",
            products: products,
        })
    } catch (error) {

        console.log(error);

        return res.json({
            message: "Error",
            success: false,
        })

    }
}

exports.delete = async (req, res, next) => {
    try {

        await Product.findByIdAndDelete(req.params.id);
        res.json({
            message: "Deleted Pare"
        })

    } catch (error) {

        console.log(error);
        return res.json({
            message: "Error",
            success: false,
        })
    }
}