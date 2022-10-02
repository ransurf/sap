import { SDK_VERSION } from "firebase-admin";
import React, {useState,useEffect} from "react";
import { getAllEvents } from "../../back-end/functions";
import Drawer from "../../components/Drawer";
import EventsGroup from "../../components/EventsGroup";






const Events = () => {
  const [eventList, setEventList] = useState([])
  const [filter, setFilter] = useState(undefined)

  const setEventFilter = (value) => {
    setFilter(value)
  }

  const getEvents = async () => {
    const events = await getAllEvents()
    setEventList(events)
  }

  useEffect(() => { getEvents() }, [])

  useEffect(() => { console.log("all events", eventList) }, [eventList])
  
  useEffect(()=>{console.log(filter, 'set')},[filter])
  
  return (
    <div className="page-container flex-row gap-8">
      <Drawer setFilter = {setEventFilter} form={true}/>
      <div>
        {eventList ? <EventsGroup title="Events" description="Here are all the events being hosted by your coworkers!!" events={eventList}/> : "loading"}
      </div>
    </div>
  );
};

export default Events;