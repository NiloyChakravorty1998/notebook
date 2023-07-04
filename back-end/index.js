const express = require('express')
const bodyParser = require('body-parser')
const connection = require('./config/dbConfig')

connection.connectToMongo();
const app = express();

app.use(bodyParser.json());
//Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(process.env.APP_PORT,() => {
    console.log('Application has been started >>')
})

