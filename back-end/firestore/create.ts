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
    startDate: startDate,
    endDate: endDate,
    description: description,
    location: location,
  };

  //cors send test message to https://hooks.slack.com/services/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 post method

  const message = {
    text: `New event created: ${eventInfo.eventName} \n
		Location: ${eventInfo.location} \n
		Start Date: ${eventInfo.startDate} \n
		End Date: ${eventInfo.endDate} \n
		Description: ${eventInfo.description}
		See more information at https://sap-ransurf.vercel.app/events/${eventID}
		`,
  };

  const response = await fetch(
    "https://hooks.slack.com/services/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",
    {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    }
  )
    .then((response) => {
      console.log("response", response);
    })
    .catch((error) => {
      console.log("error", error);
    });

  console.log("eventInfo: ", eventInfo);
  console.log("eventinfo json", JSON.stringify(eventInfo));

  let returnedData = fetch(
    "https://us-central1-saphack2022.cloudfunctions.net/addEventToCalendar",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventInfo),
    }
  );

  console.log("returnedData: ", returnedData);
};

export { createUserDocument, createUserInformation, createNewEvent };
