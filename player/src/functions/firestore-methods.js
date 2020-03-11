import firebase from "../firebase";
import "firebase/firebase";
import { firestore } from "firebase";

class Fire {
  constructor(col = "queues", doc = "availQueues", cb) {
    this.col = col;
    this.doc = doc;
    this.cb = cb;
  }

  update() {
    firebase
      .firestore()
      .collection(this.col)
      .doc(this.doc)
      .set(this.cb);
  }

  getQueues() {
    const unsubscribe = firebase
      .firestore()
      .collection(this.col)
      .doc(this.doc)
      .get()
      .then(this.cb);
    return unsubscribe;
  }
}

export default Fire;
