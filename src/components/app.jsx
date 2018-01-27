import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from '../routes';
import Header from './views/header';

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Routes />
        </div>
      </BrowserRouter>
    );
  }
}