import { v2 as cloundinary } from 'cloudinary';
import Product from '../models/product.js';

// Add product> /api/product/add
export const addProduct = async (req, res) => {
    try {
        const productData = JSON.parse(req.body.productData)

        const images = req.files

        const imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloundinary.uploader.upload(item.path,
                    { resource_type: 'image' });
                return result.secure_url
            })
        )

        await Product.create({ ...productData, images: imagesUrl })

        res.json({ success: true, message: "Product Added" })

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// Get product: /api/product/list
export const productList = async (req, res) => {
    try {
        const products = await Product.find({})
        res.json({ success: true, products })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// Get single product: /api/product/id
export const productById = async (req, res) => {
    try {
        const { id } = req.body;
        const product = await Product.findById(id)
        res.json({ sucess: true, product })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

// Add product: /api/product/stock
export const changeStock = async (req, res) => {
    try {
        const { id, inStock } = req.body;
        await Product.findByIdAndUpdate(id, { inStock })
        res.json({ success: true, message: "Stock Updated" })
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}