import React from "react";
import EventCard, { EventDetails } from "../EventCard";

type Props = {
  title: string;
  description: string;
  events: EventDetails[];
};

const EventsGroup = (props: Props) => {
  const { title, description, events } = props;
  return (
    <div className="flex flex-col w-full">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-md mb-2">{description}</p>
      {events.map((event, index) => {
        console.log("event", event);
        return <EventCard event={event} key={index}/>;
      })}
    </div>
  );
};

export default EventsGroup;
