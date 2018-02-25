import React, { Component } from "react";

import Aux from '../../hoc/Aux/Aux';
import Greetings from '../../containers/Greetings/Greetings';


class Popup extends Component {
  render () {
    return (
      <Aux>
        <Greetings />
      </Aux>
    );
  }
}

export default Popup;
