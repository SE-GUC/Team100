import React, { Component } from "react";
import InstagramEmbed from "react-instagram-embed";

class Instagram extends Component {
  render() {
    return (
      <InstagramEmbed
        url="https://www.instagram.com/p/Bv7P2QtA8uG/"
        maxWidth={320}
        hideCaption={false}
        containerTagName="div"
        protocol=""
        injectScript
        onLoading={() => {}}
        onSuccess={() => {}}
        onAfterRender={() => {}}
        onFailure={() => {}}
      />
    );
  }
}

export default Instagram;
