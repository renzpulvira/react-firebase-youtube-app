import React from "react";
import Swiper from "react-id-swiper";
import firebase from "../firebase";

const ResultsList = ({ thumbs, title, video, dataRef } = this.props) => {
  const handleClick = param => e => {
    const { thumbs, title, video } = param;
    let holder = dataRef;
    console.log(holder[0]);

    holder.push({
      videoId: video,
      videoThumbs: thumbs,
      videoTitle: title
    });

    firebase
      .firestore()
      .collection("queues")
      .doc("availQueues")
      .set({
        playing: { videoId: video, videoThumbs: thumbs, videoTitle: title },
        queueLists: holder.map(x => x)
      });
  };

  return (
    <div
      data-thumbs={thumbs}
      data-title={title}
      data-video={video}
      onClick={handleClick({ thumbs, title, video })}
      className="swiper-slide"
    >
      <img src={thumbs} alt="" />
    </div>
  );
};

export default ResultsList;
