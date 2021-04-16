const mongoose = require("mongoose")
const Schema = mongoose.Schema

const orderSchema = new Schema({
    by : { type:String, required:true },
    mobile: { type:Number, required:true, unique:true  },
    email:{ type:String },
    products:{type:Array},
    date:{type:Date,default:Date.now()}
})

module.exports = mongoose.model("Order",orderSchema)