import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Review from '../Review';
import history from './history';

export default function PrivateRoute({
  //authenticated,
  //...rest
}) {
  return (

    <Router history={history}>
      <Switch>
      <Route path="/" exact component={Review} />
      </Switch>
    </Router>
  );
}