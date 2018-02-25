import React, { Component } from "react";

import Aux from '../../hoc/Aux/Aux';
import Greetings from '../../containers/Greetings/Greetings';


class Newtab extends Component {
  render () {
    return (
      <Aux>
        <Greetings reactVersion="16+" />
      </Aux>
    );
  }
}

export default Newtab;
