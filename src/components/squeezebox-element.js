import React from 'react';

export default class Element extends React.Component {
    /* RENDER */
  render() {
    
    const activeClassName = this.props.className + ' squeezebox-active'

    return (
      <div className={this.props.isActive ? activeClassName : this.props.frame.className} style={ this.props.style } onClick={this.props.onClick}>
          {this.props.frame.child}
      </div>
    );
  }
}
