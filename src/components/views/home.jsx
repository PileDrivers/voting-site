import React from 'react';
import { browserHistory } from 'react-router';

import TwitchViewer from './toolbox/twitch-viewer';

export default class Home extends React.Component {

  render() {
    return (
      <div className='home'>
        <TwitchViewer />
      </div>
    );
  }
}