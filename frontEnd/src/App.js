import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Menu from "./components/Menu";
import CreateUserComponent from "./components/User/CreateUserComponent";
import ListUserComponent from "./components/User/ListUserComponent";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Header />
          <Menu />
          <Switch>
            <Route path="/" exact component={ListUserComponent}></Route>
            <Route path="/users" component={ListUserComponent}></Route>
            <Route
              path="/add-user/:_id"
              component={CreateUserComponent}
            ></Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
