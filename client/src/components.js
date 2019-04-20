import React, { Component } from "react";
import Header from "./components/layout/Header";
//import Footer from "./components/layout/Footer"
//import { BrowserRouter as Router, Route } from "react-dom"
//import Tools from "./components/Tools"
import Announcements from "./components/announcements/Announcements";
import Faqs from "./components/faqs/Faqs";
import User from "./components/users/User";
import Profile from "./components/users/profile";
import "./App.css";
import Clubs from "./components/clubs/Clubs";
import UserLogin from "./components/users/UsersLogin";
import Divider from "@material-ui/core/Divider";
import "bootstrap/dist/css/bootstrap.min.css";
import MenuAppBar from "./components/layout/MenuAppBar";


const AWGHub = () => {
  return (
    <div className="AWG Hub">
      <UserLogin />
      <Divider variant="middle" />
      <Clubs />
      <Divider variant="middle" />
      <Faqs />
      <Divider variant="middle" />
      {/* <Footer /> */}
      <Announcements />
      <Divider variant="middle" />
      <User />
      <Profile />

    </div>
  );
};

export default AWGHub;
