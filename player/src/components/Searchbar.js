import React from "react";
import searchYoutube from "youtube-api-v3-search";

class Searchbar extends React.Component {
  state = {
    term: "",
    API_KEY: "AIzaSyDNGKLlOY5A1pjNSY2S3kSXRLHY8ao3UwU",
    options: {
      q: "nodejs",
      part: "snippet",
      type: "video",
      maxResults: 8
    },
    results: []
  };

  setTerm(data) {
    this.setState({
      term: data
    });
  }

  callFunc(term) {
    let holder = [];

    searchYoutube(this.state.API_KEY, {
      q: term,
      part: "snippet",
      type: "video",
      maxResults: 12
    })
      .then(res => {
        return res.items.map(x => {
          holder.push({
            videoId: x.id.videoId,
            title: x.snippet.title,
            thumbs: x.snippet.thumbnails.medium.url,
            channel: x.snippet.channelTitle
          });
        });
      })
      .then(() => this.props.search(holder));
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  // componentDidMount() {
  //   this.callFunc(this.state.options.q);
  // }

  render() {
    return (
      <form className="compo-searchbar" onSubmit={this.handleSubmit}>
        <input
          placeholder="Search for youtube videos.."
          //onChange={e => this.sendData(e.target.value)}
          onChange={e => this.setTerm(e.target.value)}
        />
        <input
          type="submit"
          value="Search"
          onClick={() => this.callFunc(this.state.term)}
        />
      </form>
    );
  }
}
export default Searchbar;
