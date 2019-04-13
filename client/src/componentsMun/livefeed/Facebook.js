/*global FB*/
import React, { Component } from "react";

class Facebook extends Component {
  componentDidMount() {
    console.log("login mount");
    window.fbAsyncInit = function() {
      FB.init({
        appId: "320866754951228",
        xfbml: true,
        version: "v2.6"
      });

      FB.getLoginStatus(function(response) {
        //this.statusChangeCallback(response);
      });
    };

    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }
  render() {
    return (
      <div>
        <h1>Facebook</h1>
        <script async defer src="https://connect.facebook.net/en_US/sdk.js" />
        <div id="fb-root" />
        <script
          async
          defer
          crossorigin="anonymous"
          src="https://connect.facebook.net/ar_AR/sdk.js#xfbml=1&version=v3.2"
        />
        <div
          class="fb-page"
          data-href="https://www.facebook.com/GUCMUN/"
          data-tabs="timeline,events,messages"
          data-small-header="false"
          data-adapt-container-width="true"
          data-hide-cover="false"
          data-show-facepile="true"
        >
          <blockquote
            cite="https://www.facebook.com/facebook"
            class="fb-xfbml-parse-ignore"
          >
            <a href="https://www.facebook.com/facebook">‏‎Facebook‎‏</a>
          </blockquote>
        </div>
        {/* <div class="fb-page" 
  data-href="https://www.facebook.com/GUCMUN/"
  data-width="380" 
  data-hide-cover="false"
  data-show-facepile="false"></div> */}
      </div>
    );
  }
}

export default Facebook;
// 