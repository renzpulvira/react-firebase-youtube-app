import React, { useEffect, useState } from "react";
import ResultsList from "./ResultsList";

const Results = ({ searchResults } = this.props) => {
  const [counter, setCounter] = useState([]);

  useEffect(() => {
    setCounter(searchResults);
  }, [searchResults]);

  return (
    <div className="compo-results">
      <ul>
        {counter.map(x => (
          <ResultsList title={x.title} video={x.videoId} thumbs={x.thumbs} />
        ))}
      </ul>
    </div>
  );
};

export default Results;
