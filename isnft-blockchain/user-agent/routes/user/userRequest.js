const express = require("express");
const contractRouter = require("../../connection");
const config = require("../../config/config.json");
const { logger } = require("../../config/logConfig");
require('dotenv').config();
const router = express.Router();

contractRouter(config).then((connection) => {
    gateway = connection.gateway;
    contract = connection.contract;

    router.post("/signup", async(request, response) => {
        try{
            const requestData = JSON.stringify(request.body);
            const {user_id, user_nm, user_pw, created_at, modified_at, user_type} = request.body;
            console.log(request.body)
            const bufferedData = await contract.submitTransaction("CreateUserData", JSON.stringify(request.body));
            const jsonData = JSON.parse(String(bufferedData));
            logger.info(jsonData);
            response.send(jsonData);
        } catch(e) {
            console.error(e);
            response.send("error");
        }
    });

});

module.exports.router = router;