import React, { useEffect, useState } from "react";
import Swiper from "react-id-swiper";
import ResultsList from "./ResultsList";

const Results = ({ searchResults, dataRef } = this.props) => {
  const [counter, setCounter] = useState([]);

  const swiperSettings = {
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    spaceBetween: 30
  };

  useEffect(() => {
    setCounter(searchResults);
  }, [searchResults]);

  return (
    <div className="compo-results">
      {searchResults && searchResults.length ? <h1>Search Results</h1> : ""}
      <Swiper className="compo-results__swiper" {...swiperSettings}>
        {counter.map((x, index) => (
          <ResultsList
            key={index}
            title={x.title}
            video={x.videoId}
            thumbs={x.thumbs}
            dataRef={dataRef}
          />
        ))}
      </Swiper>
    </div>
  );
};

export default Results;
