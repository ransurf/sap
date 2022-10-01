import React from "react";

export interface EventDetails {
  id: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
}

interface Props {
  event: EventDetails;
}

const EventCard = ({ event }: Props) => {
  const { title, description, tags, date } = event;
  console.log("event", event);
  return (
    <div className="card w-96 bg-base-100 shadow-xl" key={title}>
      <figure>
        <img src="https://placeimg.com/400/225/arch" alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {title}
          <div className="badge badge-secondary">{date}</div>
        </h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          {tags.map((tagName, index) => (
            <div className="badge badge-outline" key={index}>
              {tagName}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventCard;