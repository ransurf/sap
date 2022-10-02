import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  Query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebaseConfig/init";

interface FilterKeyValue {
  key: string;
  value: any;
}

const getUserDoc = async (user: any) => {
  const userRef = doc(db, `Users/${user?.claims.user_id}`);

  const userSnapshot = await getDoc(userRef);

  console.log("Snapshot in getUser", userSnapshot.data());

  return userSnapshot.data();
};

const getUserDocById = async (id: string) => {
  console.log("getuserdocbyid", id);
  const userRef = doc(db, `Users/${id}`);

  const userSnapshot = await getDoc(userRef);

  console.log("Snapshot in getUserDocById", userSnapshot.data());

  return userSnapshot.data();
};

const getUserProfile = async (user: any) => {
  const userProfile = user?.claims;

  return userProfile;
};

const getAggregatedEvents = async () => {
  const aggregatedEventsRef = collection(db, "aggregatedEvents");
  const aggregatedEventsQuery = query(
    aggregatedEventsRef,
    orderBy("startDate", "asc")
  );

  const eventsSnapshot = await getDocs(aggregatedEventsQuery);

  let events: any[] = [];

  eventsSnapshot.docs.map((doc) => {
    console.log(doc.id);
    events.push({ id: doc.id, ...doc.data() });
  });

  return events;
};

const getSpecificData = async (eventQueriesUser: FilterKeyValue[]) => {
  // let eventQuery: Query = collection(db, "aggregatedEvents");

  // eventQueriesUser.forEach((k, v) => {
  // 	eventQuery = eventQuery.k;
  // });

  let filters: any[] = [];
  // go through each one and push to wheres array
  eventQueriesUser.forEach(({ key, value }) => {
    return filters.push(where(key, "==", value));
  });
  // Then have query like this:
  const filteredEvents = query(collection(db, "aggregatedEvents"), ...filters);

  const eventsSnapshot = await getDocs(filteredEvents);

  return eventsSnapshot;
};

const getUsersFromEvent = async (eventID: string) => {
  const eventInfoRef = doc(db, `aggregatedEvents/${eventID}`);

  const eventInfo = await getDoc(eventInfoRef);

  const participants = eventInfo.data()?.participants;

  // const users = new Map<string, any>();
  let users: any[] = [];

  if (participants) {
    for (let i = 0; i < participants.length; i++) {
      const userRef = doc(db, `Users/${participants[i]}`);

      const userSnapshot = await getDoc(userRef);

      users.push({ uid: participants[i], ...userSnapshot.data() });
    }
  }

  return users;
};

const getSpecificEvent = async (eventID: string) => {
  const eventInfoRef = doc(db, `aggregatedEvents/${eventID}`);

  const eventInfo = await getDoc(eventInfoRef);
  console.log("specificEvent", {
    id: eventID,
    ...eventInfo.data(),
  });
  return {
    id: eventID,
    ...eventInfo.data(),
  };
};

export {
  getUserDoc,
  getUserDocById,
  getAggregatedEvents,
  getUserProfile,
  getUsersFromEvent,
  getSpecificData,
  getSpecificEvent,
};
