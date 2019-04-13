import React from "react"
//import {Link} from 'react-dom';
function Footer() {
  return (
    <footer style={style}>
      <h1>Copy Rights</h1>
    </footer>
  )
}

var style = {
  background: "#333",
  color: "#fff",
  borderTop: "1px solid #E7E7E7",
  textAlign: "center",
  padding: "20px",
  position: "fixed",
  left: "0",
  bottom: "0",
  height: "40px",
  width: "100%"
}

export default Footer
