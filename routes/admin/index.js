const express = require('express')
const Repo = require('../../controllers/dashboard')
const router = express.Router()
const passport = require("passport")
const jwt = require("jsonwebtoken")
const { checkUser } = require('../../controllers/Authentication')

router.get('/',(req,res)=>{
   res.json({products:10})
})

router.get("/products", async (req,res) => {
   const categorised = req.query.cat == "yes" ? true : false
   const products = categorised ?  await Repo.CategorisedProduct() : await Repo.AllProducts()
   res.json(products)
})

router.post("/category",passport.authenticate('jwt', {session: false}), async (req,res) => {
   const isCategory = await Repo.AddCategory(req.body)
   res.json(isCategory)
})

router.post("/products", passport.authenticate('jwt', {session: false}), async (req,res) => {
   const isProductAdded = await Repo.AddProduct(req.body)
   res.json(isProductAdded)
})

router.post("/addUser", async (req,res) => {
   console.log(req.body);
   const newUser = await Repo.AddUser(req.body)
   res.json(newUser)
})

router.post("/login", async (req,res)=>{
   try {
       const user = await checkUser(req.body)
       var payload = { 
           _id: user._id,
           email: user.email
       };

       console.log(payload);
       console.log(process.env.JWT_SECRET);
       var token = jwt.sign(payload, process.env.JWT_SECRET);
       res.json({ "message": "login successful", "token": token });
   } catch (error) {
       res.status(500).json({"message":error})
   }
})

router.post("/change-password", passport.authenticate('jwt', {session:false}) , async (req,res) => {
   let change = {msg :"hello"}
   res.json(change)
})

module.exports = router