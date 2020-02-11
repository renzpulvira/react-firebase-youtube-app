import React from "react";
import ReactPlayer from "react-player";
import Searchbar from "./components/Searchbar";

class App extends React.Component {
  state = {
    isPlaying: false,
    results: []
  };

  toggleButton() {
    !this.state.isPlaying
      ? this.setState({ isPlaying: true })
      : this.setState({ isPlaying: false });
  }

  getSearchResults = childResults => {
    this.setState({ results: childResults });
  };

  render() {
    return (
      <React.Fragment>
        <Searchbar search={this.getSearchResults} />
        {this.state.results}
      </React.Fragment>
    );
  }
}

export default App;
