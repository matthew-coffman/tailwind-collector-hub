import React from "react";
import ReactDOM from "react-dom";

import "external-svg-loader";

export class SVGLoader extends React.Component {
  render() {
    return (
      <svg
        data-src="https://s2.svgbox.net/materialui.svg?ic=mail"
        fill="currentColor"
        width="50px"
        height="50px"
        style={{
          color: "red"
        }}
      />
    );
  }
}

ReactDOM.render(<SVGLoader />, document.getElementById("svg-container"));