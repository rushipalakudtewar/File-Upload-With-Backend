const mongoose = require('mongoose')
const nodemailer = require('nodemailer')

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String
    },
    tags:{
        type:String
    },
    email:{
        type:String
    }
})


fileSchema.post("save",async function(doc)
{
    try
    {
       
        const transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        })

        let info = await transporter.sendMail({
            from:`Codewithrushi`,
            to: doc.email,
            subject:"New file Uploaded on Cloudinary",
            html:`<h2>Hello ${doc.name}</h2> <p>File uploaded successfully</p> View here: <a href=${doc.imageUrl}>${doc.imageUrl}</a>`
        })

        // console.log("info",info);
    }
    catch(err)
    {
    console.log(err)        
    }
})


module.exports = mongoose.model('File',fileSchema)  