const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config();
const mongoURI = process.env.MONGO_URI

module.exports = {

    connectToMongo : () => {
        mongoose.connect(mongoURI).then(() => {
            console.log('Connected to mongo :' +process.env.MONGO_URI);
        })
    }
}
