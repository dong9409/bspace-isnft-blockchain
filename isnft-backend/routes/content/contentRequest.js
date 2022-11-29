const express = require("express");
const contractRouter = require("../../connection");
const config = require("../../config/config.json");
const { logger } = require("../../config/logConfig");
require('dotenv').config();
const router = express.Router();


contractRouter(config).then((connection) => {
    gateway = connection.gateway;
    contract = connection.contract;
    
    // getContentList
    router.get("/", async(request, response) => {
        const bufferedData = await contract.submitTransaction("GetContentList");
        const jsonData = JSON.parse(String(bufferedData));
        logger.info(jsonData);
        response.send(jsonData);
    });

    // createContent
    router.post("/", async(request, response) => {
        const requestData = JSON.stringify(request.body);
        const bufferedData = await contract.submitTransaction("createContent", requestData);
        const jsonData = JSON.parse(String(bufferedData));
        logger.info(jsonData);
        response.send(jsonData);
    });

    // getContentByUser
    router.get("/user/:user_id", async(request, response) => {
        const userID = request.params.user_id;
        const bufferedData = await contract.submitTransaction("GetContentByUser", userID);
        const jsonData = JSON.parse(String(bufferedData));
        logger.info(jsonData);
        response.send(jsonData);
    });

    // getContentById
    router.get("/:content_id", async(request, response) => {
        const contentID = request.params.content_id;
        const bufferedData = await contract.submitTransaction("GetContentById", contentID);
        const jsonData = JSON.parse(String(bufferedData));
        logger.info(jsonData);
        response.send(jsonData);
    });

    // updateContent
    router.post("/update", async(request, response) => {
        const requestData = JSON.stringify(request.body);
        const bufferedData = await contract.submitTransaction("UpdateContent", requestData);
        const jsonData = JSON.parse(String(bufferedData));
        logger.info(jsonData);
        response.send(jsonData);
    });

    // mintContent
    router.post("/mint/:content_id", async(request, response) => {
        const contentID = request.params.content_id;
        const bufferedData = await contract.submitTransaction("MintContent", contentID);
        const jsonData = JSON.parse(String(bufferedData));
        logger.info(jsonData);
        response.send(jsonData);
    });
    
    // deleteContent
    router.post("/delete/:content_id", async(request, response) => {
        const contentID = request.params.content_id;
        const bufferedData = await contract.submitTransaction("DeleteContent", contentID);
        const jsonData = JSON.parse(String(bufferedData));
        logger.info(jsonData);
        response.send(jsonData);
    });


});

module.exports.router = router;