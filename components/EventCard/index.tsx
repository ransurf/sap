import Link from "next/link";
import Router from "next/router";
import React from "react";
import moment from "moment";
import Image from "next/image";

export interface EventDetails {
  id: string;
  title: string;
  description: string;
  startDate: any;
  endDate: any;
  maxParticipants: number;
  location: string;
  office: string;
  eventType: string;
  image: string;
}

interface Props {
  event: EventDetails;
}
const EventCard = ({ event }: Props) => {
  const {
    id,
    title,
    description,
    startDate,
    location,
    office,
    eventType,
    image,
  } = event;
  const tags = [eventType];
  return (
    <div className="card card-side w-200 bg-base-100 shadow-xl" key={title}>
      <figure>
        {image ? (
          <Image width={300} height={150} src={image} alt="Shoes" />
        ) : (
          <img src={"https://placeimg.com/400/225/arch"} alt="Shoes" />
        )}
      </figure>
      <div className="card-body">
        <h2 className="card-title justify-between">
          {title.length > 14 ? title.substring(0, 14) + "…" : title}
          <div className="badge badge-secondary text-white">
            {moment(startDate.toDate()).format("lll")}
          </div>
        </h2>
        <div className="text-sm font-bold">
          {event.location || "N/A"}{" "}
          {event.location !== "Online" ? `\@ ${event.office}` : ""}
        </div>
        <p>
          {description.length > 14
            ? description.substring(0, 40) + "…"
            : description}
        </p>
        <div className="card-actions justify-end">
          {/* {tags.map((tagName, index) => (
            <div className="badge badge-outline" key={index}>
              {tagName}
            </div>
          ))} */}
        </div>
        <button
          className="btn btn-primary"
          onClick={() => Router.push({ pathname: `/events/${id}` })}
        >
          View Event
        </button>
      </div>
    </div>
  );
};

export default EventCard;
