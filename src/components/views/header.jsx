
import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
  render() {
    return (
      <div className='header'>
        <img className='logo' src={require('../../../images/banner.jpg')} alt="PylonDriver"/>
      </div>
    );
  }
}