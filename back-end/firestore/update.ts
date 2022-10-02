import {
	arrayRemove,
	updateDoc,
	doc,
	arrayUnion,
	setDoc,
	collection,
	getDoc,
} from "firebase/firestore";
import { EventInfo } from "../functions";
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
        uid: user?.claims?.user_id.toString(),
        extraInfo: extraInformation,
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

	let participants = await getDoc(aggregatedEventsRef).then((doc) => {
		return doc.data()?.participants;
	});

	let newParticipants = participants?.filter(
		(participant: any) => participant.uid !== user?.claims?.user_id
	);

	await updateDoc(aggregatedEventsRef, {
		participants: newParticipants,
	});

	// await setDoc(
	// 	aggregatedEventsRef,
	// 	{
	// 		participants: arrayRemove({
	// 			uid: user?.claims?.user_id.toString(),
	// 			extraInfo: "",
	// 		}),
	// 	},
	// 	{ merge: true }
	// );
};;

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
    firstName: firstName,
    lastName: lastName,
    profilePic: profilePic ? profilePic : "",
    bio: bio,
    age: age,
    position,
    location,
    gender,
  });
};

const updateEventInfo = async ({
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
  await updateDoc(docRef, {
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
};

export { joinEvent, leaveEvent, updateUserInfo, updateEventInfo };
