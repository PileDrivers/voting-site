// Compiler tools
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.dev.js');
const compiler = webpack(config);

// Connection tools
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Twitch bot
const createBot = require('./server/twitch-bot');

// Voting system
const VoteCounter = require('./server/vote-counter');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));
app.use('/public', express.static(__dirname + '/public'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

http.listen(process.env.PORT || 5000, err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Listening at http://localhost:${process.env.PORT || 5000}`);
});

const voteCounter = new VoteCounter(io);
const Bot = createBot(voteCounter);
voteCounter.setBot(Bot);
const chooseWinner = voteCounter.chooseWinner.bind(voteCounter);
setInterval(chooseWinner, 15.0 * 1000);
