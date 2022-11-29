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
            const userData = {...request.body, created_at: String(Date.now()), modified_at: String(Date.now())};
            console.log(userData)
            const bufferedData = await contract.submitTransaction("CreateUserData", JSON.stringify(userData));
            const jsonData = JSON.parse(String(bufferedData));
            logger.info(jsonData);
            response.send(jsonData);
        } catch(e) {
            console.error(e);
            response.send("error");
        }
    });

    router.post("/signin", async(request, response) => {
        try{
            const userData = {user_id: request.body.user_id};
            console.log(request.body);
            const bufferedData = await contract.submitTransaction("GetUserData", JSON.stringify(userData));
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