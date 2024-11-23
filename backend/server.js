const app = require('./app')
const dotenv = require('dotenv');
const dbConnect = require('./config/dbConnect')
const cloudinary = require('cloudinary');

dotenv.config({ path: './.env' });

cloudinary.v2.config({

    cloud_name: 'dx4m0eac2',
    api_key: '632139211844815',
    api_secret: 'Mz3SsydxBS-V7YslHl56Szff51M'

})
dbConnect();

app.listen(process.env.PORT, () => {
    console.log(`Server Running: http://localhost:${process.env.PORT}`)
})

