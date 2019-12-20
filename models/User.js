const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    fullname : {
        type: String,
        required: false
    },
    role : {
        type: Number,
        required: true,
        default: 2
    },
    created_date : {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;