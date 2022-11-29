const express = require("express");
const admission = require('./auth');
const app = express();

app.use('/auth', admission.router);


module.exports.app = app;