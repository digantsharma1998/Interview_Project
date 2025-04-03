const Product = require('../models/productModel');

exports.createProduct = async(req, res) => {
    const { name, description, price, category } = req.body;

    try {
        const product = await Product.create({ name, description, price, category });
        res.status(201).json(product);
    } catch(error) {
        res.status(500).json({ message: 'Product creation failed', error: error.message });
    }
};

exports.getAllProducts = async(req, res) => {
    try{
        const products = await Product.find();
        res.status(200).json(products);
    } catch(error) {
        res.status(500).json({ message: 'Failed to retrieve products', error: error.message });
    }
};

exports.getProductById = async(req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(400).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve product', error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    const { name, description, price, category } = req.body;

    try{
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { name, description, price, category },
            { new: true}
        );
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Product update failed', error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try{
        const product = await Product.findByIdAndDelete(req.params.id);
        if(!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message:'Product deletion failed', error: error.message });
    }
};