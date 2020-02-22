import React, { useState, useEffect } from "react";
import firebase from "../firebase";

const ResultsList = ({ thumbs, title, video, nextOrder } = this.props) => {
  const handleClick = param => e => {
    const { thumbs, title, video, nextOrder } = param;
    firebase
      .firestore()
      .collection("queues")
      .add({
        videoOrder: nextOrder,
        videoId: video,
        videoThumbs: thumbs,
        videoTitle: title
      })
      .then(console.log(param));
  };

  return (
    <li
      data-next={nextOrder}
      data-thumbs={thumbs}
      data-title={title}
      data-title={video}
      onClick={handleClick({ thumbs, title, video, nextOrder })}
    >
      <img src={thumbs} alt="" />
    </li>
  );
};

export default ResultsList;
