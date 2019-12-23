const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    made_in: {
        type: String,
        required: false,
        default: "Unknown"
    },
    isDisplayed: {
        type: Boolean,
        required: false,
        default: true
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

module.exports.CategorySchema = categorySchema;
module.exports.Category = mongoose.model("Category", categorySchema);
