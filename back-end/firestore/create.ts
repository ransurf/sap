import { db } from "../firebaseConfig/init";
import { EventInfo } from "../functions";
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
			profilePic: user?.claims.picture,
			bio: bio,
			age: age,
			position: position,
			location: location,
			gender: gender,
		},
		{ merge: true }
	);
};

const createNewEvent = async ({
	user,
	title,
	image,
	startDate,
	endDate,
	eventType,
	description,
	location,
	office,
	host,
	maxAttendees,
	extraInfo,
}: EventInfo) => {
	const docRef = doc(collection(db, "aggregatedEvents"));
	console.log("eventType", eventType);
	await setDoc(docRef, {
		title: title,
		image: image ? image : "",
		startDate: startDate,
		endDate: endDate,
		description: description,
		eventType: eventType,
		location: location,
		office: office,
		host: user?.claims.user_id,
		maxAttendees: maxAttendees,
		extraInfo: extraInfo ? extraInfo : "",
		participants: arrayUnion({
			uid: user?.claims.user_id,
			extraInfo: "",
		}),
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
		eventName: title,
		startDate: startDate,
		endDate: endDate,
		description: description,
		location: location,
	};

	console.log("eventInfo: ", eventInfo);
	console.log("eventinfo json", JSON.stringify(eventInfo));

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
