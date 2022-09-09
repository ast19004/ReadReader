if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }
  
const express = require('express');
const { dirname } = require('path');

const path = require('path');
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');

const app = express();

app.use(express.static(path.join(__dirname + "/public")));


mongoose
    .connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB}.zr23rly.mongodb.net/?retryWrites=true&w=majority`)
    .then(result => {
        app.listen(PORT);
    })
    .catch(err => {
        console.log(err);
    });