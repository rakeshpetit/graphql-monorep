import React, { Component } from "react";

export default class Page extends Component {
  render() {
    return (
      <div>
        <p>I am the page component</p>
        {this.props.children}
      </div>
    );
  }
}
