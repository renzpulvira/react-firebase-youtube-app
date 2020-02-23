import React, { useState, useEffect } from "react";
import "firebase/firestore";
import firebase from "../firebase";

const DeleteQueueData = param => e => {
  firebase
    .firestore()
    .collection("queues")
    .doc(param)
    .delete();
};

function GetQueueDb() {
  const [queueDb, setQueueDb] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("queues")
      .orderBy("timestamp", "asc")
      .onSnapshot(snapshot => {
        const newQueues = snapshot.docs.map(queue => ({
          id: queue.id,
          ...queue.data()
        }));

        setQueueDb(newQueues);
      });
    return () => unsubscribe();
  }, []);
  return queueDb;
}

const Queues = () => {
  const currQueues = GetQueueDb();
  return (
    <ul className="compo-queues">
      {currQueues.map(x => (
        <li key={x.id}>
          <p>{x.videoTitle}</p>
          <button data-id={x.id} onClick={DeleteQueueData(x.id)}>
            DELETE
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Queues;
