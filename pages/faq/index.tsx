import React from "react";

type Props = {};

const FAQ = (props: Props) => {
  return (
    <div className="page-container">
      <h1 className="page-title">FAQ</h1>
      <h2 className="font-bold text-xl mt-4">What can I use this app for?</h2>
      <p>
        You can use this app to look for new events to meet your fellow
        coworkers and make new friends.
        You can find events based on location (office or online) and type of event.<br/>
        You can also see the events you have joined and the events you have created, as well as the people attending those events.
      </p>
      <h2 className="font-bold text-xl mt-4">How can I see events?</h2>
      <p>
        You can see events by going to the events page, and you can click on an
        event card to see more details about it.
      </p>
      <h2 className="font-bold text-xl mt-4">How do I create an event?</h2>
      <p>
        You can create an event by clicking on the {"Create Event"} button on
        the top right of the page. You will be prompted to fill out a form with
        the details of your event. Once you submit the form, your event will be
        created and you will be able to see it on the {"Events"} page.
      </p>
      <h2 className="font-bold text-xl mt-4">How do I join or event?</h2>
      <p>
        You can join an event by clicking on the {"Join Event"} button after
        clicking into the details of an event.
      </p>
      <h2 className="font-bold text-xl mt-4">How do I leave an event?</h2>
      <p>
        You can leave an event by clicking on the {"Leave Event"} button after
        clicking into the details of an event.
      </p>
    </div>
  );
};

export default FAQ;
