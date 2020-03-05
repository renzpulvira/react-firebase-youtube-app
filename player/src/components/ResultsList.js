import React from "react";
import firebase from "../firebase";

const ResultsList = ({ thumbs, title, video, dataRef } = this.props) => {
  const handleClick = param => e => {
    const { thumbs, title, video } = param;
    let holder = dataRef;
    holder.push({
      videoId: video,
      videoThumbs: thumbs,
      videoTitle: title
    });

    firebase
      .firestore()
      .collection("queues")
      .doc("availQueues")
      .update({
        queueLists: holder.map(x => x)
      });
  };

  return (
    <div
      data-thumbs={thumbs}
      data-title={title}
      data-video={video}
      onClick={handleClick({ thumbs, title, video })}
    >
      <img src={thumbs} alt="" />
    </div>
  );
};

export default ResultsList;
