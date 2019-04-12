import React, { Component } from "react"
import Header from "./components/layout/Header"
//import Footer from "./components/layout/Footer"
//import { BrowserRouter as Router, Route } from "react-dom"
//import Tools from "./components/Tools"
// import Announcements from "./components/announcements/Announcements"
// import SearchTool from "./components/search/SearchTool"
// import Faqs from "./components/faqs/Faqs"
import "./App.css"
//import Clubs from "./components/clubs/Clubs"
import Users from "./components/users/Users"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        {/* <SearchTool />
        <Clubs />
        <Faqs /> */}
        {/* <Footer /> */}
        {/* <Announcements /> */}
        <Users />
      </div>
    )
  }
}
export default App
