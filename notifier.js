const { WebClient } = require('@slack/client');

module.exports = function ({ config }) {
    const web = new WebClient(config.token);
    const template = {
        as_user: config.bot,
        channel: config.channel,
        parse: 'full'
    };
    return {
        push(restaurantName) {
            web.chat.postMessage({ ...template, text: '@here menu for *' + restaurantName + '* ready for update.' })
                .then((res) => {
                    console.log('Message sent: ', res.ts);
                })
                .catch(console.error);
        }
    }
}