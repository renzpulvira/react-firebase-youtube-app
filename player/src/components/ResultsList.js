import React from "react";

export default function ResultsList(
  { etag, title, video, thumbs } = this.props
) {
  return (
    <li
      data-etag={etag}
      onClick={e => console.log(e.target.getAttribute("data-etag"))}
    >
      <img src={thumbs} alt="" />
      <p>{title}</p>
      <span>{video}</span>
    </li>
  );
}
