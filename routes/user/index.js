const express = require('express')
const Repo = require('../../controllers/dashboard')
const FrontRepo = require('../../controllers/frontController')
const router = express.Router()



router.get("/shop", async (req,res) => {
    const products = await Repo.Shop(req.query.search)
    res.json(products)
})

router.get("/product/:id", async (req,res)=>{
    try {
        console.log(req.params.id);
        const product = await FrontRepo.SingleProduct(req.params.id)
        res.json(product)
    } catch (error) {
        res.status(500).json(error)
    }
})
router.get("/newRelease", async (req,res)=>{
    try {
        const products = await FrontRepo.NewRelaeses()
        res.json(products)
    } catch (error) {
        res.status(500).json(error)
    }
}) 

module.exports = router