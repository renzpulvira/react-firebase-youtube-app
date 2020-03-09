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

  componentDidMount() {
    this.callLatestQueues();
  }

  renderPlayer(ytId) {
    return (
      <div className="compo-player">
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${ytId}`}
          playing={this.state.isPlaying}
        />
        <button onClick={() => this.setState({ isPlaying: true })}>Play</button>
        <button onClick={() => this.setState({ isPlaying: false })}>Pause</button>
      </div>
    );
  }

  // https://www.youtube.com/watch?v=ELrQyUIQkiY
  render() {
    return (
      <React.Fragment>
        <Searchbar search={this.getSearchResults} />

        <Results
          searchResults={this.state.results}
          // searchResults={[
          //   {
          //     video: "uoLwyWi7Z4c",
          //     thumbs: "https://i.ytimg.com/vi/uoLwyWi7Z4c/mqdefault.jpg",
          //     title: "The Japanese House - Something Has to Change"
          //   },
          //   {
          //     video: "uoLwyWi7Z4c",
          //     thumbs: "https://i.ytimg.com/vi/uoLwyWi7Z4c/mqdefault.jpg",
          //     title: "The Japanese House - Something Has to Change"
          //   },
          //   {
          //     video: "uoLwyWi7Z4c",
          //     thumbs: "https://i.ytimg.com/vi/uoLwyWi7Z4c/mqdefault.jpg",
          //     title: "The Japanese House - Something Has to Change"
          //   },
          //   {
          //     video: "uoLwyWi7Z4c",
          //     thumbs: "https://i.ytimg.com/vi/uoLwyWi7Z4c/mqdefault.jpg",
          //     title: "The Japanese House - Something Has to Change"
          //   },
          //   {
          //     video: "uoLwyWi7Z4c",
          //     thumbs: "https://i.ytimg.com/vi/uoLwyWi7Z4c/mqdefault.jpg",
          //     title: "The Japanese House - Something Has to Change"
          //   },
          //   {
          //     video: "uoLwyWi7Z4c",
          //     thumbs: "https://i.ytimg.com/vi/uoLwyWi7Z4c/mqdefault.jpg",
          //     title: "The Japanese House - Something Has to Change"
          //   },
          //   {
          //     video: "uoLwyWi7Z4c",
          //     thumbs: "https://i.ytimg.com/vi/uoLwyWi7Z4c/mqdefault.jpg",
          //     title: "The Japanese House - Something Has to Change"
          //   },
          //   {
          //     video: "uoLwyWi7Z4c",
          //     thumbs: "https://i.ytimg.com/vi/uoLwyWi7Z4c/mqdefault.jpg",
          //     title: "The Japanese House - Something Has to Change"
          //   },
          //   {
          //     video: "uoLwyWi7Z4c",
          //     thumbs: "https://i.ytimg.com/vi/uoLwyWi7Z4c/mqdefault.jpg",
          //     title: "The Japanese House - Something Has to Change"
          //   },
          //   {
          //     video: "uoLwyWi7Z4c",
          //     thumbs: "https://i.ytimg.com/vi/uoLwyWi7Z4c/mqdefault.jpg",
          //     title: "The Japanese House - Something Has to Change"
          //   },
          //   {
          //     video: "uoLwyWi7Z4c",
          //     thumbs: "https://i.ytimg.com/vi/uoLwyWi7Z4c/mqdefault.jpg",
          //     title: "The Japanese House - Something Has to Change"
          //   },
          //   {
          //     video: "uoLwyWi7Z4c",
          //     thumbs: "https://i.ytimg.com/vi/uoLwyWi7Z4c/mqdefault.jpg",
          //     title: "The Japanese House - Something Has to Change"
          //   },
          //   {
          //     video: "uoLwyWi7Z4c",
          //     thumbs: "https://i.ytimg.com/vi/uoLwyWi7Z4c/mqdefault.jpg",
          //     title: "The Japanese House - Something Has to Change"
          //   },
          //   {
          //     video: "uoLwyWi7Z4c",
          //     thumbs: "https://i.ytimg.com/vi/uoLwyWi7Z4c/mqdefault.jpg",
          //     title: "The Japanese House - Something Has to Change"
          //   }
          // ]}
          dataRef={this.state.queues}
        />

        {// TODO: Refactor Code
        this.state.queues && this.state.queues.length ? (
          <div className="queue-player-wrapper">
            <Queues dataRef={this.state.queues} />
            {this.renderPlayer(this.state.queues[0].videoId)}
          </div>
        ) : (
          <div></div>
        )}
      </React.Fragment>
    );
  }
}

export default App;
