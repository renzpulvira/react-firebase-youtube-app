import React, { useEffect, useState } from "react";
import ResultsList from "./ResultsList";
import "firebase/firestore";

import firebase from "../firebase";

function GetQueueDb() {
  const [queueDb, setQueueDb] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("queues")
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

const Results = ({ search } = this.props) => {
  const [counter, setCounter] = useState([]);
  const currQueues = GetQueueDb();

  useEffect(() => {
    setCounter(search);
  }, [search]);

  return (
    <ul>
      {currQueues.map(x => (
        <li>
          <p>{x.videoTitle}</p>
          <p>{x.videoId}</p>
        </li>
      ))}
      {/* {counter.map(x => (
        <ResultsList
          key={x.itemId}
          etag={x.itemId}
          title={x.title}
          video={x.videoId}
          thumbs={x.thumbs}
        />
      ))} */}
    </ul>
  );
};

export default Results;
