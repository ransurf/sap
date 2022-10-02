import React from "react";
import Drawer from "../../components/Drawer";
import EventsGroup from "../../components/EventsGroup";
import { getUsersFromEvent, getAllEvents } from "../../back-end/functions";
const dash = () => {
  const mockEventList = [
    {
      id: "123123123",
      title: "Event 1",
      description: "This is a description",
      startDate: new Date(Date.now()),
      endDate: new Date(Date.now()),
      maxParticipants: 10,
      location: "In Person",
      office: "Toronto",
      eventType: "Video Games",
    },
  ];

  const onClick = async () => {
    console.log("clicked");
    //get all events
    const users = await getUsersFromEvent("3EITQccVLierGsnA64uo");

    console.log(users);
  };

  return (
    <div>
      <Drawer />
      <button onClick={onClick}>Get All Events</button>
      {/* <EventsGroup title="Events" description="" events={mockEventList} /> */}
    </div>
  );
};

export default dash;
