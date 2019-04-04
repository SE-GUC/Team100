import React from 'react';
import {Link} from 'react-dom';
function Header(){
    return (
       
            <header style={headerStyle}>
            <h1>AWG Hub</h1>
            <button variant="link" >Sign in</button> | <button variant="link">Sign up</button>

        </header>
    )
}

const headerStyle={
    background: '#333',
    color: '#fff',
    textAlign: 'center',
    padding: '10px',

    
}






 export default Header