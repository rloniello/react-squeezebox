import React from 'react';
import { render} from 'react-dom';
import Squeezebox from '../../src/components/squeezebox';
import './simple.css';

const App = () => (
  <div>
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
      image: 'example/src/imgs/rainbow/orange.png',
    },
    {
      image: 'example/src/imgs/rainbow/yellow.png',
    },
    {
      image: 'example/src/imgs/rainbow/green.png',
    },
    {
      image: 'example/src/imgs/rainbow/blue.png',
    }
  ]}
  settings = {{
    shouldCloseActiveElement: false,
    frameFlex: 1,
    frameExpansion: 15,
    transition: 'fast'
   }}
   />

   <br />

   <Squeezebox

   className={'first'}

   style={{
     height: '25vh'
   }}

   frames={[
     {
       image: 'example/src/imgs/rainbow/red.png',
     },
     {
       image: 'example/src/imgs/rainbow/green.png',
     },
     {
       image: 'example/src/imgs/rainbow/blue.png',
     }
   ]}
   settings = {{
     shouldCloseActiveElement: true,
     frameFlex: 1,
     frameExpansion: 12,
     transition: 'ease-out'
    }}
    />

  </div>
);
render(<App />, document.getElementById("root"));
