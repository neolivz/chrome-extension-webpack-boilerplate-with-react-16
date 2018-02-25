import React, { Component } from 'react';

import icon from '../../assets/images/icon-128.png';
import './Greetings.css';

class Greetings extends Component {
  state = {
    greetings: 'Hello devs!'
  }
    
  render () {
    return (
      <div className="Greetings">
        <h1>{this.state.greetings}</h1>
        <h3>This extension is built using React 16+</h3>
        <h3>Enjoy!</h3>
        <img src={icon} alt="icon"/>
      </div>
    )
  }
};

export default Greetings;