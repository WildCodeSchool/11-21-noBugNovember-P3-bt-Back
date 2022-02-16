require('dotenv').config()

const { setupRoutes } = require('./routes');

const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const routes = require("./routes/index")

const connection = require('./config/db.js')

const app = express()
const port = process.env.PORT || 4242


connection.connect((err) => {
    if (err) {
        console.error('error connecting: ' + err.stack)
    } else {
        console.log('connected as id ' + connection.threadId)
    }
})
    app.use(cors())
    app.use(morgan('dev'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true })) 

setupRoutes(app);

let server = app.listen(port, () => {
    console.log('listening on port', server.address().port)
})