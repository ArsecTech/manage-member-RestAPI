const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
   first_name:String,
   last_name:String,
   mobile:String,
   email:String,
   wallet:{type:Number, default:0},
   createdAt:{type:Date, default:Date.now()},
   updateAt:{type:Date, default:Date.now()}
})

const userModel = mongoose.Model('user',userSchema)
module.exports = userModel