import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import Dashboard from './components/layout/Dashboard';
import Pokemon from './components/pokemon/Pokemon';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route exact path='/' component={Dashboard} />
              <Route exact path='/pokemon/:pokemonIndex' component={Pokemon} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
