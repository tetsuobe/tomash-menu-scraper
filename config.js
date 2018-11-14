require('dotenv').config();

module.exports = {
    token: process.env.SLACK_TOKEN,
    bot: process.env.SLACK_BOT_ID,
    channel: process.env.SLACK_CHANNEL
};
