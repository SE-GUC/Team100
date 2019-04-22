import React from "react";
//import Header from "./componentsMun/layout/Header"
//import Footer from "./components/layout/Footer"
//import { BrowserRouter as Router, Route } from "react-dom"
//import Tools from "./components/Tools"

import "./App.css";

import Homepage from "./componentsMun/homepage/Homepage";
import { Switch, Route } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import components from "./components";

const MunClub = () => {
  return (
    <div className="AWG Hub">
      {/* <Header /> */}
      <Homepage />
      {/*<Description /> 
    
       <SlideShow />
     <Subscribers /> */}
      <div className="nav " />
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition key={location.key} timeout={300} classNames="fade">
              <Switch>
                <Route exact path="/" component={components} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    </div>
  );
};

export default MunClub;
