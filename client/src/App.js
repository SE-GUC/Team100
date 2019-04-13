import React, { Component } from "react";
import { NavLink, Switch, Route } from "react-router-dom";
import "./App.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import components from "./components";
import componentsMun from "./componentsMun";
import Nebny from "./Nebny";
import VGS from "./VGS";
import Tiq from "./Tiq";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="nav ">
          <NavLink exact to="/" activeClassName="active">
            AWG Hub
          </NavLink>
          <NavLink to="/componentsMun" activeClassName="active">
            Mun Club
          </NavLink>
          <NavLink to="/Nebny" activeClassName="active">
            Nebny Club
          </NavLink>
          <NavLink to="/VGS" activeClassName="active">
            VGS Club
          </NavLink>
          <NavLink to="/Tiq" activeClassName="active">
            Tiq Club
          </NavLink>
        </div>
        <Route
          render={({ location }) => (
            <TransitionGroup>
              <CSSTransition key={location.key} timeout={300} classNames="fade">
                <Switch>
                  <Route exact path="/" component={components} />
                  <Route path="/componentsMun" component={componentsMun} />
                  <Route path="/Nebny" component={Nebny} />
                  <Route path="/VGS" component={VGS} />
                  <Route path="/Tiq" component={Tiq} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )}
        />
      </div>
    );
  }
}
export default App;
