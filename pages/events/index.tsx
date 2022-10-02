import { SDK_VERSION } from "firebase-admin";
import React, {useState,useEffect} from "react";
import { getAllEvents } from "../../back-end/functions";
import Drawer from "../../components/Drawer";
import EventsGroup from "../../components/EventsGroup";

const Events = () => {
  const [eventList, setEventList] = useState([])

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