import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// Pages of the Application
import Home from './components/views/home';

export default class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='*' render={ () => <Redirect to='/'/> }/>
      </Switch>
    );
  }
}