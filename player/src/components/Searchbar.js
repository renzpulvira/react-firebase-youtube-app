import React from "react";
import searchYoutube from "youtube-api-v3-search";
import Results from "./Results";

class Searchbar extends React.Component {
  state = {
    term: "",
    API_KEY: "AIzaSyDNGKLlOY5A1pjNSY2S3kSXRLHY8ao3UwU",
    maxResults: 8,
    options: {
      q: "nodejs",
      part: "snippet",
      type: "video",
      maxResults: 6
    },
    results: []
  };

  setTerm(data) {
    this.setState({
      term: data,
      maxResults: 8
    });
  }

  callFunc(term) {
    let holder = [];

    searchYoutube(this.state.API_KEY, {
      q: term,
      part: "snippet",
      type: "video",
      maxResults: this.state.maxResults
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
      .then(() => this.setState({ results: holder }));
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  // componentDidMount() {
  //   this.callFunc(this.state.options.q);
  // }

  setMaxResults = () => {
    let defResults = this.state.maxResults;
    this.setState(
      {
        maxResults: defResults + 8
      },
      () => this.callFunc(this.state.term)
    );
  };

  render() {
    return (
      <div>
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
        {this.state.results.length > 0 ? (
          <div>
            <Results
              searchResults={this.state.results}
              dataRef={this.props.dataRef}
              increaseResults={this.setMaxResults.bind(this)}
            />
            <button onClick={() => this.loadMore()}>Load more</button>
          </div>
        ) : (
          <span></span>
        )}
      </div>
    );
  }
}
export default Searchbar;
