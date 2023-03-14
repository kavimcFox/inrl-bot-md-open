const toBool = (x) => x == 'true'
const { existsSync } = require('fs')
if (existsSync('config.env')) require('dotenv').config({ path: './config.env' })
module.exports = {
    VERSION: 'V 1.0.0', // bot version
    SESSION_ID: process.env.SESSION_ID || 'inrl~qQgZDUCjWfLszt3ZSN7xA8i88krQ2Dce7bRY', //your ssid to run bot
    MONGO_URL : process.env.MONGO_URL,//must be enter your mongo url;
    HEROKU: {
        API_KEY: process.env.HEROKU_API_KEY,
        APP_NAME: process.env.HEROKU_APP_NAME
    },
    WEB : process.env.WEB || "https://tinyurl.com/ycks3s8p",//your website url
    YT : process.env.YT || "https://tinyurl.com/36r3668n",//your yt url
    VIDEO : "https://tinyurl.com/3x38ajmn",//turtorial video to watch how to use bot
    WAGRP : process.env.WAGRP || 'https://tinyurl.com/f5wh55mk',//your wa group url
};
