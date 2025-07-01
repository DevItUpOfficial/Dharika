const Product = require('../models/Product');
const productService = require('../services/products/productService');


//implementing the get products throught the Id param
const getProductById = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            message: 'Product ID is required'
        });
    }

    try{
        const product = await Product.findOne({_id: id});
        if (!product){
            return res.status(404).json({
                message: 'Product not found'
            })
        }
        return res.status(200).json({
            message: 'Product fetched successfully',
            product: product
        });
    }

    catch(error){
        return res.status(500).json({
            message: 'Error Fetching product',
            error: error.message
        })
    }
}


//implementing the get related products through the ID param // Added the pagination and limit 
const getRelatedProducts = async (req, res) => {
    const { sku } = req.params;
    
    try{
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;

        const { products, total } = await productService.getProductsByCategory(sku, limit, page);

        if (products.length === 0) {
            return res.status(404).json({
                message: 'No related products found'
            });
        }

        return res.status(200).json({
            message: 'Related products fetched successfully',
            products: products,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        });
    }
    catch(error){
        return res.status(500).json({
            message: 'Error Fetching related products',
            error: error.message
        })
    }
}

//Writing the search products function // Added pagination and limit
const searchProducts = async (req, res) => {
    const { query, category, minPrice, maxPrice, } = req.query;
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;
    
    let searchCriteria = {};

    if (query){
        searchCriteria.$or = [
            {name: {$regex: query, $options: 'i'}},
            {description: {$regex: query, $options: 'i'}},
            {tags: {$regex: query, $options: 'i'}}
        ];
    }

    if (category){
        searchCriteria.categoryId = category;
    }

    if(minPrice || maxPrice){
        searchCriteria.price = {};
        if (minPrice){
            searchCriteria.price.$gte = Number(minPrice);
        }

        if (maxPrice){
            searchCriteria.price.$lte = Number(maxPrice);
        }
    }
    try{
        const { products, total } = await productService.searchProducts(searchCriteria, skip, limit);
        res.json(
            {
                products: products,
                message: 'Products fetched successfully',
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit)
                }
            }
        )
    }

    catch(error){
        return res.status(500).json({
            message: 'Error Searching products by query',
            error: error.message
        })
    }    
} 


//Implemention to get all the features of products // Added pagination and limit
const getFeaturedProducts = async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const skip = (page-1) * limit;

    const total = await Product.countDocuments({ isActive: true});

    try{
        const products = await Product.find({ isActive: true}).sort({ createdAt: -1}).skip(skip).limit(limit);

        const total = await Product.countDocuments({ isActive: true});

        if (products.length === 0){
            return res.status(404).json({
                message: 'No featured products found'
            });
        }

        return res.status(200).json({
            message: 'Featured products fetched successfully',
            products: products,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        });
    }
    catch(error){
        return res.status(500).json({
            message: 'Error Fetching featured products',
            error: error.message
        });
    }
} 


//exporting the functions 
module.exports = {
    getProductById,
    getRelatedProducts,
    searchProducts,
    getFeaturedProducts
}