import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebaseConfig/init";

const getUserDoc = async (user: any) => {
  const userRef = doc(db, `Users/${user?.claims.user_id}`);

  const userSnapshot = await getDoc(userRef);

  return userSnapshot;
};

const getUserProfile = async (user: any) => {
  const userProfile = user.claims;

  return userProfile;
};

const getAggregatedData = async () => {
  const aggregatedEventsRef = query(collection(db, "aggregatedEvents"));

  const eventsSnapshot = await getDocs(aggregatedEventsRef);

  return eventsSnapshot;
};

export { getUserDoc, getAggregatedData, getUserProfile };
