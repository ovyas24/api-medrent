const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT||3000

mongoose.connect("YOUR_MONGO_CONNECTION_STRING_HERE", {useNewUrlParser: true, useUnifiedTopology: true},(err)=>{
    console.log("Connected Database");
    if(!err) app.listen(port, (req, res) => console.log(`App running at port ${port}`))
    else throw err
})