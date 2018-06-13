'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _squeezeboxElement = require('./squeezebox-element');

var _squeezeboxElement2 = _interopRequireDefault(_squeezeboxElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Squeezebox = function (_React$Component) {
  _inherits(Squeezebox, _React$Component);

  function Squeezebox(props) {
    _classCallCheck(this, Squeezebox);

    var _this = _possibleConstructorReturn(this, (Squeezebox.__proto__ || Object.getPrototypeOf(Squeezebox)).call(this, props));

    _this.renderSqueezeboxElement = _this.renderSqueezeboxElement.bind(_this);
    _this.getInitialFrames = _this.getInitialFrames.bind(_this);
    _this.getIntialSettings = _this.getIntialSettings.bind(_this);
    _this.closeAll = _this.closeAll.bind(_this);
    _this.checkAllActive = _this.checkAllActive.bind(_this);

    _this.state = {
      //All of the Current Frames i.e. SqueezeboxElements
      frames: _this.getInitialFrames(),
      // Squeezebox Settings, not SqueezeboxElement Properties.
      settings: _this.getIntialSettings()
    };

    return _this;
  }

  /* Class Methods */


  _createClass(Squeezebox, [{
    key: 'renderSqueezeboxElement',
    value: function renderSqueezeboxElement(frame, index) {
      var _this2 = this;

      var frameStyle = {
        flex: frame.flex || '1',
        transition: this.getTransitionType(this.props.settings.transition),
        textAlign: 'center',
        alignItems: 'center',
        backgroundSize: 'cover',
        justifyContent: 'center',
        backgroundImage: 'url( ' + frame.image + ' )',
        backgroundColor: frame.color,
        backgroundPosition: 'center'
      };

      return _react2.default.createElement(_squeezeboxElement2.default, {
        className: frame.className,
        frame: frame,
        style: frameStyle,
        key: index,
        onClick: function onClick() {
          return _this2.handleClickOf(frame);
        },
        isActive: frame.isActive
      });
    }
  }, {
    key: 'getTransitionType',
    value: function getTransitionType(transition) {
      if (transition) {
        switch (transition) {
          case 'slam':
            return 'flex 0.3s cubic-bezier(.85,.66,0,.1)';
          case 'fast':
            return 'flex 0.3s cubic-bezier(.55,.62,.06,.86)';
          case 'linear':
            return 'flex 0.5s cubic-bezier(0,0,1,1)';
          case 'ease':
            return 'flex 0.5s cubic-bezier(0.25,0.1,0.25,1))';
          case 'ease-in':
            return 'flex 0.5s cubic-bezier(0.42,0,1,1)';
          case 'ease-out':
            return 'flex 0.5s cubic-bezier(0,0,0.58,1)';
          default:
            return transition;
        }
      }
    }

    /* Click Handler of children (SqueezeboxElement's) */

  }, {
    key: 'handleClickOf',
    value: function handleClickOf(frame) {
      // Get all frames from state
      var nframes = this.state.frames;
      // Should we close the active element?
      if (this.state.settings.shouldCloseActiveElement) {
        // Close all the frames.
        nframes = this.closeAll(nframes, frame);
        // Set the frame flex of the clicked frame.
        nframes[frame.index].flex = !frame.isActive ? this.state.settings.frameExpansion : this.state.settings.frameFlex;
        // ...
        nframes[frame.index].isActive = !frame.isActive;
      } else {
        nframes[frame.index].flex = !frame.isActive ? this.state.settings.frameExpansion : this.state.settings.frameFlex;
        nframes[frame.index].isActive = !frame.isActive;

        // Check to see if all frames are active:
        var reset = nframes.every(this.checkAllActive);
        // reset them if they are...
        if (reset) {
          nframes = this.closeAll(nframes, false);
        }
      }
      // update state.
      this.updateCurrent({ frames: nframes });
    }

    //Close the frames by settings their flex to 1, or default frame flex.

  }, {
    key: 'closeAll',
    value: function closeAll(frames, except) {
      var _this3 = this;

      frames.forEach(function (frame, index) {
        if (index === except.index) {
          return;
        }
        frame.flex = _this3.state.settings.frameFlex;
        frame.isActive = false;
      });
      return frames;
    }
  }, {
    key: 'checkAllActive',
    value: function checkAllActive(frame) {
      return frame.isActive === true;
    }

    // Helper function to update state from other functions.

  }, {
    key: 'updateCurrent',
    value: function updateCurrent(state) {
      if (state) {
        this.setState(function () {
          return state;
        });
      }
    }
  }, {
    key: 'setupActiveFrames',
    value: function setupActiveFrames(frames) {
      for (var i = 0; i < frames.length; i++) {
        if (frames[i].isActive) {
          frames[i].flex = this.props.settings.frameExpansion;
        }
      }
      return frames;
    }

    // Get the initial Frames from Props and Set Default keys-value pairs.

  }, {
    key: 'getInitialFrames',
    value: function getInitialFrames() {
      var newFrameStack = [];
      this.props.frames.forEach(function (frame, index) {
        var defaultFrame = {
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
        };
        newFrameStack.push(defaultFrame);
      });

      newFrameStack = this.setupActiveFrames(newFrameStack);

      return newFrameStack;
    }

    // Get the default settings or user settings

  }, {
    key: 'getIntialSettings',
    value: function getIntialSettings() {
      var defaultSettings = {
        // The flex Bais for a single element, 1 = equal widths.
        // see flexbox reference for flex shorthand.
        frameFlex: this.props.settings.frameFlex || 1,
        // How much each Frame Expands onClick or MouseOver.
        frameExpansion: this.props.settings.frameExpansion || 10,
        // Close the active frame when a new frame is clicked.
        shouldCloseActiveElement: this.props.settings.shouldCloseActiveElement || false
      };
      return defaultSettings;
    }

    /* RENDER */

  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      // Default Style:
      var squeezeboxStyle = {
        // Use 100% of width and height of container.
        width: this.props.style.width || '100%',
        height: this.props.style.height || '100%',
        // CSS Properties of flexbox container, ie. The Squeezebox.
        display: this.props.style.display || 'flex',
        overflow: this.props.style.overflow || 'hidden',
        alignItems: this.props.style.alignItems || 'stretch',
        alignContent: this.props.style.alignContent || 'center',
        flexDirection: this.props.style.flexDirection || 'row'
      };

      return _react2.default.createElement(
        'div',
        { className: this.props.className },
        _react2.default.createElement(
          'div',
          { style: squeezeboxStyle },
          this.state.frames.map(function (frame, index) {
            return _this4.renderSqueezeboxElement(_this4.state.frames[index], index);
          })
        )
      );
    }
  }]);

  return Squeezebox;
}(_react2.default.Component);

exports.default = Squeezebox;