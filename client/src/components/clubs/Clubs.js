import React, { Component } from "react";
import { AppRegistry, View } from "react";
import { Fade } from "react-slideshow-image";

const fadeImages = [
  "src/components/clubs/image2vector.svg"
  // 'images/slide_3.jpg',
  // 'images/slide_4.jpg'
];

const fadeProperties = {
  duration: 5000,
  transitionDuration: 500,
  infinite: false,
  indicators: true
  //  arrows: true
};

const Slideshow = () => {
  return (
    <Fade {...fadeProperties}>
    <h1>sdfghjkl</h1> 
      <div className="each-fade">
        <div className="image-container">
          <img src={fadeImages[0]} />
        </div>
        <h2>First Slide</h2>
      </div>
      {/* <div className="each-slide">
          <div style={{'backgroundImage': `url(${slideImages[1]})`}}>
            <span>Slide 2</span>
          </div>
        </div>
        <div className="each-slide">
          <div style={{'backgroundImage': `url(${slideImages[2]})`}}>
            <span>Slide 3</span>
          </div>
        </div> */}
    </Fade>
  );
};

function componentDidMount(){
  console.log(fetch("/api/clubhub/"));
}

class Clubs extends Component {
  render() {
    return( 
      <Fade {...fadeProperties}>
      <h1>Clubs</h1>
      <div className="each-fade">
        <div className="image-container">
          <img src={fadeImages[0]} />
        </div>
        <h2>Slide 1</h2>
      </div>
      </Fade>
    // <div>

    // <h1>SlideShow</h1>
    // </div>
    );
  }
}

export default Clubs;
