import React, { Component } from "react";
//import Header from "./componentsMun/layout/Header"
//import Footer from "./components/layout/Footer"
//import { BrowserRouter as Router, Route } from "react-dom"
//import Tools from "./components/Tools"
// import Description from "./componentsMun/descriptions/Descriptions";
import "./App.css";
import Subscribers from "./componentsMun/subscribers/Subscribers";
import Livefeed from "./componentsMun/livefeed/Livefeed";
import Homepage from "./componentsMun/homepage/Homepage";
import { NavLink, Switch, Route } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import components from "./components";
import lib from "./lib";

const MunClub = () => {
  return (
    <div className="AWG Hub">
      {/* <Header /> */}
      {/* <Description /> */}
      <Homepage />
      {/* <SlideShow />
      <Subscribers /> */}
      <div className="nav ">
        <NavLink exact to="./lib" activeClassName="active">
           MUN's Library
        </NavLink>
      </div>
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition key={location.key} timeout={300} classNames="fade">
              <Switch>
                <Route exact path="/" component={components} />
                <Route path="./lib" component={lib} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    </div>
  );
};

export default MunClub;
