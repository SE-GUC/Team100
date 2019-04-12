import React, { Component } from "react";
//import Header from "./componentsMun/layout/Header"
//import Footer from "./components/layout/Footer"
//import { BrowserRouter as Router, Route } from "react-dom"
//import Tools from "./components/Tools"
// import Description from "./componentsMun/descriptions/Descriptions";
import SlideShow from "./componentsMun/slideshow/Slideshow";
import "./App.css";
import Subscribers from "./componentsMun/subscribers/Subscribers";

const MunClub = () => {
  return (
    <div className="AWG Hub">
      {/* <Header /> */}
      {/* <Description /> */}
      <SlideShow />
      <Subscribers />
    </div>
  );
};

export default MunClub;
