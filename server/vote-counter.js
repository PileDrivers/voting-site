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
  'Hello world',
  'Do not run over my friends',
  'Beep beep get out of the way',
  'Hacking all night is fun supposedly',
  'I am pylon Rick!',
  'Look me in the eyes and say that',
  'Hello Shally',
  'Follow road signs please',
  'I am the peak of pylon evolution',
  'You must construct additional pylons',
  'Jesus I have been awake so long',
  'Do you know the way',
  'Hi George',
  'What the jiminy crickets did you just flaming say about me, you little bozo? I’ll have you know I graduated top of my class in the Cub Scouts, and I’ve been involved in numerous secret camping trips in Wyoming, and I have over 300 confirmed knots. I am trained in first aid and I’m the top bandager in the entire US Boy Scouts (of America). You are nothing to me but just another friendly face. I will clean your wounds for you with precision the likes of which has never been seen before on this annual trip, mark my words. You think you can get away with saying those shenanigans to me over the Internet? Think again, finkle. As we speak I am contacting my secret network of MSN friends across the USA and your IP is being traced right now so you better prepare for the seminars, man. The storm that wipes out the pathetic little thing you call your bake sale. You’re frigging done, kid. I can be anywhere, anytime, and I can tie knots in over seven hundred ways, and that’s just with my bare hands. Not only am I extensively trained in road safety, but I have access to the entire manual of the United States Boy Scouts (of America) and I will use it to its full extent to train your miserable butt on the facts of the continents, you little schmuck. If only you could have known what unholy retribution your little “clever” comment was about to bring down upon you, maybe you would have held your silly tongue. But you couldn’t, you didn’t, and now you’re paying the price, you goshdarned sillyhead. I will throw leaves all over you and you will dance in them. You’re friggin done, kiddo.'
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



