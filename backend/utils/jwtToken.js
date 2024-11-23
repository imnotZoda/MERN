

const sendToken = (user, res) => {

    const token = user.getJwtToken();

    const options = {
        expires: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }

    res.cookie('token', token, options).json({
        user,
        success: true
    })
}

module.exports = {
    sendToken
}