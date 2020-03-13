import React from "react";
import "firebase/firestore";

const QueuesList = ({ title, id, dataRef, getNowPlaying } = this.props) => {
  const DeleteQueueData = param => e => {
    const holder = dataRef;
    let { result, bin } = "";
    let { id } = param;
    if (!param.id === 0) {
      let targetVal = holder.splice(id, 1);
      result = holder.filter(target => target !== targetVal);
      getNowPlaying(undefined, result);
    } else {
      holder.shift();
      bin = holder[0];
      holder.shift();
      result = holder;
      getNowPlaying(bin, result);
    }
  };

  return (
    <li className="compo-queues__item">
      <span className="compo-queues__item-title">{title}</span>
      <span className="compo-queues__item-channel">Logic</span>
      <span className="compo-queue__item-duration">4:26</span>
      <button
        className="compo-queues__item-del-ctrl"
        data-id={id}
        onClick={DeleteQueueData({ id })}
      >
        <span></span>
      </button>
    </li>
  );
};

export default QueuesList;
