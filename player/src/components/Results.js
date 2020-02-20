import React, { useEffect, useState } from "react";
import ResultsList from "./ResultsList";

const Results = ({ search } = this.props) => {
  const [counter, setCounter] = useState([]);

  useEffect(() => {
    setCounter(search);
  }, [search]);

  return (
    <div style={{ "overflow-x": "scroll" }}>
      <ul style={{ width: "136%" }}>
        {counter.map(x => (
          <ResultsList
            key={x.itemId}
            etag={x.itemId}
            title={x.title}
            video={x.videoId}
            thumbs={x.thumbs}
          />
        ))}
      </ul>
    </div>
  );
};

export default Results;
