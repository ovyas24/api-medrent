const express = require('express')
const Repo = require('../../controllers/dashboard')
const router = express.Router()



router.get("/shop", async (req,res) => {
    const products = await Repo.Shop(req.query.search)
    res.json(products)
})
router.get("/product/:id")
router.get("/newRelease") 

module.exports = router