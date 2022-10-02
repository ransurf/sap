import React, { useState, useEffect } from "react";
import Drawer from "../../components/Drawer";
import EventsGroup from "../../components/EventsGroup";
import { getUsersFromEvent, getAllEvents } from "../../back-end/functions";
import { useAuth } from "../../back-end/authContext";
const Dashboard = () => {
  const { user, loading } = useAuth();
  const [eventList, setEventList] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [filter, setFilter] = useState("");
  const [desc, setDesc] = useState("");
  const filterValues = ["My Events", "Joined Events"];
  const setEventFilter = (value) => {
    setFilter(value);
  };

  const getEvents = async () => {
    const events = await getAllEvents();
    setAllEvents(events);
    setEventList(events);
  };

  useEffect(() => {
    getEvents().then(()=>setFilter("Joined Event"))
  }, []);

  useEffect(() => {
    console.log(filter, "filter set");
    if (filter == filterValues[0]) {
      setEventList(
        allEvents.filter((event) => event.host === user.claims.user_id)
      );
      setDesc("All upcoming events you are hosting");
    } else if (filter == filterValues[1]) {
      console.log(allEvents);
      setEventList(
        allEvents.filter((event) => {
          console.log("event.participants", event.participants);
          return event.participants.find((p) => p.uid === user.claims.user_id);
        })
      )
      setDesc("Here are all the events that you are a part of:");
    }else {
      setEventList(
        
        allEvents.filter(event=>{
          console.log('event.participants', event.participants)
          return event.participants.find((p)=>p.uid === user.claims.user_id)
        })
      )
      setDesc("Here are all the events that you are a part of:");
    }
  }, [filter]);

  return (
    <div className="page-container flex-row gap-8">
      <Drawer setFilter={setEventFilter} filters={filterValues} reset={false} />
      <div>
        {eventList ? (
          <EventsGroup
            title={filter ? filter : "Dashboard"}
            modifyEvents={filter === "My Events"}
            description={desc}
            events={eventList}
          />
        ) : (
          "loading"
        )}
      </div>
    </div>
  );
};

export default Dashboard;
