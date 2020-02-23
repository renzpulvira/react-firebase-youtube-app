import React, { useState, useEffect } from "react";
import firebase from "../firebase";

const ResultsList = ({ thumbs, title, video } = this.props) => {
  const handleClick = param => e => {
    const { thumbs, title, video } = param;
    firebase
      .firestore()
      .collection("queues")
      .add({
        videoId: video,
        videoThumbs: thumbs,
        videoTitle: title,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
  };

  return (
    <li
      data-thumbs={thumbs}
      data-title={title}
      data-video={video}
      onClick={handleClick({ thumbs, title, video })}
    >
      <img src={thumbs} alt="" />
    </li>
  );
};

export default ResultsList;
