const express = require('express');
const app = express();
const routes = require('./routes/tasks');
const connectDB = require('./database/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error');

//middleware
app.use(express.static('./public'));
app.use(express.json());


//routes
app.use('',routes);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_DB_URL);
        app.listen(port,console.log(`App listening at http://localhost:${port}`));
    }
    catch (err) {
        console.log(err);
    }
}
start();