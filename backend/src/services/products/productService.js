const Product = require('../../models/Product');

// this function searches for products based on various criteria
const searchProducts = async (searchCriteria, skip, limit) => {

    const products = await Product.find(searchCriteria)
        .sort({createdAt: -1})
        .skip(skip)
        .limit(limit)

    const total = await Product.countDocuments(searchCriteria);

    if (products.length === 0){
        return {
            error: true,
            status: 404,
            products: [],
            total: 0 | null,
            message: 'No products found matching to the search criteria'
        }
    }

    return { products, total };
};

// This function fetches products by category based on the base SKU
// It returns a paginated list of products that belong to the same category as the base product
const getProductsByCategory = async (baseSku , limit= 10, page = 1) => {
    const skip = (page-1) * limit;
    
    if(!baseSku) {
        return {
            error: true,
          message: 'Base SKU is required'  
        };
    }
    
    const baseProduct = await Product.findOne({sku: baseSku, isActive: true});
    if(!baseProduct) {
        return {
          error: true, 
          message: 'Base Product not found or it is not active '  
        };
    }


    // Fetch related products based on the base product's category
    // and excluding the base product itself

    const filter = {
        categoryId: baseProduct.categoryId,
        isActive: true,
        sku: { $ne: baseSku }
    }

    const relatedproducts = await Product.find(filter)
        .sort({createdAt: -1})
        .skip(skip)
        .limit(limit)

    const total = await Product.countDocuments(filter);
    return { products: relatedproducts, total };
}


module.exports = {
    searchProducts,
    getProductsByCategory
}