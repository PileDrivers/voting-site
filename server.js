const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config.dev.js');


const app = express();
const compiler = webpack(config);

var http = require('http').Server(app);

const TwitchBot = require('twitch-bot');
var io = require('socket.io')(http);

var COMMAND_DUR_CONST = 2.0; 

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

var vote_regex = {
  left: /\b(l|left)\b/,
  right: /\b(r|right)\b/,
  forward: /\b(f|forward)\b/,
  speak1: /\b(s1|speak1)\b/,
  speak2: /\b(s2|speak2)\b/,
  speak3: /\b(s3|speak3)\b/,
}

var global_votes = {
  left: 0,
  right: 0,
  forward: 0,
  speak1: 0,
  speak2: 0,
  speak3: 0,
}

var command_list = {
  forward: 'forward',
  right: 'right',
  left: 'left',
  speak1: 'speak1',
  speak2: 'speak2',
  speak3: 'speak3',
}

var vote_manager = {
  votes: global_votes,
  clear: function() {
    this.votes.left = 0;
    this.votes.right = 0;
    this.votes.forward = 0;
    this.votes.speak1 = 0;
    this.votes.speak2 = 0;
    this.votes.speak3 = 0;
  },
  parse_message: function(message) {
    if (message.match(vote_regex.left)) {
      this.votes.left = this.votes.left + 1;
      steam_data_io.emit('vote_count', this.votes);
    }
    else if (message.match(vote_regex.right)){
      this.votes.right = this.votes.right + 1;
      steam_data_io.emit('vote_count', this.votes);
    }
    else if (message.match(vote_regex.forward)){
      this.votes.forward = this.votes.forward + 1;
      steam_data_io.emit('vote_count', this.votes);
    }
    else if (message.match(vote_regex.speak1)){
      this.votes.speak1 = this.votes.speak1 + 1;
      steam_data_io.emit('vote_count', this.votes);
    }
    else if (message.match(vote_regex.speak2)){
      this.votes.speak2 = this.votes.speak2 + 1;
      steam_data_io.emit('vote_count', this.votes);
    }
    else if (message.match(vote_regex.speak3)){
      this.votes.speak3 =+ 1;
      steam_data_io.emit('vote_count', this.votes);
    }
  },
  send_command: function(input_command, data) {
    var command = {
      command: input_command,
      duration: COMMAND_DUR_CONST,
      data: data,
    }
    console.log(command);
    pylon_io.emit('command', command);
  },
  choose_winner: function() {
    var winning_count = 0;
    var winning_command;
    if (this.votes.left > winning_count) {
      winning_count = this.votes.left;
      winning_command = command_list.left;
    }
    if (this.votes.right > winning_count){
      winning_count = this.votes.right;
      winning_command = command_list.right;
    }
    if (this.votes.forward > winning_count){
      winning_count = this.votes.forward;
      winning_command = command_list.forward;
    }
    if (this.votes.speak1 > winning_count) {
      winning_count = this.votes.speak1;
      winning_command = command_list.speak1;
    }
    if (this.votes.speak2 > winning_count){
      winning_count = this.votes.speak2;
      winning_command = command_list.speak2;
    }
    if (this.votes.speak3 > winning_count) {
      winning_count = this.votes.speak3;
      winning_command = command_list.speak3;
    }

    // No winner case
    if (winning_count == 0) {
      console.log("No votes no winner")
      return;
    }

    this.send_command(winning_command);
  }
}

var VOTE_TIME = 20.0; // in seconds

function endVote() {
  console.log("Vote done.");
  vote_manager.choose_winner();
}
setInterval(endVote, VOTE_TIME*1000);


const createBot = () => {
  const Bot = new TwitchBot({
    username: 'PylonDriver',
    oauth: process.env.TWITCH_PYLON_OAUTH,
    channels: ['pylondriver']
  });

  Bot.on('join', () => {
    console.log("Connected to Twtich.");
    Bot.on('message', chatter => {
       console.log(chatter.message);
       vote_manager.parse_message(chatter.message);
    })
  });

  Bot.on('error', err => {
    console.error(err);
  });

  return Bot;
}

var steam_data_io = io
  .of('/chat')
  .on('connection', function (socket) {
    console.log('Listener Connected');
    socket.on('vote', function (msg) {
      
    });
  });

var pylon_io = io
  .of('/pylon')
  .on('connection', function (socket) {
    console.log('Bot Connected');
    
  });

const Bot = createBot();
