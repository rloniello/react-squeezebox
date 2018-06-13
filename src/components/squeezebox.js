import React from 'react';
import SqueezeboxElement from './squeezebox-element';

export default class Squeezebox extends React.Component {
  constructor(props){
    super(props);

    this.renderSqueezeboxElement = this.renderSqueezeboxElement.bind(this);
    this.getInitialFrames = this.getInitialFrames.bind(this);
    this.getIntialSettings = this.getIntialSettings.bind(this);
    this.closeAll = this.closeAll.bind(this);
    this.checkAllActive = this.checkAllActive.bind(this);

    this.state = {
      //All of the Current Frames i.e. SqueezeboxElements
      frames: this.getInitialFrames(),
      // Squeezebox Settings, not SqueezeboxElement Properties.
      settings: this.getIntialSettings()
    }

  }

  /* Class Methods */
  renderSqueezeboxElement(frame, index) {

    var frameStyle = {
      flex: frame.flex || '1',
      transition: this.getTransitionType(this.props.settings.transition),
      textAlign: `center`,
      alignItems:`center`,
      backgroundSize: `cover`,
      justifyContent: `center`,
      backgroundImage: `url( ${frame.image} )`,
      backgroundColor: frame.color,
      backgroundPosition: `center`
    }

    return (<SqueezeboxElement
              className={frame.className}
              frame={frame}
              style={frameStyle}
              key={index}
              onClick={() => this.handleClickOf(frame)}
              isActive={ frame.isActive }
              />);
  }

  getTransitionType(transition) {
    if(transition) {
        switch(transition) {
          case 'slam':
            return `flex 0.3s cubic-bezier(.85,.66,0,.1)`
          case 'fast':
            return `flex 0.3s cubic-bezier(.55,.62,.06,.86)`
          case 'linear':
            return `flex 0.5s cubic-bezier(0,0,1,1)`
          case 'ease':
            return `flex 0.5s cubic-bezier(0.25,0.1,0.25,1))`
          case 'ease-in':
            return `flex 0.5s cubic-bezier(0.42,0,1,1)`
          case 'ease-out':
            return `flex 0.5s cubic-bezier(0,0,0.58,1)`
          default:
            return transition
        }
    }
  }

  /* Click Handler of children (SqueezeboxElement's) */
  handleClickOf(frame) {
    // Get all frames from state
    var nframes = this.state.frames;
    // Should we close the active element?
    if (this.state.settings.shouldCloseActiveElement) {
        // Close all the frames.
        nframes = this.closeAll(nframes, frame)
        // Set the frame flex of the clicked frame.
        nframes[frame.index].flex = !frame.isActive ? this.state.settings.frameExpansion : this.state.settings.frameFlex
        // ...
        nframes[frame.index].isActive = !frame.isActive


    } else {
      nframes[frame.index].flex = !frame.isActive ? this.state.settings.frameExpansion : this.state.settings.frameFlex
      nframes[frame.index].isActive = !frame.isActive

      // Check to see if all frames are active:
      const reset = nframes.every(this.checkAllActive)
      // reset them if they are...
      if(reset) {
        nframes = this.closeAll(nframes, false);
      }

    }
    // update state.
    this.updateCurrent({frames: nframes})
  }

  //Close the frames by settings their flex to 1, or default frame flex.
  closeAll(frames, except) {
     frames.forEach((frame, index) => {
        if (index === except.index) {
          return
        }
        frame.flex = this.state.settings.frameFlex;
        frame.isActive = false;
      })
     return frames
  }

  checkAllActive(frame) {
    return frame.isActive === true
  }

  // Helper function to update state from other functions.
  updateCurrent(state) {
    if (state) {
      this.setState(() => {
        return state
      })
    }
  }

  setupActiveFrames(frames) {
    for(var i = 0; i < frames.length; i++ ){
      if(frames[i].isActive) {
        frames[i].flex = this.props.settings.frameExpansion
      }
    }
    return frames
  }


  // Get the initial Frames from Props and Set Default keys-value pairs.
  getInitialFrames() {
    var newFrameStack = []
      this.props.frames.forEach((frame, index) =>  {
        let defaultFrame = {
          // The index of the child realitive to sibling frames.
          index: index,
          isActive: frame.isActive || false,
          // default classname for SqueezeboxElement's, ie frames.
          className: frame.className || 'squeezeboxElement',
          // Any single child the frame may have.
          child: frame.child || null,
          // Background Image, set with CSS
          image: frame.image || '',
          // background Color, set with CSS, Background Image overrides.
          color: frame.color || '',
          // CSS Flex shorthand property for the frame,
          // defaults to 1, equal widths
          flex: frame.flex || 1
        }
        newFrameStack.push(defaultFrame)
      });

      newFrameStack = this.setupActiveFrames(newFrameStack)

    return newFrameStack;
  }



  // Get the default settings or user settings
  getIntialSettings() {
    var defaultSettings = {
      // The flex Bais for a single element, 1 = equal widths.
      // see flexbox reference for flex shorthand.
      frameFlex: this.props.settings.frameFlex || 1,
      // How much each Frame Expands onClick or MouseOver.
      frameExpansion: this.props.settings.frameExpansion || 10,
      // Close the active frame when a new frame is clicked.
      shouldCloseActiveElement: this.props.settings.shouldCloseActiveElement || false,
    }
    return defaultSettings
  }


  /* RENDER */
  render() {
    // Default Style:
    const squeezeboxStyle =  {
            // Use 100% of width and height of container.
            width: this.props.style.width || '100%',
            height: this.props.style.height || '100%',
            // CSS Properties of flexbox container, ie. The Squeezebox.
            display: this.props.style.display || `flex`,
            overflow: this.props.style.overflow || `hidden`,
            alignItems: this.props.style.alignItems || `stretch`,
            alignContent: this.props.style.alignContent || `center`,
            flexDirection: this.props.style.flexDirection || `row`
          }

    return (
        <div className={this.props.className}>
          <div style={squeezeboxStyle}>
            {this.state.frames.map((frame, index) => {
              return (this.renderSqueezeboxElement(this.state.frames[index], index))
            })}
          </div>
        </div>
      );
    }
}
