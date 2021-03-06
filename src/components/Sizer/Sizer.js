import React, { Component } from "react";

export default class Sizer extends Component {
  state = {
    boundingClientRect: undefined,
    resize: false,
    render: false
  };

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions = () => {
    this.setState({
      boundingClientRect: this.img.getBoundingClientRect(),
    });
  };

  onImgLoad = ({ target: img }) => {
    this.setState({
      boundingClientRect: this.img.getBoundingClientRect(),
      render: true
    });
  };

  render() {
    return (
      <div style={{ textAlign: "center", position: "relative" }}>
        <img
          ref={el => (this.img = el)}
          style={{
            visibility: "hidden",
            width: "100%",
            maxHeight: "80vh",
            objectFit: "cover",
            position: "absolute",
            left: "0"
          }}
          onLoad={this.onImgLoad}
          src="img.jpg"
          alt="Dynamic"
        />
        <div>
          {this.state.render &&
            React.cloneElement(this.props.children, {
              boundingClientRect: this.state.boundingClientRect,
            })}
        </div>
      </div>
    );
  }
}
