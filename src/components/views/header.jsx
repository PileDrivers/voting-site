
import React from 'react';
import { Link } from 'react-router-dom';


export default class Header extends React.Component {
  render() {
    return (
      <div id='Header'>
        <span><Link to='/'>Home</Link></span> | <span><Link to='/contact'>Contact</Link></span>
        <hr/>
    </div>
    );
  }
}