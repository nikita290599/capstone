const express = require('express');
require('dotenv').config();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");

// code for connecting to remote database 
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
  };

mongoose.connect(process.env.uri, options, function(error) {
    if(error){

        console.log("error in setting up connection to database",error);
    }
    else{
        console.log("connected  succesfully");
    }
  
});


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const studentRouter = require('./routes/students');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/students',studentRouter);

module.exports = app;
