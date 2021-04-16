const mongoose = require("mongoose")
const Schema = mongoose.Schema

const catSchema = new Schema({
    name : { type:String, required:true },
    description: { type:String },
    products:[{type:Schema.ObjectId, ref:'Product'}],
    date:{type:Date,default:Date.now()}
})

module.exports = mongoose.model("Category",catSchema)