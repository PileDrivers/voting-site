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
      }
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = openSocket(this.state.endpoint);
    socket.on('vote_count', data => this.setState({ votes: data }));
  }
  
  render () {
    return(
      <div className='vote-overlay'>
        Left: {this.state.votes.left}
        <br/>
        Right: {this.state.votes.right}
        <br/>
        Forward: {this.state.votes.forward}
        <br/>
        Speak1: {this.state.votes.speak1}
        <br/>
        Speak2: {this.state.votes.speak2}
        <br/>
        Speak3: {this.state.votes.speak3}
      </div>
    );
  }
}