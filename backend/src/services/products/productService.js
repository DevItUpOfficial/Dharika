const Product = require('../../models/Products');

const searchProducts = async (searchCriteria, req, res) => {
    const products = await Product.find(searchCriteria)
        .sort({createdAt: -1})
        .skip(skip)
        .limit(limit)

    const total = await Product.countDocuments(searchCriteria);
    return { products, total };
};


module.exports = {
    searchProducts
}