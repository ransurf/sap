import React from "react";
import Drawer from "../../components/Drawer";
import EventsGroup from "../../components/EventsGroup";
const events = () => {
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
  return (
    <div className="page-container flex-row">
      <Drawer />
      <div>
        {mockEventList.map((eventGroup, index) => {
          return <EventsGroup {...eventGroup} key={index} />;
        })}
      </div>
    </div>
  );
};

export default events;
