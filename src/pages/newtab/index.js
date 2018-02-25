import React from "react";
import ReactDOM from 'react-dom';

import Newtab from './Newtab';
import './index.css';


const app = (
  <Newtab />
);

ReactDOM.render(app, window.document.querySelector("#app-container"));
