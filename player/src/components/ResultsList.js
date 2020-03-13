import React from "react";

const ResultsList = (
  { thumbs, title, video, dataRef, setSelected } = this.props
) => {
  const handleClick = param => e => {
    const { thumbs, title, video } = param;
    let holder = dataRef;

    holder.push({
      videoId: video,
      videoThumbs: thumbs,
      videoTitle: title
    });

    setSelected(holder);
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
