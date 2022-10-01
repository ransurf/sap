import { deleteDoc, doc, arrayRemove, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/init";

const deleteEvent = async (user:any , eventID: string) => {
    await deleteDoc(doc(db, `aggregatedEvents/${eventID}`));
    await updateDoc( doc(db, `Users/${user?.claims.user_id}`), {
        customEvents: arrayRemove(eventID),
        joinedEvents: arrayRemove(eventID),
    })
};

export { deleteEvent };