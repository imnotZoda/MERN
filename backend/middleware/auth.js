const User = require('../models/USer');
const jwt = require('jsonwebtoken')
const admin = require('../utils/firebase')

exports.isAuthenticated = async (req, res, next) => {
    if (req.headers.authorization) {
        req.cookies = {
            token: req.headers.authorization.split(" ")[1]
        }

    }
    const token = req.cookies?.token


    if (!token) {
        return res.status(401).json({ message: "Log in First" })
    }

    const data = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findById(data.id);

    next()

}

exports.isAuthenticatedV2 = async (req, res, next) => {

    const token = req.headers.authorization.split(" ")[1]

    if (!token) {
        return res.status(401).json({ message: "Log in First" })
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);

        const { email } = decodedToken;

        req.user = await User.findOne({ email: email });

        console.log(req.user);

        next();

    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
    
}