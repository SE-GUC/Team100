import { Divider } from "@material-ui/core";
import React, { Component } from "react";
import Hierarchy from "./Hierarchy";
import MV from "./MV";
import Achievements from "./Achievements";

class aboutus extends Component {
render(){

    return(
<div>
<MV/>
<Divider/>
<Hierarchy/>
<Divider/>
<Achievements/>
</div>
    )

    }
}
    export default aboutus;
