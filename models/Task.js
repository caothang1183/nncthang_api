const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: false
    },
    complete: {
        type: Boolean,
        required: true,
        default: false
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
