if(process.env.NODE_ENV!=='production'){
    require("dotenv").config()
}
const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const passport = require("passport");
const passportJWT = require("passport-jwt");
const morgan = require('morgan')
const port = process.env.PORT||3000
const session = require("express-session")
const cors = require("cors")

const userService = require("./controllers/Authentication")
const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
jwtOptions.secretOrKey = process.env.JWT_SECRET;

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    console.log('payload received', jwt_payload);

    if (jwt_payload) {
        next(null, { _id: jwt_payload._id, 
            userName: jwt_payload.userName}); 
    } else {
        next(null, false);
    }
});

passport.use(strategy);
app.use(passport.initialize());

app.use("/api/",require("./routes/index"))

mongoose.connect(process.env.MONGOURI, {useNewUrlParser: true, useUnifiedTopology: true},(err)=>{
    console.log("Connected Database");
    if(!err) app.listen(port, (req, res) => console.log(`App running at port ${port}`))
    else throw err
})