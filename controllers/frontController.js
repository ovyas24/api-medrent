const Category = require("../model/category");
const Product = require("../model/product");

class FrontRepo {
    constructor() { }
    async SingleProduct(id) {
        try {
            const pro = await Product.findOne({ _id: id })
            const cat = await Category.findOne({ products: { $in: [id] } })
            let { _id, name, price, description, image, date } = pro
            let catname = cat.name, catdesc = cat.description, catid = cat._id
            const product = {
                _id, name, price, description, image, date,
                catname,
                catdesc,
                catid
            }
            return product

        } catch (error) {
            console.log(error);
            return error
        }
    }



    async NewRelaeses() {
        const products = Product.find().limit(4).sort({ $natural: -1 })
        return products
    }
}

module.exports = new FrontRepo()