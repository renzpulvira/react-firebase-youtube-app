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

  sendData(searchData) {
    this.props.search(searchData);
  }

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
      maxResults: 8
    })
      .then(res => {
        return res.items.map(x => {
          holder.push({
            videoId: x.id.videoId,
            title: x.snippet.title
          });
        });
      })
      .then(() => this.props.search(holder));
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          placeholder="insert Something"
          //onChange={e => this.sendData(e.target.value)}
          onChange={e => this.setTerm(e.target.value)}
        />
        <input
          type="submit"
          value="search"
          onClick={() => this.callFunc(this.state.term)}
        />
      </form>
    );
  }
}
export default Searchbar;
