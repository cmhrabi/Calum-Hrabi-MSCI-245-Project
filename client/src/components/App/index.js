import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';
import ContactUs from '../ContactUs';

import Review from '../Review';
import PrivateRoute from '../Navigation/PrivateRoute.js';
import Landing from '../Landing'
import NavBar from '../NavBar'
import Search from '../Search';
import Edit from '../Edit'

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
      <NavBar/>
	    <div>
        <Route exact path="/" component={Landing}/>
	    </div>
      <div>
        <Route exact path="/reviews" component={Review}/>
	    </div>
      <div>
        <Route exact path="/search" component={Search}/>
	    </div>
      <div>
        <Route exact path="/mypage" component={Edit}/>
	    </div>
      <ContactUs/>
	  </Router>
    );
  }
}

export default App;