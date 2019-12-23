const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate');
const { CategorySchema } = require("./Category");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    quantity: {
        type: String,
        required: false
    },
    price: {
        type: String,
        required: false
    },
    category: CategorySchema,
    inStock: {
        type: Boolean,
        default: true
    },
    created_date: {
        type: Date,
        default: Date.now
    }
}).plugin(mongoosePaginate);


const Product = mongoose.model("Product", productSchema);

module.exports = Product;
