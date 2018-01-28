const { cloneDeep } = require('lodash');

const ACTION_DURATION = 2.0;

const baseVotes = {
  left: 0,
  right: 0,
  forward: 0,
  speak1: 0,
  speak2: 0,
  speak3: 0
}

const speechPool = [
  'Hello',
  'World',
  'You must construct additional pylons',
  'Jesus I have been awake so long',
  'Somebody send help',
  'Hi George'
];

let speechMap = [];

const regexMapping = {
  left: /\b(l|left)\b/,
  right: /\b(r|right)\b/,
  forward: /\b(f|forward)\b/,
  speak1: /\b(s1|speak1)\b/,
  speak2: /\b(s2|speak2)\b/,
  speak3: /\b(s3|speak3)\b/,
}

module.exports = class VoteCounter {
  constructor(socket) {
    this.io = socket;
    this.stream_data_io = this.io
      .of('/chat')
      .on('connection', function (socket) {
        console.log('Listener Connected');
    });

    this.pylon_io = this.io
      .of('/pylon')
      .on('connection', function (socket) {
        console.log('Bot Connected');
    });

    this.votes = cloneDeep(baseVotes);
  }

  clearVotes() { 
    this.votes = cloneDeep(baseVotes);
    this.stream_data_io.emit('vote_count', this.votes);
  }  

  parseMessage(message) {
    if (message.match(regexMapping.left)) {
      this.votes.left += 1;
      this.stream_data_io.emit('vote_count', this.votes);
    }
    else if (message.match(regexMapping.right)){
      this.votes.right += 1;
      this.stream_data_io.emit('vote_count', this.votes);
    }
    else if (message.match(regexMapping.forward)){
      this.votes.forward += 1;
      this.stream_data_io.emit('vote_count', this.votes);
    }
    else if (message.match(regexMapping.speak1)){
      this.votes.speak1 += 1;
      this.stream_data_io.emit('vote_count', this.votes);
    }
    else if (message.match(regexMapping.speak2)){
      this.votes.speak2 += 1;
      this.stream_data_io.emit('vote_count', this.votes);
    }
    else if (message.match(regexMapping.speak3)){
      this.votes.speak3 += 1;
      this.stream_data_io.emit('vote_count', this.votes);
    }
  }

  sendCommand(command) {
    let data;
    switch(command) {
      case 'speak1':
        data = speechMap[0];
        break;
      case 'speak2': 
        data = speechMap[1];
        break;
      case 'speak3':
        data = speechMap[2];
        break;
      default:
        data = '';
    }
    let commandMessage = {
      command,
      duration: this.ACTION_DURATION,
      data
    };
    this.pylon_io.emit('command', commandMessage);
  }

  assignSpeech() {
    for(let i = 0; i < 3; i++) {
      let rand = Math.floor((Math.random() * speechPool.length));
      speechMap[i] = speechPool[rand];
    }
    this.stream_data_io.emit('speech_to_text', speechMap);
  }

  chooseWinner() {
    let winCount = 0;
    let winCommand;
    Object.keys(this.votes).forEach( key => {
      if(this.votes[key] > winCount) {
        winCount = this.votes[key];
        winCommand = key;
      }
    });

    if(winCount === 0) {
      console.log("No valid votes.");
    } else {
      console.log("Winning command:", winCommand);
      this.sendCommand(winCommand);
      this.clearVotes();   
    }
    this.assignSpeech();
  }
}



