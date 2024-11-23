const User = require('../models/USer');
const { sendToken } = require('../utils/jwtToken');
const upload = require('../utils/upload')

exports.register = async (req, res, next) => {

    try {
        req.body.images = await upload.multiplever2(req.files);

        const user = await User.create(req.body);
        console.log(user)

        res.json({
            message: "Image Uploaded!",
            success: true
        })
    } catch (error) {
        console.log(error)
        res.json({
            message: "System error occured!",
            success: false
        })
    }
}

exports.login = async (req, res, next) => {
    try {
        const { password, email } = req.body;

        const user = await User.findOne({ email: email});

        if(!user) {
            res.json ({
                message: "Email is not registered"
            })
        }

        if (!user.comparePassword(password)){
            return res.json({
                message: "Incorrect credentials"
            })
        }
        
        sendToken(user, res)

    }catch (error)
    {
        console.log(error)
        res.json ({
            message: "Error",
            success: false
        })
    }
}

exports.update = async (req, res, next) => {
    try {

        if (req.files) {
            req.body.images = await upload.multiplever2(req.files);
        } else {
            delete req.body.images
        }


        const user = await User.findByIdAndUpdate(req.params.id, req.body)

        res.json({
            message: "Successful",
            user: User
        })
        
    } catch (error) {
        console.log(error)
        res.json({
            message: "System error occured!",
            success: false
        })
    }
}