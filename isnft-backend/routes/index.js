const express = require("express");
const admission = require('./auth');
const content = require('./content');
const app = express();

app.use('/auth', admission.router);
app.use('/content', content.router);

module.exports.app = app;