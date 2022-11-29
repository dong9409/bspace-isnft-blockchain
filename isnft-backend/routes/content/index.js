const express = require("express");
const content = require('./contentRequest');
const router = express.Router();

router.use('/', content.router);

module.exports.router = router;