import React, { Component } from "react";
// import { colors } from "@material-ui/core";
// import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
// import purple from "@material-ui/core/colors/purple";
import "./Descriptions.css";
// import axios from "axios";


class Descriptions extends Component {
 constructor() {
   super();
   this.state = {
     mun: []
   };
 }

 componentDidMount() {
  this.refreshDescriptions();
  
 }

 refreshDescriptions() {
  fetch("/api/club_hub/")
    .then(res => res.json())
    .then(clubs => {
      console.log("clubs fetched..", clubs);
      var mun = clubs.data.find(club => club.name === "GUCMUN");
      this.setState({ mun });
    });
}


 
 render() {
   console.log(this.state.mun);
   return (
     <div className="field">
       <div key={this.state.mun._id} >
         <Typography variant="h5" font="Arial" noWrap>
           Description
         </Typography>
         <Typography variant="body1" colors="red" font="Arial">
           {this.state.mun.brief_description}
         </Typography>
       </div>
     </div>
   );
 }
}

export default Descriptions;

