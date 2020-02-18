import React from "react";
import ReactPlayer from "react-player";
import Results from "./components/Results";
import Searchbar from "./components/Searchbar";
import Test from "./components/Test";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isPlaying: false,
      results: [],
      term: ""
    };
  }

  toggleButton() {
    !this.state.isPlaying
      ? this.setState({ isPlaying: true })
      : this.setState({ isPlaying: false });
  }

  getSearchResults = childResults => {
    this.setState({ results: childResults });
  };

  returnResults() {
    this.state.results.map(x => x);
  }

  componentDidUpdate() {
    console.warn("New Results Found");
  }

  renderPlayer(ytId) {
    return (
      <div>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${ytId}`}
          playing={this.state.isPlaying}
        />
        <button onClick={() => this.setState({ isPlaying: true })}>Play</button>
        <button onClick={() => this.setState({ isPlaying: false })}>
          Pause
        </button>
      </div>
    );
  }

  // https://www.youtube.com/watch?v=ELrQyUIQkiY
  render() {
    return (
      <React.Fragment>
        <Searchbar search={this.getSearchResults} />
        {/* <Results search={this.state.results} /> */}
        <Results
          style={{ display: "inline-block", padding: "0px", margin: "0px" }}
          search={this.state.results}
        />
        {/* <ul style={{ display: "inline-block", padding: "0px", margin: "0px" }}>
          {this.state.results.map(x => (
            <li style={{ display: "inline-block" }}>
              <img src={x.thumbs}></img>
            </li>
          ))}
        </ul> */}
        {this.state.results.length > 0
          ? this.renderPlayer(this.state.results[0].videoId)
          : "No Data yet"}
      </React.Fragment>
    );
  }
}

export default App;
