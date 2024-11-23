const cloudinary = require("cloudinary");
const firebase = require('./firebase')

const multiple = async (files) => {
    let imagesData = [];

    for (let i = 0; i < files.length; i++) {


        const data = await cloudinary.v2.uploader.upload(files[i].path);

        imagesData.push({

            public_id: data.public_id,

            url: data.url,
        })
    };
    return imagesData;
}

const multiplever2 = async (files) => {
    let imagesData = [];

    const bucket = firebase.storage().bucket();

    for (let i = 0; i < files.length; i++) {


        const uploadResponse = await bucket.upload(files[i].path, {
            contentType: files[i].mimetype
        })

        const file = uploadResponse[0]

        const url = await file.getSignedUrl({
            action: 'read',
            expires: '03-17-2025'
        })
        imagesData.push({

            public_id: file.name,

            url: url[0],
        })
    };
    return imagesData;
}

module.exports = {
    multiple,
    multiplever2
}