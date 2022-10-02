import { db } from "../firebaseConfig/init";
import {
	doc,
	setDoc,
	addDoc,
	updateDoc,
	Timestamp,
	collection,
	arrayUnion,
} from "firebase/firestore";

const createUserDocument = async (user: any) => {
	await setDoc(
		doc(db, `Users/${user.uid}`),
		{
			email: user.email,
		},
		{ merge: true }
	);
};

const createUserInformation = async (
	user: any,
	name: string,
	profilePic: string,
	bio: string,
	age: number,
	position: string,
	location: string,
	gender: string
) => {
	await setDoc(
		doc(db, `Users/${user?.claims.user_id}`),
		{
			name: name,
			profilePic: profilePic,
			bio: bio,
			age: age,
			position: position,
			location: location,
			gender: gender,
		},
		{ merge: true }
	);
};

const createNewEvent = async (
	user: any,
	title: string,
	image: string,
	startDate: Timestamp,
	endDate: Timestamp,
	description: string,
	location: string,
	office: string,
	host: string,
	maxAttendees: number,
	extraInfo: string
) => {
	const docRef = doc(collection(db, "aggregatedEvents"));
	await setDoc(docRef, {
		title: title,
		image: image ? image : "",
		startDate: startDate,
		endDate: endDate,
		description: description,
		location: location,
		office: office,
		host: user?.claims.user_id,
		maxAttendees: maxAttendees,
		extraInfo: extraInfo ? extraInfo : "",
		participants: arrayUnion(user?.claims.user_id),
	});

	const eventID = docRef.id;
	await setDoc(
		doc(db, `Users/${user?.claims.user_id}`),
		{
			customEvents: arrayUnion(eventID),
			joinedEvents: arrayUnion(eventID),
		},
		{ merge: true }
	);

	//create json object and add eventinfo to it
	const eventInfo = {
		eventID: eventID,
		title: title,
		image: image ? image : "",
		startDate: startDate,
		endDate: endDate,
		description: description,
		location: location,
		office: office,
		host: user?.claims.user_id,
		maxAttendees: maxAttendees,
		extraInfo: extraInfo ? extraInfo : "",
		participants: arrayUnion(user?.claims.user_id),
	};

	fetch(
		"https://us-central1-saphack2022.cloudfunctions.net/addEventToCalendar",
		{
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(eventInfo),
		}
	);
};

export { createUserDocument, createUserInformation, createNewEvent };
