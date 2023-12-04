const express = require('express')
const app = express();
const dotenv = require('dotenv')
dotenv.config()

app.use(express.json())
const fileupload = require('express-fileupload')
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))

const connectDB= require('./config/database')
connectDB()
const cloudinaryconnect = require('./config/cloudinary')
cloudinaryconnect()
const Upload = require('./routes/fileroute')
app.use('/api/v1/upload',Upload)

const port = process.env.PORT || 6060;

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})