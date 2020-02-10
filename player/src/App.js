import React from "react";
import ReactPlayer from "react-player";
import Searchbar from "./components/Searchbar";
import searchYoutube from "youtube-api-v3-search";

class App extends React.Component {
  state = {
    isPlaying: false,
    API_KEY: "AIzaSyDNGKLlOY5A1pjNSY2S3kSXRLHY8ao3UwU",
    options: {
      q: "nodejs",
      part: "snippet",
      type: "video",
      maxResults: 8
    },
    results: []
  };

  toggleButton() {
    !this.state.isPlaying
      ? this.setState({ isPlaying: true })
      : this.setState({ isPlaying: false });
  }

  callFunc = () => {
    let holder = [];
    searchYoutube(this.state.API_KEY, this.state.options)
      .then(res => {
        return res.items.map(x => {
          holder.push({
            videoId: x.id.videoId,
            title: x.snippet.title
          });
        });
      })
      .then(() => {
        this.setState({
          results: holder
        });
      });
  };

  componentDidMount() {
    this.callFunc();
  }

  render() {
    if (this.state.results.length > 0) {
      return (
        <div>
          {/* <ReactPlayer
          url={}
          playing={this.state.isPlaying}
        /> */}
          <Searchbar />
          <ul>
            {this.state.results.map(x => (
              <li>
                <p>{x.title}</p>
                <p>{x.videoId}</p>
              </li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <h1>Getting Data...</h1>;
    }
  }
}

export default App;
