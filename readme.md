# React Squeezebox

### About

**React Squeezebox** is a lightweight and versatile 'accordion-style' flexbox container built for React. *React Squeezebox* makes it easy to create collapsible 'panes' that can hold other component, images, text and much more!


View the [Demo]() & [Get Started!]()
___

### Installing

```bash
$ npm install react-squeezebox
```
____

### Usage

```js
<Squeezebox className={} style={} frames={[{},{}]} settings={} />
```

#### Properties and Attributes:
**className** & **style**
> The CSS Class name of the Squeezebox container.
> And / Or,
> use the Inline style of the Squeezebox container (div)


**Frames**
> An Array of `frame` objects, each representing a different flex panel.

**frame**

```js
  frame = {
    // Frames are not active ie Expanded by default
    isActive: frame.isActive || false,
    // default classname for SqueezeboxElement's, ie frames.
    className: frame.className || 'squeezeboxElement',
    // Any single child component the frame may have.
    child: frame.child || null,
    // Background Image, set with CSS
    image: frame.image || '',
    // background Color, set with CSS, Background Image overrides.
    color: frame.color || '',
    // CSS Flex shorthand property for the frame,
    // defaults to 1, equal widths
    flex: frame.flex || 1
  }
  ```

**Settings**
> Settings of the behavior of the squeezebox component

```js
settings = {
  // Should the previously active frames close when a new frame is opened ?
  shouldCloseActiveElement: false,
  // Default Flexbox Flex property for each frame
  frameFlex: 1,
  // How much should each frame expand when open?
  frameExpansion: 15,
  // CSS Transition when the frame becomes active:
  // Here are some Built in types,

  // switch(transition) {
  //  case 'slam':
  //    return `flex 0.3s cubic-bezier(.85,.66,0,.1)`
  //  case 'fast':
  //    return `flex 0.3s cubic-bezier(.55,.62,.06,.86)`
  //  case 'linear':
  //    return `flex 0.5s cubic-bezier(0,0,1,1)`
  //  case 'ease':
  //    return `flex 0.5s cubic-bezier(0.25,0.1,0.25,1))`
  //  case 'ease-in':
  //    return `flex 0.5s cubic-bezier(0.42,0,1,1)`
  //  case 'ease-out':
  //    return `flex 0.5s cubic-bezier(0,0,0.58,1)`
  //  default:
  //    return transition
  //}

  //You can define your own, i.e.
  //transition: 'flex 0.5s cubic-bezier(0,0,0.58,1)'

  //Otherwise the transition will be immediate!

  transition: 'ease-out'
 }
```


**Example**
```js
<Squeezebox

className={'yourClassName'}

style={{
  height: '33vh'
}}

frames={[
  {
    color: '#FF2222',
    className: 'someclass'
    child: <MyChildComponent />
  },
  {
    color: '#FF2222', // Images override color
    image: './imgs/rainbow/green.png',
  },
  {
    image: './imgs/rainbow/blue.png',
    isActive: true
  },
  {
    image: './imgs/rainbow/red.png',
  }
]}
settings = {{
  shouldCloseActiveElement: true,
  frameFlex: 1,
  frameExpansion: 10,
  transition: 'fast'
 }}
 />

```
