const express = require("express");
const contractRouter = require("../../connection");
const config = require("../../config/config.json");
const { logger } = require("../../config/logConfig");
require('dotenv').config();
const router = express.Router();

contractRouter(config).then((connection) => {
    gateway = connection.gateway;
    contract = connection.contract;

    router.post("/mintNFT", async(request, response) => {
        try{
            const requestData = JSON.stringify(request.body);
            const {content_id, content_url} = request.body;
            console.log(1);
            const bufferedData = await contract.submitTransaction("MintWithTokenURI", requestData);
            console.log(2);
            const jsonData = JSON.parse(String(bufferedData));
            console.log(3);
            logger.info(jsonData);
            response.send(jsonData);
        } catch(e) {
            console.error(e);
            response.send("error")
        }
    });
});

module.exports.router = router;