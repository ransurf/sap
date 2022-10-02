import Link from "next/link";
import Router from "next/router";
import React from "react";
import moment from "moment";

export interface EventDetails {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  maxParticipants: number;
  location: string;
  office: string;
  eventType: string;
}

interface Props {
  event: EventDetails;
}

const EventCard = ({ event }: Props) => {
  const { id, title, description, startDate, location, office, eventType} = event;
  const tags = [eventType]
  console.log("event card", event);
  return (
    <div className="card w-96 bg-base-100 shadow-xl" key={title}>
      <figure>
        <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title justify-between">
          {title}
          <div className="badge badge-secondary text-white">{moment(startDate).format('lll')}</div>
        </h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          {/* {tags.map((tagName, index) => (
            <div className="badge badge-outline" key={index}>
              {tagName}
            </div>
          ))} */}
        </div>
      </div>
      <button className="btn" onClick={()=>Router.push({pathname: '/eventInfo', query: { id: id}})}> 
            View Event
      </button>
    </div>
  );
};

export default EventCard;
