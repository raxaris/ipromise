require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./model/models')
const cors= require('cors')
const fileUpload= require('express-fileupload')
const router = require('./router/router')
const errorHandler = require('./middleware/errorHandlingMiddleware')
const path = require('path')
const session = require('express-session');

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 86400000,
        secure: false }
}));

app.use(fileUpload({}))
app.use("/api", router)

app.use(errorHandler)

const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync({alter: true})

        app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()
