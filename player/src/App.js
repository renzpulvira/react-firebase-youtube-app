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
      countList: 0
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

  componentWillMount() {
    const unsubscribe = firebase
      .firestore()
      .collection("queues")
      .onSnapshot(snapshot => {
        const newQueues = snapshot.docs.map(queue => ({
          id: queue.id,
          ...queue.data()
        }));

        this.setState({ countList: newQueues.length });
      });
    return () => unsubscribe();
  }

  // https://www.youtube.com/watch?v=ELrQyUIQkiY
  render() {
    return (
      <React.Fragment>
        <Searchbar search={this.getSearchResults} />
        <Results search={this.state.results} listCount={this.state.countList} />
        {this.state.countList > 0 ? <Queues /> : <p>No list yet</p>}
      </React.Fragment>
    );
  }
}

export default App;
