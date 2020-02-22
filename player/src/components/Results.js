import React, { useEffect, useState } from "react";
import ResultsList from "./ResultsList";

const Results = ({ search, listCount } = this.props) => {
  const [counter, setCounter] = useState([]);

  useEffect(() => {
    setCounter(search);
  }, [search]);

  return (
    <div className="compo-results">
      <ul>
        {counter.map(x => (
          <ResultsList
            title={x.title}
            video={x.videoId}
            thumbs={x.thumbs}
            nextOrder={listCount}
          />
        ))}
      </ul>
    </div>
  );
};

export default Results;
