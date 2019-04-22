import React, { Component } from "react";
import Header from "./components/layout/Header";
import "./App.css";
import { NavLink, Switch, Route } from "react-router-dom";
import "./App.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import components from "./components";
import componentsMun from "./componentsMun";
import Nebny from "./Nebny";
import VGS from "./VGS";
import Tiq from "./Tiq";
import lib from "./lib";
import MenuAppBar from "./components/layout/MenuAppBar";
import setAuthToken from "../src/helpers/setAuthToken";
import show from "./show";
import securitycouncil from "./securitycouncil";
import generalassembly from "./generalassembly";
import secretaryoffice from "./secretaryoffice";
import executive from "./executive";
import textfield from "./textfield";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Header/>  */}
        <MenuAppBar />
        <div className="nav ">
          {/* <NavLink exact to="/" activeClassName="active">
            AWG Hub
          </NavLink>
          <NavLink to="/componentsMun" activeClassName="active">
            Mun Club
    </NavLink>*/}
        </div>
        <Route
          render={({ location }) => (
            <TransitionGroup>
              <CSSTransition key={location.key} timeout={300} classNames="fade">
                <Switch>
                  <Route exact path="/" component={components} />
                  <Route path="/componentsMun" component={componentsMun} />
                  <Route path="/secretaryoffice" component={secretaryoffice} />
                  <Route path="/securitycouncil" component={securitycouncil} />
                  <Route path="/generalassembly" component={generalassembly} />
                  <Route path="/executive" component={executive} />

                  <Route path="/textfield" component={textfield} />
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
