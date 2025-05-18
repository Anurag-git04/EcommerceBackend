const mongoose = require('mongoose')
require('dotenv').config()

const MongoUri = process.env.MONGODB 
console.log(MongoUri)

const connectDB = async()=>{
    try{
        await mongoose.connect(MongoUri)
        console.log(`Mongo DB Connected`)
    }catch(error){
        console.log("Error while connecting mongo DB: ", error)
        process.exit(1)
    }
}

module.exports = connectDB