import React from "react";
import fire from "../config/Config";

const ResultsList = (
  { thumbs, title, video, channel, dataRef } = this.props
) => {
  const handleClick = (param) => (e) => {
    const { thumbs, title, video, channel } = param;
    let holder = dataRef;

    holder.push({
      videoId: video,
      videoThumbs: thumbs,
      videoTitle: title,
      videoChannel: channel,
    });

    fire.database().ref("queueLists").set(holder);
  };

  return (
    <div
      data-thumbs={thumbs}
      data-title={title}
      data-video={video}
      data-channel={channel}
      onClick={handleClick({ thumbs, title, video, channel })}
      className="swiper-slide"
    >
      <img src={thumbs} alt="" />
      <p>{title}</p>
    </div>
  );
};

export default ResultsList;
