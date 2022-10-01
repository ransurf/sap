import React from "react";
import EventCard from "../../components/EventCard/EventCard";

const Events = () => {
  const events = [
    {
      title: "Event 1",
      description: "This is a description",
      tags: ["tag1", "tag2"],
      date: "2021-10-10",
    },
  ];
  return (
    <div>
      <EventCard events={events} />
    </div>
  );
};

export default Events;
