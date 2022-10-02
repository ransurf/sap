import { SDK_VERSION } from "firebase-admin";
import React, { useState, useEffect } from "react";
import { getAllEvents } from "../../back-end/functions";
import Drawer from "../../components/Drawer";
import EventsGroup from "../../components/EventsGroup";

const Events = () => {
  const [eventList, setEventList] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [filter, setFilter] = useState(null);

  const setEventFilter = (value) => {
    setFilter(value);
  };

  const getEvents = async () => {
    const events = await getAllEvents();
    setAllEvents(events);
    setEventList(events);
  };

  useEffect(() => {
    getEvents();
  }, []);

  useEffect(() => {
    console.log("allEvents", allEvents);
    console.log("filter", filter);
    console.log(filter, "filter set");
    let tempEvents = allEvents;
    if (filter?.location) {
      tempEvents = tempEvents.filter((event) => event.location === filter.location);
    }
    // if (filter.eventType) {
    //   setEventList(eventList.filter(event=>event.location === filter.location))
    // }
    if (filter?.office) {
      tempEvents = tempEvents.filter((event) => event.office === filter.office);
    }
    console.log('tempEvents', tempEvents)
    setEventList(tempEvents);
  }, [filter]);

  return (
    <div className="page-container flex-row gap-8">
      <Drawer setFilter={setEventFilter} form={true} />
      <div>
        {eventList ? (
          <EventsGroup
            title="Events"
            description="All upcoming events sorted by start date"
            events={eventList}
          />
        ) : (
          "loading"
        )}
      </div>
    </div>
  );
};

export default Events;
