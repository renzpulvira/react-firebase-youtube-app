import React, { useEffect, useState } from "react";
import Swiper from "react-id-swiper";
import ResultsList from "./ResultsList";

const Results = ({ searchResults, dataRef, increaseResults } = this.props) => {
  const [counter, setCounter] = useState([]);

  const handleSwipeEnd = () => {
    alert("swipe on end point");
  };

  const swiperSettings = {
    slidesPerView: 6,
    // spaceBetween: 70,
    shouldSwiperUpdate: true,
    freeMode: true,
    on: {
      reachEnd: () => increaseResults()
    }
  };

  useEffect(() => {
    console.log(searchResults);
    setCounter(searchResults);
  }, [searchResults]);

  return (
    <div className="compo-results">
      {searchResults && searchResults.length ? <h1>Search Results</h1> : ""}
      <ul className="compo-results__swiper">
        <Swiper {...swiperSettings}>
          {counter.map((x, index) => (
            <ResultsList
              key={index}
              title={x.title}
              video={x.videoId}
              channel={x.channel}
              thumbs={x.thumbs}
              dataRef={dataRef}
            />
          ))}
        </Swiper>
      </ul>
    </div>
  );
};

export default Results;
