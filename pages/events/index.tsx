import { SDK_VERSION } from "firebase-admin";
import React, {useState,useEffect} from "react";
import { getAllEvents } from "../../back-end/functions";
import Drawer from "../../components/Drawer";
import EventsGroup from "../../components/EventsGroup";

const Events = () => {
  const [eventList, setEventList] = useState([])

  const mockEventList = [
    {
      title: "Event List 1",
      description: "This is a description",
      events: [
        {
          eventId: '123123123',
          title: "Event 1",
          description: "This is a description",
          startDate: new Date(Date.now()),
          endDate: new Date(Date.now()),
          maxParticipants: 10,
          location: "In Person",
          office: "Toronto",
          eventType: "Video Games",
        },
      ],
    },
  ];

  const getEvents = async () => {
    const events = await getAllEvents()
    setEventList(events)
  }

  useEffect(() => {
    getEvents();
  }, [])

  useEffect(() => {
    console.log("all events", eventList)
  }, [eventList])
  

  return (
    <div className="page-container flex-row">
      <Drawer />
      <div>
        {eventList ? <EventsGroup title="Events" description="" events={eventList}/> : "loading"}
      </div>
    </div>
  );
};

export default Events;