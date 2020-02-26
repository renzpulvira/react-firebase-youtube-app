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

  callLatestQueues() {
    const unsubscribe = firebase
      .firestore()
      .collection("queues")
      .doc("availQueues")
      .get()
      .then(doc => {
        // TODO: Refactor code
        [doc.data()].map(x => this.setState({ queues: x.queueLists }));
      });
    return () => unsubscribe();
  }

  getSearchResults = childResults => {
    this.setState({ results: childResults });
  };

  componentDidUpdate(prevData) {
    // console.warn("New Results Found");
    if (this.state.queues !== prevData) {
      this.callLatestQueues();
    }
  }

  componentWillMount() {
    firebase
      .firestore()
      .collection("queues")
      .doc("availQueues")
      .set({
        queueLists: [
          {
            videoId: "fBNz5xF-Kx4",
            videoThumbs: "https://i.ytimg.com/vi/fBNz5xF-Kx4/mqdefault.jpg",
            videoTitle: "Node.js Crash Course"
          }
        ]
      });
  }

  componentDidMount() {
    this.callLatestQueues();
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
        {/* <Searchbar search={this.getSearchResults} /> */}
        <Results
          searchResults={[
            {
              videoId: "TlB_eWDSMt4",
              title:
                "Node.js Tutorial for Beginners: Learn Node in 1 Hour | Mosh",
              thumbs: "https://i.ytimg.com/vi/TlB_eWDSMt4/mqdefault.jpg"
            },
            {
              videoId: "fBNz5xF-Kx4",
              title: "Node.js Crash Course",
              thumbs: "https://i.ytimg.com/vi/fBNz5xF-Kx4/mqdefault.jpg"
            },
            {
              videoId: "pU9Q6oiQNd0",
              title:
                "What is Node.js Exactly? - a beginners introduction to Nodejs",
              thumbs: "https://i.ytimg.com/vi/pU9Q6oiQNd0/mqdefault.jpg"
            },
            {
              videoId: "RLtyhwFtXQA",
              title: "Learn Node.js - Full Tutorial for Beginners",
              thumbs: "https://i.ytimg.com/vi/RLtyhwFtXQA/mqdefault.jpg"
            },
            {
              videoId: "JnvKXcSI7yk",
              title:
                "Node JS Full Course - Learn Node.js in 7 Hours | Node.js Tutorial for Beginners | Edureka",
              thumbs: "https://i.ytimg.com/vi/JnvKXcSI7yk/mqdefault.jpg"
            },
            {
              videoId: "U8XF6AFGqlc",
              title: "Node.js Tutorial For Absolute Beginners",
              thumbs: "https://i.ytimg.com/vi/U8XF6AFGqlc/mqdefault.jpg"
            },
            {
              videoId: "M3BM9TB-8yA",
              title: "10 Things I Regret About Node.js - Ryan Dahl - JSConf EU",
              thumbs: "https://i.ytimg.com/vi/M3BM9TB-8yA/mqdefault.jpg"
            },
            {
              videoId: "uVwtVBpw7RQ",
              title: "What is Node.js? | Mosh",
              thumbs: "https://i.ytimg.com/vi/uVwtVBpw7RQ/mqdefault.jpg"
            }
          ]}
          dataRef={this.state.queues}
        />
        {// TODO: Refactor Code
        this.state.queues && this.state.queues.length ? (
          <Queues dataRef={this.state.queues} />
        ) : (
          <div>No Data yet</div>
        )}
        {/* <Queues dataRef={this.state.queues} /> */}
      </React.Fragment>
    );
  }
}

export default App;
