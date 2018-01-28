const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.dev.js');

const TwitchBot = require('twitch-bot');

const app = express();
const compiler = webpack(config);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/public', express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});


app.listen(process.env.PORT || 5000, err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Listening at http://localhost:${process.env.PORT || 5000}`);
});


const createBot = () => {
  const Bot = new TwitchBot({
    username: 'PylonDriver',
    oauth: process.env.TWITCH_PYLON_OAUTH,
    channels: ['pylondriver']
  });

  Bot.on('join', () => {
    Bot.on('message', chatter => {
       //Logic for message parsing
       console.log(chatter.username, chatter.message);
    })
  });

  Bot.on('error', err => {
    console.error(err);
  });

  return Bot;
}

const Bot = createBot();