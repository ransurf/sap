import {
	arrayRemove,
	updateDoc,
	doc,
	arrayUnion,
	setDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig/init";

const joinEvent = async (
	user: any,
	eventID: string,
	extraInformation: string
) => {
	if (eventID) {
		await updateDoc(doc(db, `Users/${user?.claims?.user_id}`), {
			joinedEvents: arrayUnion(eventID),
		});
	}

	let aggregatedEventsRef = doc(db, `aggregatedEvents/${eventID}`);

	await setDoc(
		aggregatedEventsRef,
		{
			participants: arrayUnion({
				[user?.claims?.user_id]: extraInformation,
			}),
		},
		{ merge: true }
	);
};

const leaveEvent = async (user: any, eventID: string) => {
	if (eventID) {
		await updateDoc(doc(db, `Users/${user?.claims?.user_id}`), {
			joinedEvents: arrayRemove(eventID),
		});
	}

	let aggregatedEventsRef = doc(db, `aggregatedEvents/${eventID}`);
	await setDoc(
		aggregatedEventsRef,
		{
			participants: arrayRemove(user?.claims?.user_id),
		},
		{ merge: true }
	);
};

const updateUserInfo = async (
	user: any,
	firstName: string,
	lastName: string,
	profilePic: string,
	bio: string,
	age: number,
	position: string,
	location: string,
	gender: string
) => {
	await updateDoc(doc(db, `Users/${user?.claims?.user_id}`), {
		firstName: firstName ? firstName : null,
		lastName: lastName ? lastName : null,
		profilePic: profilePic ? profilePic : null,
		bio: bio ? bio : null,
		age: age ? age : null,
		position: position ? position : null,
		location: location ? location : null,
		gender: gender ? gender : null,
	});
};

export { joinEvent, leaveEvent, updateUserInfo };
