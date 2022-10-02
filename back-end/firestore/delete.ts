import {
	deleteDoc,
	doc,
	arrayRemove,
	updateDoc,
	getDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig/init";

const deleteEvent = async (user: any, eventID: string) => {
	const eventIDData = await getDoc(doc(db, `Events/${eventID}`)).then((doc) => {
		return doc.data();
	});

	//Get all participants of the event and remove the event from their joinedEvents array
	eventIDData?.participants.forEach(async (participant: any) => {
		await updateDoc(doc(db, `Users/${participant.uid}`), {
			joinedEvents: arrayRemove(eventID),
		});
	});


	await deleteDoc(doc(db, `aggregatedEvents/${eventID}`));

	await updateDoc(doc(db, `Users/${user?.claims.user_id}`), {
		customEvents: arrayRemove(eventID),
		joinedEvents: arrayRemove(eventID),
	});
};

export { deleteEvent };
