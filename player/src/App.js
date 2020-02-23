import React from "react";
import ReactPlayer from "react-player";
import Results from "./components/Results";
import Searchbar from "./components/Searchbar";
import Queues from "./components/Queues";
import firebase from "firebase";
import "firebase/firestore";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      isPlaying: false,
      results: [],
      term: "",
      queues: []
    };
  }

  getSearchResults = childResults => {
    this.setState({ results: childResults });
  };

  componentDidUpdate() {
    console.warn("New Results Found");
  }

  componentWillMount() {
    const unsubscribe = firebase
      .firestore()
      .collection("queues")
      .orderBy("timestamp", "asc")
      .onSnapshot(snapshot => {
        const newQueues = snapshot.docs.map(queue => ({
          id: queue.id,
          ...queue.data()
        }));

        this.setState({
          queues: newQueues
        });
      });
    return () => unsubscribe();
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
        <Results searchResults={this.state.results} />
        <Queues />
      </React.Fragment>
    );
  }
}

export default App;
