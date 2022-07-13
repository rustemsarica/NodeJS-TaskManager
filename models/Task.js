const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    status: {
        type: Boolean,
        default: false
    }
}
);

module.exports = mongoose.model('Task', TaskSchema);