import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/common/header';
//import About from './components/common/about';
import Customer from './components/app/customer';
import Create from './components/app/customer/create1';
import Edit from './components/app/customer/edit1';
import Corousel from './components/common/corousel';
import Cards from './components/common/cards';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="mt-4">
            <Switch>
              <Route exact path="/" component={Customer} />
              <Route path="/corousel" component={Corousel} />
              <Route path="/cards" component={Cards} />
              <Route path="/create1" component={Create} />
              <Route path="/edit1" component={Edit} />
             
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default App;