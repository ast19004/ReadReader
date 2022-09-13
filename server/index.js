if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }

const swaggerUi = require("swagger-ui-express"),
    swaggerDocument = require("./swagger.json");
  
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const { dirname } = require('path');

const path = require('path');
const PORT = process.env.PORT || 5000;
const MONGODB_URL =
  process.env.MONGODB_URL || `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB}.zr23rly.mongodb.net/?retryWrites=true&w=majority`;

const userRoutes = require('./routes/users');

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + "/public")));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });
app.use(userRoutes);

mongoose
    .connect(MONGODB_URL)
    .then(result => {
        app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        app.listen(PORT);
    })
    .catch(err => {
        console.log(err);
    });