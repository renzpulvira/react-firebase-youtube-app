import React from "react";
import ReactPlayer from "react-player";
import Results from "./components/Results";
import Searchbar from "./components/Searchbar";
import Queues from "./components/Queues";
import firebase from "firebase";
import "firebase/firestore";
import Fire from "./functions/firestore-methods";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      isPlaying: false,
      results: [],
      term: "",
      playing: {},
      queues: []
    };
  }

  getSearchResults = childResults => {
    this.setState({ results: childResults });
  };

  componentDidUpdate(prevData) {
    // console.warn("New Results Found");
    if (this.state.queues !== prevData || this.state.playing != prevData) {
      this.callLatestQueues();
    }
  }

  componentDidMount() {
    this.callLatestQueues();
  }

  callLatestQueues() {
    const fire = new Fire("queues", "availQueues", doc => {
      [doc.data()].map(x => {
        this.setState({ queues: x.queueLists });
      });
    });
    fire.getQueues();
    // TODO: Refactor code
    // const unsubscribe = firebase
    //   .firestore()
    //   .collection("queues")
    //   .doc("availQueues")
    //   .get()
    //   .then(doc => {
    //     // TODO: Refactor code
    //     [doc.data()].map(x => this.setState({ queues: x.queueLists }));
    //   });
    // return () => unsubscribe();
  }

  prepNextVideo() {
    var tempQueue = this.state.queues;
    var bin = tempQueue.shift();
    this.setState({
      playing: bin,
      queues: tempQueue
    });

    firebase
      .firestore()
      .collection("queues")
      .doc("availQueues")
      .set({
        playing: this.state.playing,
        queueLists: this.state.queues.map(x => x)
      });
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
            <Queues
              dataRef={this.state.queues}
              nowPlaying={this.state.playing}
            />
            <div className="compo-player">
              <button onClick={() => this.prepNextVideo()}>Test me</button>
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${this.state.playing.videoId}`}
                playing={this.state.isPlaying}
                onReady={() => this.setState({ isPlaying: true })}
                onEnded={() => this.prepNextVideo()}
                controls
              />
              <button onClick={() => this.setState({ isPlaying: true })}>
                Play
              </button>
              <button onClick={() => this.setState({ isPlaying: false })}>
                Pause
              </button>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </React.Fragment>
    );
  }
}

export default App;
