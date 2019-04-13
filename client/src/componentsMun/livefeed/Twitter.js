import React, { Component } from "react";
var twitterAPI = require("node-twitter-api");

class Twitter extends Component {
  componentDidMount() {
    window.twttr = (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0],
        t = window.twttr || {};
      if (d.getElementById(id)) return t;
      js = d.createElement(s);
      js.id = id;
      js.src = "https://platform.twitter.com/widgets.js";
      fjs.parentNode.insertBefore(js, fjs);

      t._e = [];
      t.ready = function(f) {
        t._e.push(f);
      };

      return t;
    })(document, "script", "twitter-wjs");
  }
  render() {
    return (
      <div>
        <a
          class="twitter-timeline"
          data-width="400"
          data-height="800"
          data-theme="light"
          href="https://twitter.com/GUCMUN?ref_src=twsrc%5Etfw"
        >
          Tweets by GUCMUN
        </a>{" "}
        <script
          async
          src="https://platform.twitter.com/widgets.js"
          charset="utf-8"
        />
        <a
          href="https://twitter.com/GUCMUN?ref_src=twsrc%5Etfw"
          class="twitter-follow-button"
          data-show-count="false"
        >
          Follow @GUCMUN
        </a>
        <script
          async
          src="https://platform.twitter.com/widgets.js"
          charset="utf-8"
        />
      </div>
    );
  }
}

export default Twitter;
