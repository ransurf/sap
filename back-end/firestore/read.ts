import {
	doc,
	getDoc,
	collection,
	query,
	where,
	getDocs,
	Query,
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

const getUserProfile = async (user: any) => {
	const userProfile = user?.claims;

	return userProfile;
};

const getAggregatedData = async () => {
	const aggregatedEventsRef = query(collection(db, "aggregatedEvents"));

	const eventsSnapshot = await getDocs(aggregatedEventsRef);

	return eventsSnapshot;
};

const getSpecificData = async (eventQueriesUser: FilterKeyValue[]) => {
	// let eventQuery: Query = collection(db, "aggregatedEvents");

	// eventQueriesUser.forEach((k, v) => {
	// 	eventQuery = eventQuery.k;
	// });

	const specificData = query(
		collection(db, "aggregatedEvents"),
		where(eventQueriesUser[0].key, "==", eventQueriesUser[0].value)
	);

	const eventsSnapshot = await getDocs(specificData);

	return eventsSnapshot;
};

const getUsersFromEvent = async (eventID: string) => {
	const eventInfoRef = doc(db, `aggregatedEvents/${eventID}`);

	const eventInfo = await getDoc(eventInfoRef);

	const participants = eventInfo.data()?.participants;

	const users = new Map<string, any>();

	for (let i = 0; i < participants.length; i++) {
		const userRef = doc(db, `Users/${participants[i]}`);

		const userSnapshot = await getDoc(userRef);

		users.set(participants[i], userSnapshot.data());
	}

	return users;
};

export { getUserDoc, getAggregatedData, getUserProfile, getUsersFromEvent, getSpecificData };
