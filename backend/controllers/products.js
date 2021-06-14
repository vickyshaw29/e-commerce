const Product = require('../models/product')
const _ = require('lodash')
exports.productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if (err) {
            return res.status(404).json({ error: "product not found" })
        }
        req.profil = product
        next()
    })
}
// getting all the products with search functionality
// exports.getProducts = async (req, res) => {
//     const pageSize = 2
//     const page = Number(req.query.pageNumber) || 1
//     try {
//         const { search } = req.query
//         // console.log(search)
//         if (!search) {
//             var products = await Product.find()
//         } else {
//             products = await Product.find({
//                 ...search,
//                 name: { $regex: `${search}`, $options: "i" },
//             }) //getting all the words from the database
//         }
//         const count = await Product.countDocuments({ ...search }).limit(pageSize).skip(pageSize * (page - 1))
//         res.json({ products, page, pages: Math.ceil(count / pageSize) }) //serving the words
//     } catch (error) {
//         console.log(error)
//     }
// }





exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find()
        return res.status(200).json(products)
    } catch (error) {
        console.log(error)
    }
}
exports.singleProduct = async (req, res, id) => {
    try {
        const product = await Product.findById(req.params.id)
        // console.log(product)
        if (!product) {
            return res.status(400).json({ error: "product not found" })
        }
        return res.status(200).json(product)
    } catch (error) {
        res.json({ error: "product not found" })
    }
}
// delete products by the admin
exports.deleteProductsByAdmin = async (req, res) => {
    let product = req.profil
    // console.log(product)
    if (product) {
        product.remove((err, resul) => {
            if (err) {
                return res.status(404).json({ message: 'Product not found' })
            }
            return res.status(200).json({ message: 'Product deleted successfully' })
        })
    }
}
// update product by the admin
exports.updateProductsByAdmin = (req, res) => {
    try {
        let product = req.profil
        // console.log(req.body)
        product = _.extend(product, req.body)
        product.updated = Date.now()
        product.save((err, product) => {
            if (err) {
                return res.status(404).json({ message: 'Product not found' })
            }
            return res.status(200).json(product)
        })
    } catch (error) {
        console.log(error)
    }
}
// create product by the admin
exports.createProduct = async (req, res) => {
    // console.log(req.body)
    try {
        let product = await new Product(req.body)
        console.log(req.body)
        product.save((err, product) => {
            if (err) {
                return res.status(401).json({error:err})
            }
            return res.status(200).json({ message: 'Product saved successfully' })
        })
    } catch (error) {
        console.log(error)
    }
}
// review product 
exports.reviewProduct = async (req, res) => {
    try {
        const { rating, comment, name, id } = req.body
        // console.log(id,'id from the client')
        const product = await Product.findById(req.params.id)
        if (product) {
            const alreadyReviewedId = product.reviews.find(r => r.user)
            const rId = alreadyReviewedId.user
            if (req.body.id.toString() === rId.toString()) {
                return res.status(403).json({ message: 'product already reviewed' })
            }
            const review = {
                name: req.body.name,
                rating: Number(rating),
                comment,
                user: req.user._id
            }
            product.reviews.push(review)
            product.numReviews = product.reviews.length
            product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length
            await product.save()
            res.status(201).json({ message: 'Review added' })
        }
    } catch (error) {
        console.log(error)
    }
}
// get top rated products
exports.getTopProducts=async(req,res)=>{
    const products=await Product.find({}).sort({rating:-1}).limit(3)
    return res.status(200).json(products)
}