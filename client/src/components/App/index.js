import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import ContactUs from '../ContactUs';

import Home from '../Home';
import PrivateRoute from '../Navigation/PrivateRoute.js';



class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //
    };
  }

  componentDidMount() {
    //
  }


  componentWillUnmount() {
    this.listener();
  }


  render() {
    return (
	  <Router>
	    <div>
        <PrivateRoute exact path="/" component={Home}/>
	    </div>
      <div>
        <Route exact path="/" component={ContactUs}/>
      </div>
	  </Router>
    );
  }
}

export default App;