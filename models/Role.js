const mongoose = require("mongoose");

const roleSchema = mongoose.Schema({
    role_type: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

module.exports.Role = mongoose.model("Role", roleSchema);
module.exports.RoleSchema =  roleSchema;