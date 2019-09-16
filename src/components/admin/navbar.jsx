import React, { Component } from 'react';

class Navbar extends Component {
    state = {  }
    render() { 
        return ( <ul className="horizontal">
            <li className="listItem"><a className="active" href="#home">Login Email Address</a></li>
          </ul> );
    }
}
 
export default Navbar;