const express = require("express");
const contractRouter = require("../../connection");
const config = require("../../config/config.json");
const { logger } = require("../../config/logConfig");
require('dotenv').config();
const router = express.Router();


async function generateToken(id, type){
    const payload = {
      id: id,
      type: type,
    };

    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '24h',
      secret: secret,
    });

    return {
      access_token: token,
    };
 }

 async function verify(authorization) {
  try {
    const token = authorization.replace('Bearer ', '');
    const result = this.jwt.decode(token);
    return result;
  } catch (e) {
    throw e;
  }
}



contractRouter(config).then((connection) => {
    gateway = connection.gateway;
    contract = connection.contract;

    router.post("/signup", async(request, response) => {
        const bufferedData = await contract.submitTransaction("GetAdmissionList");
        const jsonData = JSON.parse(String(bufferedData));
        logger.info(jsonData);
        response.send(jsonData);
    });

    router.post("/signin", async(request, response) => {
        const bufferedData = await contract.submitTransaction("GetAdmissionList");
        const jsonData = JSON.parse(String(bufferedData));
        const access_token = await generateToken(user.user_id, 'ADMIN');
        const login_data = {
          ...user,
          ...access_token,
        };
        return login_data;
        logger.info(jsonData);
        response.send(jsonData);
    });

});

module.exports.router = router;