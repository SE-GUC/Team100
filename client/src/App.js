import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import setAuthToken from "../src/helpers/setAuthToken";
import "./App.css";
import components from "./components";
import MenuAppBar from "./components/layout/MenuAppBar";
import componentsMun from "./componentsMun";
import aboutus from "./componentsMun/aboutus/aboutus";
import Committees from "./componentsMun/committees/Committees";
import Events from "./componentsMun/events/Events";
import recruitment from "./componentsMun/forms/recruitment";
import Galleries from "./componentsMun/galleries/Galleries";
import Library from "./componentsMun/library/Library";
import Livefeed from "./componentsMun/livefeed/Livefeed";
import livestream from "./componentsMun/livestream/livestream";
import executive from "./executive";
import generalassembly from "./generalassembly";
import secretaryoffice from "./secretaryoffice";
import securitycouncil from "./securitycouncil";
import ShowMessage from './componentsMun/ShowMessage/ShowMessage'
import textfield from "./textfield";
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
                    <Route path="/show" component={ShowMessage} />

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
