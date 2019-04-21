import React, { Component } from "react";
import hierarchy from "../../images/hierarchy.jpg";
import japboard from "../../images/japboard.jpg";



const fadeImages = [hierarchy,japboard];

class Hierarchy extends Component {
 constructor(props) {
   super(props);
   this.state = {
     hierarchy: []
   };
 }
 componentDidMount() {
   this.refreshHierarchy();
 }

 refreshHierarchy() {
   fetch("/api/hierarchy")
     .then(res => res.json())
     .then(hierarchy => {
       console.log("hierarchy fetched..", hierarchy);
       this.setState({ hierarchy: hierarchy.data });
     });
 }

 render() {
   return (
     <div>
              <h1>GUCMUN Hierarchy</h1>
        <img
             style={{ width: 900, height: 400 }}
             src={fadeImages[0]}
             alt="img"
           />
       <img
             style={{ width: 900, height: 400 }}
             src={fadeImages[1]}
             alt="img"
           />
      {/*<container>
       {this.state.hierarchy.map(her => (
         <div key={her._id}>
           <li>
             {her.position},{her.name}
           </li>
         </div>
       ))}
       </container>*/}
     </div>
   );
 }
}
export default Hierarchy;

