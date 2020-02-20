import React from "react";

const ResultsList = ({ etag, thumbs } = this.props) => {
  return (
    <li
      style={{ display: "inline-block" }}
      data-etag={etag}
      onClick={e => console.log(e.currentTarget.attributes["data-etag"].value)}
    >
      <img src={thumbs} alt="" />
      {/* <p>{title}</p>
      <span>{video}</span> */}
    </li>
  );
};

export default ResultsList;
