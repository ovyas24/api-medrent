const Product = require("../model/product")
const Category = require("../model/category")
const Admin = require("../model/admin")
const order = require("../model/order")
const { CreateUser, hashPassword } = require("../helpers/BaseRepo")

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

    AllProducts = async () => {
        try {
            const products = await Product.find({})
            return products
        } catch (error) {
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
}

module.exports = new Repo()