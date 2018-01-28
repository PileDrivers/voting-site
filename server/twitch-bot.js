const TwitchBot = require('twitch-bot');

let hasJoined = false;
const createBot = (voteManager) => {
  const Bot = new TwitchBot({
    username: 'PylonDriver',
    oauth: process.env.TWITCH_PYLON_OAUTH,
    channels: ['pylondriver']
  });

  Bot.on('join', () => {
    if(!hasJoined) {
      console.log("Connected to Twitch.");
      Bot.on('message', chatter => {
        console.log(chatter.message);
        voteManager.parseMessage(chatter.message);
      })
    }
    hasJoined = true;
  });

  Bot.on('error', err => {
    console.error(err);
  });

  return Bot;
}
module.exports = createBot;