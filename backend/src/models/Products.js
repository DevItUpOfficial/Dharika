const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id:{
        type: String,
        require: true,
        unique: true
    },
    sku:{
        type: String,
        require: true,
        unique: true
    },
    name:{
        type: String,
        require: true,
    },
    description:{
        type: String
    },
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    basePrice:{
        type: Number,
        require: true,
    },
    salePrice:{
        type: Number
    },
    images:{
        type:[mongoose.Schema.Types.Mixed]
    },
    videoUrl:{
        type: String
    },
    isActive:{
        type:Boolean,
        requre: true
    },
    createdAt:{
        type: Date,
        default: Date.now 
    },
    updatedAt:{
        type: Date,
        default: Date.now
    },
    tags: {
        type: [String]
    }
});

productSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
