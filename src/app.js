const express = require('express');

const app = express();
const port = 8080;
const route = require("./routes");
const bodyParser = require('body-parser');
const corsHelper = require('../src/app/helper/corsHelper');
const handlingError = require('../src/app/helper/handlingError');
const mongoose = require('mongoose');
const path = require('path');

// connect DB
const db = require("./config/db");
db.connect();
// application/json
app.use(bodyParser.json());

// static file css and image
//app.use('/public', express.static(path.join(__dirname, '/public
console.log(path.join(__dirname, '../public'))
app.use('/public', express.static(path.join(__dirname, '../public')));

app.use(corsHelper)

// init route
route(app)


// middleware handling errors
app.use(handlingError)
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});