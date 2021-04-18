const Product = require("../model/product")
const Category = require("../model/category")
const Admin = require("../model/admin")
const bcrypt = require("bcryptjs")
const { CreateUser, PasswordMatch } = require("../helpers/BaseRepo")

class Repo {
    constructor() { }

    AddCategory = async (body) => {
        try {
            const { name, description } = body
            const newCategory = new Category({
                name,
                description
            })

            const isAdded = await newCategory.save()
            return isAdded
        } catch (error) {
            return error
        }
    }

    AddProduct = async (body) => {
        try {
            const { name, price, description, image, id } = body
            const newProduct = new Product({
                name,
                price,
                description,
                image
            })

            const isProductAdded = await newProduct.save()
            if (isProductAdded) {
                const isCategoryUpdated = await Category.updateOne({ _id: id }, { $push: { products: isProductAdded._id } })
                return isCategoryUpdated
            }
        } catch (error) {
            return error
        }
    }

    DeleteProduct = async (cid, id) => {
        try {
            const isProductDelete = await Product.deleteOne({ _id: id })
            const isPulledFromCat = await Category.updateOne({ _id: cid }, { $pull: { products: id } })

            return { isProductDelete, isPulledFromCat }
        } catch (error) {
            return error
        }
    }

    AllProducts = async () => {
        try {
            const productsData = await Product.find({})
            const products = []

            for(var i =0; i < productsData.length ; i++){
                const cat = await Category.findOne({ products: { $in: [productsData[i]._id] } })
                let { _id,name, price, description, image, date } = productsData[i]
                let catname = cat.name, catdesc = cat.description, catid = cat._id
                const product = {
                    _id,name, price, description, image, date,
                    catname,
                    catdesc,
                    catid
                }

                console.log(product);
                products.push(product)
            }

            console.log("prodcuts", products);
            return products

        } catch (error) {
            console.log(error);
            return error
        }
    }

    Shop = async (search) => {
        try {
            const products = await this.AllProducts()
            if (search) {
                let searchedProduct = products.filter((product) => {
                    if (product.name.includes(search)) return product
                })
                return searchedProduct
            }
            return products
        } catch (error) {
            return error
        }
    }

    CategorisedProduct = async () => {
        try {
            const products = await Category.find({}).populate('products').exec()
            return products
        } catch (error) {
            return error
        }
    }

    //User Control
    AddUser = async (body) => {
        try {
            const newUser = await CreateUser(body)
            return newUser
        } catch (error) {
            return error
        }
    }

    ChangePassword = async (body) => {
        try {
            const isMatch = await PasswordMatch(body)
            if (isMatch) {
                console.log("dash-break");
                const hash = await bcrypt.hash(body.npassword, 10)
                const result = Admin.updateOne({ email: body.email }, { password: hash })
                return result
            }
            return null
        } catch (error) {
            return error
        }
    }
}


module.exports = new Repo()