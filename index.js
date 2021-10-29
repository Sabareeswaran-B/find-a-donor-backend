const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/config.js');
const mongoose = require('mongoose');
const passport = require('passport')
const cors = require('cors')
// const cookieParser = require("cookie-parser");
require('dotenv').config();

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

//Enableing Cross Orgin Resourse Sharing
app.use(cors());

//passport initialization
app.use(passport.initialize())

//create session using passport
app.use(passport.session())

// parse cookie
// app.use(cookieParser());

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, { useUnifiedTopology: true ,
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

mongoose.set("useCreateIndex", true);
require('./route/route')(app);
// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to the Blood Donor Project done by Sabareeswaran B"});
});

// listen for requests
app.listen(process.env.PORT || 9000, () => {
    console.log("Server is listening on port 9000");
});