import React, { Component } from "react";
//import { AppRegistry, View } from "react";
import { Fade } from "react-slideshow-image";
//import image1 from "../../images/1.jpg";
import image2 from "../../images/2.jpg";
import image3 from "../../images/3.jpg";
import image4 from "../../images/image4.jpg";
import image5 from "../../images/image5.jpg";
import axios from "../../axiosInstance";

const fadeProperties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: false,
  indicators: true
};

const fadeImages = [image2, image3, image4,image5];

class Slideshow extends Component {
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
    axios.get("/club_hub").then(res => {
      console.log(res.data);
      this.setState({
        club_hub: res.data.data
      });
    });
  }

  render() {
    return (
      <Fade {...fadeProperties}>
        {this.state.club_hub.map((each, index) => (
          <div key={each._id}>
            <img
              key={index}
              style={{ width: 900, height: 400 }}
              src={fadeImages[index]}
              alt="img"
            />
          </div>
        ))}
      </Fade>
    );
  }
}
export default Slideshow;
