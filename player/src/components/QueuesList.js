import React from "react";
import "firebase/firestore";
import firebase from "../firebase";
const DeleteQueueData = ({ dataRef } = this.props, param) => e => {
  const holder = dataRef;
  console.log(holder);
  // firebase
  //   .firestore()
  //   .collection("queues")
  //   .doc(param)
  //   .delete();
};

const QueuesList = ({ title, id } = this.props) => {
  return (
    <li>
      <p>{title}</p>
      <button data-id={id} onClick={DeleteQueueData(id)}>
        DELETE
      </button>
    </li>
  );
};

export default QueuesList;