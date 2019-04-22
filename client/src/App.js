import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import setAuthToken from '../src/helpers/setAuthToken';
import "./App.css";
import components from "./components";
import MenuAppBar from "./components/layout/MenuAppBar";
import componentsMun from "./componentsMun";
import Events from "./componentsMun/events/Events";
import recruitment from "./componentsMun/forms/recruitment";
import Library from "./componentsMun/library/Library";
import textfield from "./textfield";
import Committees from './componentsMun/committees/Committees';
import Galleries from './componentsMun/galleries/Galleries';
import MV from './componentsMun/aboutus/MV';
import livestream from './componentsMun/livestream/livestream';
import Livefeed from './componentsMun/livefeed/Livefeed';
import aboutus from './componentsMun/aboutus/aboutus';
import show from "./show";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
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
                  <Route exact path="/componentsMun" component={componentsMun} />
                  <Route path="/componentsMun/aboutus" component={aboutus} />
                  <Route path="/componentsMun/Forms" component={recruitment} />
                  <Route path="/componentsMun/Events" component={Events} />
                  <Route path="/componentsMun/library" component={Library} />
                  <Route path="/componentsMun/Committees" component={Committees} />
                  <Route path="/componentsMun/Galleries" component={Galleries} />
                  <Route path="/componentsMun/livestream" component={livestream} />
                  <Route path="/componentsMun/livefeed" component={Livefeed} />


                  <Route path="/textfield" component={textfield} />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )}
        />
      </div>
      </MuiThemeProvider>
    );
  }
}
export default App;
