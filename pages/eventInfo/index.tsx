import { useRouter } from "next/router";
import React, { useEffect, useState, useMemo } from "react";
import {
  getEvent,
  getUsersFromEvent,
  joinEvent,
} from "../../back-end/functions";
import { EventDetails } from "../../components/EventCard";
import Image from "next/image";
import moment from "moment";
import { useAuth } from "../../back-end/authContext";

type Props = {};

const EventInfo = (props: Props) => {
  const {user, loading} = useAuth();
  const router = useRouter();
  const [event, setEvent] = useState<any>();
  const [participants, setParticipants] = useState<any>([]);
  const eventQuery = async () => {
    const res = await getEvent(`${router.query.id}`);
    setEvent(res);
  };
  const getParticipants = async () => {
    const res = await getUsersFromEvent(`${router.query.id}`);
    console.log("participants", res);
    setParticipants(res);
  };

  useEffect(() => {
    console.log("eventInfo", router.query.id);
    eventQuery();
    getParticipants();
  }, []);

  useEffect(() => {
    console.log("current event", event);
  }, [event]);

  const onJoinEvent = () => {
    console.log("join event");
    joinEvent(user, event.id, '');
  };

  const renderParticipants = useMemo(() => {
    return participants.map((participant: any, index: number) => {
      const { firstName, lastName, position, location } = participant;
      return (
        <tr key={index}>
          <th>{index + 1}</th>
          <td>
            <div className="flex items-center space-x-3">
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12">
                  {/* <Image
                    src="https://placeimg.com/400/225/arch"
                    width={20}
                    height={20}
                    alt="Avatar"
                  /> */}
                  Pic
                </div>
              </div>
              <div>
                <div className="font-bold">{`${firstName} ${lastName}`}</div>
                <div className="text-sm opacity-50">{location}</div>
              </div>
            </div>
          </td>
          <td>
            <span className="badge badge-ghost badge-sm">{position}</span>
          </td>
          {/* <th>
                <button className="btn btn-ghost btn-xs">details</button>
              </th> */}
        </tr>
      );
    });
  }, [participants]);

  return event ? (
    <div className="page-container gap-4">
      <div className="flex flex-col items-center">
        <h1 className="page-title">{event.title}</h1>
        <p>{event.description}</p>
        <div className="flex flex-col mt-8">
          <p className="font-bold mb-2">
            {event.participants.length}
            {event.maxParticipants > 0 ? `/${event.maxParticipants}` : ""}{" "}
            Participant(s)
          </p>
          <button className="btn btn-sm btn-primary" onClick={() => onJoinEvent()}>
            Join Event
          </button>
        </div>
      </div>
      {/* show start and end date */}
      <div>
        <h2 className="card-title">Event Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="font-bold">Start Date</div>
            <div className="text-sm opacity-50">
              {moment(event.startDate.toDate()).format("lll")}
            </div>
            <div className="font-bold">End Date</div>
            <div className="text-sm opacity-50">
              {moment(event.endDate.toDate()).format("lll")}
            </div>
            <div className="font-bold">Location</div>
            <div className="text-sm opacity-50">
              {event.location} @{" "}
              {event.location !== "Online" ? event.office : ""}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="page-subtitle">Participants</h2>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>

                <th>Name</th>
                <th>Job</th>
              </tr>
            </thead>
            <tbody>{renderParticipants}</tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    "Loading"
  );
};

export default EventInfo;
