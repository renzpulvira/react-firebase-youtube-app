import React from "react";
import ReactPlayer from "react-player";
import Results from "./components/Results";
import Searchbar from "./components/Searchbar";
import { firebaseConfig } from "./config/Config";
import firebase from "firebase/app";
import "firebase/firestore";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      isPlaying: false,
      results: [],
      term: ""
    };
  }

  getSearchResults = childResults => {
    this.setState({ results: childResults });
  };

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
        <Results
          style={{ display: "inline-block", padding: "0px", margin: "0px" }}
          search={this.state.results}
        />
      </React.Fragment>
    );
  }
}

export default App;
