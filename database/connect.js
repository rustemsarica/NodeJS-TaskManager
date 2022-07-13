const connectionString = 'mongodb+srv://task-manager:task-manager.97@cluster0.n3ukqce.mongodb.net/TaskManager?retryWrites=true&w=majority';

const mongoose = require('mongoose');

const connectDB = (url) => {
    return mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
}


module.exports = connectDB;