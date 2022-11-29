const express = require("express");
const bodyParser = require("body-parser");
const router = require('./routes/index');
const { logger } = require("./config/logConfig");
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use('/', router.app);

app.listen(4001, () => {
    logger.info(`-api listening on port 4001!`);
});

process.on("SIGINT", async() => {
    logger.error("Caught interrupt signal - start disconnect from the gateway");
    gateway.disconnect();
    contract.removeContractListener();
    process.exit();
});