import React from "react";
import ReactPlayer from "react-player";
import Searchbar from "./components/Searchbar";
import Queues from "./components/Queues";
import fire from "./config/Config";

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

  getData = ref => {
    return new Promise((resolve, reject) => {
      const onError = error => reject(error);
      const onData = snap => resolve(snap.val());

      ref.on("value", onData);
    });
  };

  componentDidMount() {
    fire
      .database()
      .ref()
      .on("value", snapShot => {
        if (!snapShot.val().queueLists) {
          fire
            .database()
            .ref()
            .set({
              playing: {
                videoId: "utCjuKDXQsE",
                videoThumbs: "https://i.ytimg.com/vi/utCjuKDXQsE/mqdefault.jpg",
                videoChannel: "THEO",
                videoTitle: "Tame Impala - Lost in Yesterday (Official Video)"
              },
              queueLists: {
                0: {
                  videoChannel: "tameimpalaVEVO",
                  videoId: "sBzrzS1Ag_g",
                  videoThumbs:
                    "https://i.ytimg.com/vi/sBzrzS1Ag_g/mqdefault.jpg",
                  videoTitle:
                    "Tame Impala - The Less I Know The Better (Official Video)"
                }
              }
            });
        } else {
          this.setState({
            playing: snapShot.val().playing,
            queues: snapShot.val().queueLists
          });
        }
      });
  }

  componentWillMount() {}

  setSearchResults = childResults => {
    this.setState({ results: childResults });
  };

  setNextVideo() {
    const tempData = [...this.state.queues];
    let bin = tempData.shift();

    fire
      .database()
      .ref()
      .set({ playing: bin, queueLists: tempData }, () => {
        console.log("Data Pushed");
      });
  }

  // https://www.youtube.com/watch?v=ELrQyUIQkiY
  render() {
    return (
      <React.Fragment>
        <Searchbar search={this.setSearchResults} dataRef={this.state.queues} />

        {// TODO: Refactor Code
        this.state.playing ? (
          <div className="queue-player-wrapper">
            <Queues
              dataRef={this.state.queues}
              nowPlaying={this.state.playing}
              setNextVideo={this.setNextVideo.bind(this)}
            />
            <div className="compo-player">
              <button onClick={() => this.setNextVideo()}>Test me</button>
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${this.state.playing.videoId}`}
                playing={this.state.isPlaying}
                width={360}
                height={150}
                // onReady={() => this.setState({ isPlaying: true })}
                onEnded={() => this.setNextVideo}
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
