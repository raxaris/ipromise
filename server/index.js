require('dotenv').config()

const express = require('express')
const cors= require('cors')
const fileUpload= require('express-fileupload')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const sequelize = require('./db')
const router = require('./router/router')
const passport = require('./utils/passport/passport')
const errorHandler = require('./middleware/errorHandlingMiddleware')

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(cookieParser());
app.use(cors())
app.use(fileUpload({}))

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 86400000,
        secure: false },
        httpOnly: false,
}));

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});

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
