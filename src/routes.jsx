import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// Pages of the Application
import Home from './components/views/home';
import Contact from './components/views/contact';

export default class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/contact' component={Contact} />
        <Route path='*' render={ () => <Redirect to='/'/> }/>
      </Switch>
    );
  }
}