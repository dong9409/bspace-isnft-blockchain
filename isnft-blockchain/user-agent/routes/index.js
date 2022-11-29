const express = require("express");
const erc721Request = require('./erc721/erc721Request');
const app = express();

app.use('/', erc721Request.router);

module.exports.app = app;