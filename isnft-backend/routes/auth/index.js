const express = require("express");
const auth = require('./authRequest');
const router = express.Router();

router.use('/', auth.router);

module.exports.router = router;