import React, { Component } from "react";

export default class Sizer extends Component {
  state = {
    width: undefined,
    height: undefined,
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
      height: this.img.offsetHeight,
      width: this.img.offsetWidth
    });
  };

  onImgLoad = ({ target: img }) => {
    this.setState({
      height: img.offsetHeight,
      width: img.offsetWidth,
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
          alt="User-selected"
        />
        <div>
          {this.state.render &&
            React.cloneElement(this.props.children, {
              width: this.state.width,
              height: this.state.height
            })}
        </div>
      </div>
    );
  }
}
