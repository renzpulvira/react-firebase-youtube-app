import React, { useEffect, useState } from "react";
import ResultsList from "./ResultsList";

export default function Results({ search } = this.props) {
  const [counter, setCounter] = useState([]);

  useEffect(() => {
    setCounter(search);
  }, [search]);

  return (
    <ul>
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
  );
}
