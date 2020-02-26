import React, { useEffect, useState } from "react";
import ResultsList from "./ResultsList";

const Results = ({ searchResults, dataRef } = this.props) => {
  const [counter, setCounter] = useState([]);

  useEffect(() => {
    setCounter(searchResults);
  }, [searchResults]);

  return (
    <div className="compo-results">
      <ul>
        {counter.map((x, index) => (
          <ResultsList
            key={index}
            title={x.title}
            video={x.videoId}
            thumbs={x.thumbs}
            dataRef={dataRef}
          />
        ))}
      </ul>
    </div>
  );
};

export default Results;
