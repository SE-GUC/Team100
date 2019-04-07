import React, { Component } from "react";
import { AppRegistry, View } from "react";
import { Fade } from "react-slideshow-image";
import image from "../../images/image2vector.svg";


const fadeProperties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: false,
  indicators: true
};

const fadeImages = [image];

class Clubs extends Component{
  constructor(){
    super();
    this.state = {
      club_hub: []
    };
  }

  componentDidMount(){
    this.refreshClubs();
  }

  refreshClubs(){
    fetch("/api/club_hub/")
    .then(res => res.json())
    .then( club_hub => {
  this.setState({ club_hub:club_hub.data})
    });
  }
  render(){
    return(
      <Fade {...fadeProperties}>
      <h1>Clubs</h1>
      {this.state.club_hub.map((each,index) => (
        <div>
          <img key={index} style={{width:200, height:300}}
          src={fadeImages[index]}  alt="img"/>
        </div>
      ))}
        </Fade>
    )
  }
}

export default Clubs
