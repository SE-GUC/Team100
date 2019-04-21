import React, { Component } from "react";
//import { AppRegistry, View } from "react";
import { Fade } from "react-slideshow-image";
import gucmun from "../../images/image2vector.svg";
import nebny from "../../images/download.jpg";
import VGS from "../../images/VGS.png";
import TIQ from "../../images/TIQ.png";

const fadeProperties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: false,
  indicators: true
};

const fadeImages = [nebny, gucmun,VGS,TIQ];

class Clubs extends Component {
  constructor() {
    super();
    this.state = {
      club_hub: []
    };
  }

  componentDidMount() {
    this.refreshClubs();
  }

  refreshClubs() {
    fetch("/api/club_hub")
      .then(res => res.json())
      .then(club_hub => {
        console.log("clubs fetched..", club_hub);
        this.setState({ club_hub: club_hub.data });
      });
  }

  render() {
    return (
      <Fade {...fadeProperties}>
        {this.state.club_hub.map((each, index) => (
          <div key={each._id}>
            <img
              key={index}
              style={{ width: 300, height: 300 }}
              src={fadeImages[index]}
              alt="img"
            />
            <p>{each.brief_description}</p>
          </div>
        ))}
      </Fade>
    );
  }
}

export default Clubs;
