import React from "react";
import "firebase/firestore";
import firebase from "../firebase";

const QueuesList = ({ title, id, dataRef } = this.props) => {
  const addToFirebase = theData => {
    firebase
      .firestore()
      .collection("queues")
      .doc("availQueues")
      .update({
        queueLists: theData.map(x => x)
      });
  };

  const DeleteQueueData = param => e => {
    const holder = dataRef;
    const { id } = param;
    let targetVal = holder.splice(id, 1);
    let result = holder.filter(target => target !== targetVal);
    addToFirebase(result);
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
