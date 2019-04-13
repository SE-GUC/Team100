import React, { Component } from "react";
import Header from "./components/layout/Header";
//import Footer from "./components/layout/Footer"
//import { BrowserRouter as Router, Route } from "react-dom"
//import Tools from "./components/Tools"
import Announcements from "./components/announcements/Announcements";
import SearchTool from "./components/search/SearchTool";
import Faqs from "./components/faqs/Faqs";
import "./App.css";
import Clubs from "./components/clubs/Clubs";
import UserLogin from "./components/users/UsersLogin";

const AWGHub = () => {
  return (
    <div className="AWG Hub">
      <Header />
      <SearchTool />
      <UserLogin />
      <Clubs />
      <Faqs />
      {/* <Footer /> */}
      <Announcements />
    </div>
  );
};

export default AWGHub;
