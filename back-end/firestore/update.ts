import { arrayRemove, updateDoc, doc, arrayUnion } from "firebase/firestore";
import { db } from "../firebaseConfig/init";

const joinEvent = async (user: any, eventID: string, extraInfo: string) => {
	await updateDoc(doc(db, `Users/${user?.claims?.user_id}`), {
		joinedEvents: arrayUnion(eventID),
	});

	await updateDoc(doc(db, `aggregatedEvents/${eventID}`), {
		participants: {
			[user?.claims?.user_id]: { extraInfo: extraInfo },
		},
	});
};

const leaveEvent = async (user: any, eventID: string) => {
  await updateDoc(doc(db, `Users/${user?.claims?.user_id}`), {
    joinedEvents: arrayRemove(eventID),
  });
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
