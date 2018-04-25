import React, { Component } from "react";
import { AppBar } from 'react-toolbox/lib/app_bar';
import { Button } from 'react-toolbox/lib/button'; // Bundled component import

import {PopupRoot} from './popupStyle'

class Popup extends Component {
  state = {
    status: 'Not set',
    url: 'No URL'
  }

  showDiff = () => {
    this.sendInstruction('diff')
  }

  download = () => {
    this.sendInstruction('download')
  }

  sendInstruction = (instruction) => {
    this.setState({
      status: 'One Second'
    })

    chrome.tabs.getSelected(null, (tab) => {
      chrome.tabs.sendRequest(tab.id, {instruction}, (response) => {
         this.setState({status: response.status});
      });
     });
  }
  componentDidMount(){
    chrome.tabs.getSelected(null, (tab) => {
      this.setState({
        url: tab.url
      })
    })
  }
  render () {
    
    return (
      <PopupRoot>
        <AppBar title='Coinspot CSV Downloader for Delta (Alpha)' />
        <Button label="Diff" primary onClick={this.showDiff}/>
        <Button label="Download CSV" primary onClick={this.download}/>
      </PopupRoot>
    );
  }
}

export default Popup;
