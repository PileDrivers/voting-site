const TwitchBot = require('twitch-bot');

const createBot = (voteManager) => {
  const Bot = new TwitchBot({
    username: 'PylonDriver',
    oauth: process.env.TWITCH_PYLON_OAUTH,
    channels: ['pylondriver']
  });

  Bot.on('join', () => {
    console.log("Connected to Twtich.");
    Bot.on('message', chatter => {
       voteManager.parseMessage(chatter.message);
    })
  });

  Bot.on('error', err => {
    console.error(err);
  });

  return Bot;
}
module.exports = createBot;