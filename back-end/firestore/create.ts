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
	console.log("user: ", user);
	await setDoc(
		doc(db, `Users/${user.uid}`),
		{
			email: user.email,
			profilePic: user.photoURL,
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
		startDate: startDate.toISOString(),
		endDate: endDate.toISOString(),
		description: description,
		location: location,
	};

	console.log("eventInfo: ", eventInfo);
	console.log("eventinfo json", JSON.stringify(eventInfo));
	console.log("Startdate: ", startDate);

	let returnedData = fetch(
		"https://us-central1-saphack2022.cloudfunctions.net/addEventToCalendar",
		{
			method: "POST",
			mode: "no-cors",
			headers: {
				"Content-Type": "application/json",
				"Acess-Control-Allow-Origin": "http://localhost:3000/",
			},

			body: JSON.stringify(eventInfo),
		}
	);

	console.log("returnedData: ", returnedData);
};

export { createUserDocument, createUserInformation, createNewEvent };
