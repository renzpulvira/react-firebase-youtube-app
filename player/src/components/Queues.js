import React, { useState, useEffect } from "react";
import "firebase/firestore";
import firebase from "../firebase";

function GetQueueDb() {
  const [queueDb, setQueueDb] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("queues")
      .orderBy("videoOrder", "asc")
      .onSnapshot(snapshot => {
        const newQueues = snapshot.docs.map(queue => ({
          id: queue.id,
          ...queue.data()
        }));

        console.log(snapshot);

        setQueueDb(newQueues);
      });
    return () => unsubscribe();
  }, []);
  return queueDb;
}

const Queues = () => {
  const currQueues = GetQueueDb();
  return (
    <ul>
      {currQueues.map(x => (
        <li key={x.id}>
          <p>{x.videoTitle}</p>
          {/* <p>{x.videoThumbs}</p> */}
          {/* <p>{x.videoId}</p> */}
        </li>
      ))}
    </ul>
  );
};

export default Queues;
