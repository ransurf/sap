import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebaseConfig/init";

const getUser = async (user: any) => {
  const userRef = doc(db, `Users/${user.uid}`);

  const userSnapshot = await getDoc(userRef);

  return userSnapshot;
};

const getAggregatedData = async () => {
  const aggregatedEventsRef = query(collection(db, "aggregatedEvents"));

  const eventsSnapshot = await getDocs(aggregatedEventsRef);

  return eventsSnapshot;
};

export { getUser, getAggregatedData };
