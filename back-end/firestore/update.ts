import { arrayRemove, updateDoc, doc, arrayUnion } from "firebase/firestore";
import { db } from "../firebaseConfig/init";

const joinEvent = async (user: any, eventID: string) => {
  await updateDoc(doc(db, `Users/${user.uid}`), {
    joinedEvents: arrayUnion(eventID),
  });
};

const leaveEvent = async (user: any, eventID: string) => {
  await updateDoc(doc(db, `Users/${user.uid}`), {
    joinedEvents: arrayRemove(eventID),
  });
};

export { joinEvent, leaveEvent };
