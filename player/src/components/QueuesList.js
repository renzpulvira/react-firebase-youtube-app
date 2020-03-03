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
    let result = holder.filter(target => target != targetVal);
    addToFirebase(result);
  };

  return (
    <li>
      <p>{title}</p>
      <button data-id={id} onClick={DeleteQueueData({ id })}>
        DELETE {id}
      </button>
    </li>
  );
};

export default QueuesList;
