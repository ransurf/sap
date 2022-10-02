import { useRouter } from "next/router";
import React, { useEffect, useState, useMemo } from "react";
import {
  getEvent,
  getUsersFromEvent,
  joinEvent,
} from "../../../back-end/functions";
import { EventDetails } from "../../../components/EventCard";
import Image from "next/image";
import moment from "moment";
import { useAuth } from "../../../back-end/authContext";
// import Modal from "react-daisyui";

type Props = {};

const EventInfo = (props: Props) => {
  const { user, loading } = useAuth();
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
    console.log("user", user);
    console.log("current event", event);
  }, [event]);

  const onJoinEvent = () => {
    console.log("join event");
    joinEvent(user, event.id, "");
  };

  const onLeaveEvent = () => {
    console.log("leave event");
    joinEvent(user, event.id, "");
  };

  const renderParticipants = useMemo(() => {
    return participants.map((participant: any, index: number) => {
      const { firstName, lastName, position, location, email } = participant;
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
                <span className="badge badge-ghost badge-sm">{position}</span>
              </div>
            </div>
          </td>
          <td>
            <div className="text-sm text-secondary">{location}</div>
          </td>
          <td>{email}</td>
          {/* <th>
                <button className="btn btn-ghost btn-xs">details</button>
              </th> */}
        </tr>
      );
    });
  }, [participants]);

  return event ? (
    <div className="page-container gap-4">
      {/* <Modal open={true}>
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title h5">Event Details</div>
            <div className="modal-close"></div>
          </div>
          <div className="modal-body">akldjslk</div>
        </div>
      </Modal> */}
      <div className="flex flex-col items-center">
        <h1 className="page-title">{event.title}</h1>
        <p>{event.description}</p>
        <div className="flex flex-col mt-8">
          <p className="font-bold mb-2">
            {event.participants.length}
            {event.maxParticipants > 0 ? `/${event.maxParticipants}` : ""}{" "}
            Participant(s)
          </p>
          {user && event.participants.includes(user.claims.user_id) ? (
            <button
              className="btn btn-sm btn-primary"
              onClick={() => onLeaveEvent()}
            >
              Leave Event
            </button>
          ) : (
            <button
              className="btn btn-sm btn-primary"
              onClick={() => onJoinEvent()}
            >
              Join Event
            </button>
          )}
        </div>
      </div>
      {/* show start and end date */}
      <div>
        <h2 className="card-title font-bold">Event Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="font-bold">Start Date</div>
            <div className="text-sm text-secondary font-bold">
              {moment(event.startDate.toDate()).format("lll")}
            </div>
            <div className="font-bold">End Date</div>
            <div className="text-sm text-secondary font-bold">
              {moment(event.endDate.toDate()).format("lll")}
            </div>
            <div className="font-bold">Location</div>
            <div className="text-sm text-secondary font-bold">
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
                <th>From</th>
                <th>Email</th>
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
