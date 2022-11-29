const express = require("express");
const userRequest = require('./user/userRequest');
const app = express();

app.use('/', userRequest.router);

module.exports.app = app;