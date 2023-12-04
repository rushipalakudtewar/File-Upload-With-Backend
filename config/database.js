const mongoose = require('mongoose')

const connectDB = () =>{
    mongoose.connect(`${process.env.MONGO_URL}`,{
        useUnifiedTopology:true,
        useNewUrlParser:true
    }).then((data)=>{
        console.log(`Mongodb connected on ${data.connection.host}`);
    }).catch((err)=>{
        console.log(`Failed to connect ${err}`);
    })
}
module.exports = connectDB