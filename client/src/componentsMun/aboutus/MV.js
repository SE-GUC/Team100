import React, { Component } from "react";
import { colors } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import purple from "@material-ui/core/colors/purple";
import "./MV.css";
import axios from "axios";

/*const styles = theme => ({
 color: {
   accent: purple["A200"] // #E040FB
 }
});*/

class MV extends Component {
 constructor() {
   super();
   this.state = {
     mun: []
   };
 }

 componentDidMount() {
  this.refreshMV();
  
 }

 refreshMV() {
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
           Vision
         </Typography>

         <Typography variant="h7" colors="red" font="Arial">
           {this.state.mun.vision}
         </Typography>
         <Typography variant="h5" font="Arial">
           Mission
         </Typography>
         <Typography variant="h7" font="Roboto">
           {this.state.mun.mission}
         </Typography>
       </div>
     </div>
   );
 }
}

export default MV;

