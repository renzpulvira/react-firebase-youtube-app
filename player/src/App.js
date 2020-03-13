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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.state.queues) {
      console.warn("Updated!");
    }
  }

  componentWillMount() {
    this.callLatestQueues();
  }

  setSearchResults = childResults => {
    this.setState({ results: childResults });
  };

  setSelectedResult = selectedResult => {
    firebase
      .firestore()
      .collection("queues")
      .doc("availQueues")
      .set({
        playing: this.state.playing,
        queueLists: selectedResult
      })
      .then(this.setState({ queueLists: selectedResult }));
  };

  setNowPlaying = (childNowPlaying = this.state.playing, newQueues) => {
    const unsubscribe = firebase
      .firestore()
      .collection("queues")
      .doc("availQueues")
      .update({ playing: childNowPlaying, queueLists: newQueues })
      .then(
        this.setState({ playing: childNowPlaying, queues: newQueues }),
        console.log(this.state.playing, this.state.queues)
      );
    return () => unsubscribe();
  };

  callLatestQueues() {
    const fire = new Fire("queues", "availQueues", doc => {
      [doc.data()].map(x => {
        this.setState(
          { playing: x.playing, queues: x.queueLists },
          console.log(x)
        );
      });
    });
    fire.getQueues();
  }

  prepNextVideo() {
    var tempQueue = this.state.queues;
    var bin = tempQueue.shift();

    firebase
      .firestore()
      .collection("queues")
      .doc("availQueues")
      .set({
        playing: bin,
        queueLists: tempQueue.map(x => x)
      })
      .then(
        this.setState({
          playing: bin,
          queues: tempQueue
        })
      );
  }

  // https://www.youtube.com/watch?v=ELrQyUIQkiY
  render() {
    return (
      <React.Fragment>
        <Searchbar search={this.setSearchResults} />

        <Results
          searchResults={this.state.results}
          dataRef={this.state.queues}
          setResultHook={this.setSelectedResult}
        />

        {// TODO: Refactor Code
        this.state.queues && this.state.queues.length ? (
          <div className="queue-player-wrapper">
            <Queues
              dataRef={this.state.queues}
              nowPlaying={this.state.playing}
              nowPlayingHook={this.setNowPlaying}
            />
            <div className="compo-player">
              <button onClick={() => this.prepNextVideo()}>Test me</button>
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${this.state.playing.videoId}`}
                playing={this.state.isPlaying}
                width={360}
                height={150}
                onReady={() => this.setState({ isPlaying: true })}
                onEnded={() => this.prepNextVideo()}
                controls
                muted={true}
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
