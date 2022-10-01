import { Timestamp } from "firebase/firestore";
import * as Auth from "./firestore/auth";
import * as Create from "./firestore/create";
import * as Delete from "./firestore/delete";
import * as Update from "./firestore/update";
import * as Read from "./firestore/read";

interface UserInfo {
  user: any;
  firstName: string;
  lastName: string;
  profilePic: string;
  bio: string;
  age: number;
  position: string;
  location: string;
}

interface EventInfo {
	user: any;
	title: string;
	image: string;
	startDate: Timestamp;
	endDate: Timestamp;
	description: string;
	location: string;
	office: string;
	host: string;
	maxAttendees: number;
	extraInfo: string;
}

const signUp = async (email: string, password: string) => {
	const user = await Auth.signUpUser(email, password);
	return user;
};

const signUpGoogle = async () => {
	const user = await Auth.signUpUserGoogle();
	return user;
};

const signInUser = async (email: string, password: string) => {
	const user = await Auth.signInUser(email, password);
	return user;
};

const createUserDocument = async (user: any) => {
	const userDocument = await Create.createUserDocument(user);
	return userDocument;
};

const createUserInformation = async (
	user: any,
	name: string,
	profilePic: string,
	bio: string,
	age: number,
	position: string,
	location: string
) => {
	await Create.createUserInformation(
		user,
		name,
		profilePic,
		bio,
		age,
		position,
		location
	);
};

const createNewEvent = async (eventInfo: EventInfo) => {
	const {
		user,
		title,
		image,
		startDate,
		endDate,
		office,
		description,
		location,
		host,
		maxAttendees,
		extraInfo,
	} = eventInfo;

	console.log("createNewEvent", eventInfo);

	const createEvent = await Create.createNewEvent(
		user,
		title,
		image,
		startDate,
		endDate,
		description,
		location,
		office,
		host,
		maxAttendees,
		extraInfo
	);

	return createEvent;
};;

const joinEvent = async (user: any, eventID: any, discordID: string) => {
	await Update.joinEvent(user, eventID, discordID);
};

const leaveEvent = async (user: any, eventID: any) => {
  await Update.leaveEvent(user, eventID);
};

const deleteEvent = async (user: any, eventID: string) => {
  await Delete.deleteEvent(user, eventID);
};

const getUserData = async (user: any) => {
  const userData = await Read.getUserDoc(user);
  return userData;
};

const getUserProfile = async (user: any) => {
  const userProfile = await Read.getUserProfile(user);
  return userProfile;
};

const getAllEvents = async () => {
  const allEvents = await Read.getAggregatedEvents();
  return allEvents;
};

const updateUserInfo = async (userInfo: UserInfo) => {
  const { user, firstName, lastName, profilePic, bio, age, position, location } = userInfo;

  const updatedUserInfo = await Update.updateUserInfo(
    user,
    firstName,
    lastName,
    profilePic,
    bio,
    age,
    position,
    location
  );

  return updatedUserInfo;
};

export {
  signUp,
  signUpGoogle,
  signInUser,
  createUserDocument,
  createUserInformation,
  createNewEvent,
  joinEvent,
  deleteEvent,
  getUserData,
  getAllEvents,
  leaveEvent,
  getUserProfile,
  updateUserInfo,
};
