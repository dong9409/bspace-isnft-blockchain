const axios = require("axios");
const {
    logger
} = require("../config/logConfig");
require('dotenv').config();

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function getTimeStamp() {
    let today = new Date();
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1; // 월
    let date = today.getDate(); // 날짜
    let hour = today.getHours(); //시간
    let minute = today.getMinutes(); //분
    let seconds = today.getSeconds(); //초
    let milli = today.getMilliseconds(); // 밀리세컨즈
    let timeStamp = year.toString() + '.' + month.toString().padStart(2, "0") + '.' + date.toString().padStart(2, "0") +
                    ' ' + hour.toString().padStart(2, "0") + ":" + minute.toString().padStart(2, "0") + ":"
                    + seconds.toString().padStart(2, "0") + ":" + milli.toString().padStart(2, "0");
    return timeStamp
}

function enrollFacility(requestURL, facility) {
    return new Promise(function (resolve, reject) {
        axios.post(requestURL, {
            name: facility.name,
            location: facility.location,
            enrolled_time: facility.enrolled_time,
        }).then(result => {
            resolve(result.data)
        });
    });
}

function deleteFacility(requestURL, facility) {
    return new Promise(function (resolve, reject) {
        axios.post(requestURL, {
            name: facility.name,
            location: facility.location,
            state: facility.state,
        }).then(result => {
            resolve(result.data)
        });
    });
}


async function main() {
    let promises = [];
    for (let i = 1; i < 5; ++i) {
        let facility = {}
        facility.name = `facility${i}`;
        facility.location = `location${i}`;
        facility.enrolled_time = getTimeStamp();

        const prom = enrollFacility(`http://${process.env.SERVER_HOST}:${process.env.PORT}/chaincode/test-api/facility/create`, facility);
        // const prom = deleteFacility(`http://${process.env.SERVER_HOST}:${process.env.PORT}/chaincode/test-api/facility/Delete`, facility);
        promises.push(prom)
        Promise.all(promises).then(() => {
            logger.info("Init Complete");
        })
    }

}

main()