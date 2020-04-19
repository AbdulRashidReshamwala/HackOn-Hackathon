import React from "react";
import { withRouter } from "react-router-dom";
import ReactRegionSelect from "react-region-select";

class Crop extends React.Component {
  constructor(props) {
    super(props);
    // this.regionRenderer = this.regionRenderer.bind(this);
    this.onChange = this.onChange.bind(this);
    this.regionCallback = this.props.regionCallback.bind(this);
    this.state = {
      regions: []
    };
  }
  onChange(regions) {
    this.setState({
      regions: regions
    });
    this.regionCallback(regions);
  }

  // changeRegionData(index, event) {
  //   const region = this.state.regions[index];
  //   let color;
  //   switch (event.target.value) {
  //     case "1":
  //       color = "rgba(0, 255, 0, 0.5)";
  //       break;
  //     case "2":
  //       color = "rgba(0, 0, 255, 0.5)";
  //       break;
  //     case "3":
  //       color = "rgba(255, 0, 0, 0.5)";
  //       break;
  //     default:
  //       color = "rgba(0, 0, 0, 0.5)";
  //   }

  //   this.onChange([
  //     ...this.state.regions.slice(0, index),
  //     objectAssign({}, region, {
  //       data: objectAssign({}, region.data, { dataType: event.target.value })
  //     }),
  //     ...this.state.regions.slice(index + 1)
  //   ]);
  // }
  regionRenderer(regionProps, thiss) {
    if (!regionProps.isChanging) {
      return (
        <div style={{ position: "absolute", right: 0, bottom: "-1.5em" }}>
          <button
            style={{
              width: "7px",
              height: "7px",
              background: "none"
              // color: "rgba(0,0,0,0)"
            }}
            onClick={() =>
              thiss.setState({
                regions: thiss.state.regions.filter(
                  (_, j) => regionProps.index !== j
                )
              })
            }
          >
            <img
              src="https://lh3.googleusercontent.com/proxy/VH4qkMBuL7lV-7J0wZLgVLvwmct9HqFnfuq5wIuvAKemV30aqWyVrZ9mQvtUfGXhySAjPlBNOtYjpmPjvZIQXEYSBvIP7oXqCHe3mLb2-Lu0hprBiKp91XBzT5kxGfpVk_QGac9C3sA"
              style={{ height: "15px", width: "15px" }}
            />
          </button>
        </div>
      );
    }
  }

  // removeRegion(i) {
  //   // console.log(i);
  //   let r = this.state.regions.filter((_, j) => i != j);
  //   // console.log(r);
  //   this.setState({ regions: r });
  //   // console.log(this.state.regions);
  // }
  render() {
    const regionStyle = {
      background: "rgba(255, 0, 0, 0.5)"
    };

    return (
      <>
        <div className="App">
          <ReactRegionSelect
            maxRegions={12}
            regions={this.state.regions}
            regionStyle={regionStyle}
            constraint
            onChange={this.onChange}
            regionRenderer={p => this.regionRenderer(p, this)}
            style={{ border: "1px solid black" }}
          >
            <img src={this.props.fileURL} width="300px" />
          </ReactRegionSelect>
        </div>
        {/* {this.state.regions.map((_, i) => (
            <button onClick={() => this.removeRegion(i)}>Remove Area {i}</button>
          ))} */}
      </>
    );
  }
}

export default withRouter(Crop);
