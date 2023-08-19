/* entry point for backend server */


//EXPRESS AND MISC
const express = require('express');
const app = express();
require('dotenv').config()
const cookieParser = require('cookie-parser');
const cors = require('cors');


//ROUTE FILES
const mainRoutes = require('./routes/mainRoutes.js');
const authRoutes = require('./routes/authenticationRoutes.js');
const profileRoutes = require('./routes/profileRoutes.js');


//MONGOOSE, MONGODB, & BACKEND SERVER SETUP
const mongoose = require('mongoose');
const mongo_username = process.env.USERNAME;
const mongo_password = process.env.PASSWORD;
const mongo_dbname = process.env.DATABASE_NAME;
const mongo_dbcode = process.env.DATABASE_CODE;

mongoose.connect(`mongodb+srv://${mongo_username}:${mongo_password}@${mongo_dbname}.${mongo_dbcode}.mongodb.net/RateMyClasses`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(process.env.PORT, () => {
            console.log('LISTENING ON PORT', process.env.PORT)
        });
    })
    .catch((err) => {
        console.log(err);
    });


//MIDDLEWARE
app.use(express.json()); //parses every request into a JSON object, and attaches it as a property to the req object (access it using req.body)
app.use(express.static('public'));
app.use(cookieParser());

/* dev middleware only - delete before deployment */
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

/* cors middleware for development - allows client running on localhost:3000 to make requests to server running on localhost:3001 */
// app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Content-Type,Authorization")
    res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, OPTIONS")
    res.header("Access-Control-Allow-Credentials", true);
    next();
});


//ROUTES
app.use(mainRoutes);
app.use(authRoutes);
app.use('/profile', profileRoutes);

/* 404 page */
app.use((req, res) => {
    res.status(404).json({error: "page not found"})
})