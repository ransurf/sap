import { SDK_VERSION } from "firebase-admin";
import React, {useState,useEffect} from "react";
import { getAllEvents } from "../../back-end/functions";
import Drawer from "../../components/Drawer";
import EventsGroup from "../../components/EventsGroup";

const events = () => {
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
          tags: ["tag1", "tag2"],
          date: "2021-10-10",
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
        {eventList ? <EventsGroup title="Title" description="description" events={eventList}/> : "loading"}
      </div>
    </div>
  );
};

export default events;