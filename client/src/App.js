import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import components from "./components";
import componentsMun from "./componentsMun";
import MenuAppBar from "./components/layout/MenuAppBar";
import setAuthToken from "../src/helpers/setAuthToken";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import aboutus from "./componentsMun/aboutus/aboutus";
import securitycouncil from "./securitycouncil";
import generalassembly from "./generalassembly";
import secretaryoffice from "./secretaryoffice";
import executive from "./executive";
import textfield from "./textfield";
import recruitment from "./componentsMun/forms/recruitment";
import Events from "./componentsMun/events/Events";
import Galleries from "./componentsMun/galleries/Galleries";
import Committees from "./componentsMun/committees/Committees";
import Livefeed from "./componentsMun/livefeed/Livefeed";
import livestream from "./componentsMun/livestream/livestream";
import Library from "./componentsMun/library/Library";
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
                <CSSTransition
                  key={location.key}
                  timeout={300}
                  classNames="fade"
                >
                  <Switch>
                    <Route exact path="/" component={components} />
                    <Route
                      exact
                      path="/componentsMun"
                      component={componentsMun}
                    />
                    <Route
                      path="/componentsMun/Forms"
                      component={recruitment}
                    />
                    <Route path="/componentsMun/aboutus" component={aboutus} />
                    <Route path="/componentsMun/events" component={Events} />
                    <Route
                      path="/componentsMun/gallery"
                      component={Galleries}
                    />
                    <Route
                      path="/componentsMun/committees"
                      component={Committees}
                    />
                    <Route
                      path="/componentsMun/livefeed"
                      component={Livefeed}
                    />
                    <Route
                      path="/componentsMun/livestream"
                      component={livestream}
                    />
                    <Route path="/componentsMun/library" component={Library} />

                    <Route
                      path="/secretaryoffice"
                      component={secretaryoffice}
                    />
                    <Route
                      path="/securitycouncil"
                      component={securitycouncil}
                    />
                    <Route
                      path="/generalassembly"
                      component={generalassembly}
                    />
                    <Route path="/executive" component={executive} />

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
