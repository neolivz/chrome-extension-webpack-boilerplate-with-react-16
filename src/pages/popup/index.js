import React from "react";
import ReactDOM from 'react-dom';

import Popup from './Popup';
import './index.css';


const app = (
  <Popup />
);

ReactDOM.render(app, window.document.querySelector("#app-container"));
