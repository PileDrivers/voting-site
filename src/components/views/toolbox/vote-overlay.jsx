import React from 'react'
import { cloneDeep } from 'lodash';

import openSocket from 'socket.io-client';

export default class VotingOverlay extends React.Component {
  constructor(props) {
    super();
    this.state = {
      response: false,
      endpoint: window.origin + '/chat',
      votes: {
        left: 0,
        right: 0,
        forward: 0,
        speak1: 0,
        speak2: 0,
        speak3: 0
      },
      speechText: []
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = openSocket(this.state.endpoint);
    socket.on('vote_count', data => this.setState({ votes: data }));
    socket.on('speech_to_text', data => this.setState({ speechText: data }));
  }
  
  render () {
    console.log(this.state);
    return(
      <div className='vote-overlay'>
        <p className='maintext'>left (l): {this.state.votes.left}</p>
        <br/>
        <p className='maintext'>right (r): {this.state.votes.right}</p>
        <br/>
        <p className='maintext'>forward (f): {this.state.votes.forward}</p>
        <br/>
        <p className='maintext'>speak1 (s1): {this.state.votes.speak1}</p>
        <p className='subtext'>{this.state.speechText[0]}</p>
        <br/>
        <p className='maintext'>speak2 (s2): {this.state.votes.speak2}</p>
        <p className='subtext'>{this.state.speechText[1]}</p>
        <br/>
        <p className='maintext'>speak3 (s3): {this.state.votes.speak3}</p>
        <p className='subtext'>{this.state.speechText[2]}</p>
      </div>
    );
  }
}