import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Squeezebox from 'react-squeezebox';

// Images
const orangeImage = require('./imgs/rainbow/orange.png');
const yellowImage = require('./imgs/rainbow/yellow.png');
const greeenImage = require('./imgs/rainbow/green.png');
const blueImage  = require('./imgs/rainbow/blue.png');

class App extends Component {
  constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    console.log('changed');
  }

  render() {

    return (
      <Squeezebox

      className={'first'}

      style={{
        height: '33vh'
      }}

      frames={[
        {
          color: '#FF2222',
          className: 'someclass'
        },
        {
          image: orangeImage,
        },
        {
          image: yellowImage,
        },
        {
          image: greeenImage,
        },
        {
          image: blueImage,
        }
      ]}
      settings = {{
        shouldCloseActiveElement: false,
        frameFlex: 1,
        frameExpansion: 15,
        transition: 'fast'
       }}
       />
    );
  }
}

export default App;
