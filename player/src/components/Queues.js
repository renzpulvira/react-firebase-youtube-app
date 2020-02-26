import React, { useState, useEffect } from "react";
import QueuesList from "./QueuesList";

const Queues = ({ dataRef } = this.props) => {
  return (
    <ul className="compo-queues">
      {dataRef.map((x, index) => (
        <QueuesList
          key={index}
          title={x.videoTitle}
          id={index}
          dataRef={dataRef}
        />
      ))}
    </ul>
  );
};

export default Queues;
