
import React from 'react'

export default class TwitchViewer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const twitchViewer = new Twitch.Embed('twitch-embed', {
      width: '100%',
      height: '100%',
      channel: 'pylondriver'
    });
  }

  render () {

    return (
      <div id='twitch-embed'>
        {this.props.children}
      </div>
    )
  }
} 