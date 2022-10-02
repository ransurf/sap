import { useRouter } from "next/router";
import Router from "next/router";
import React, { useEffect, useState, useMemo } from "react";
import {
  getEvent,
  getUsersFromEvent,
  joinEvent,
  leaveEvent,
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
  // const slug = (router.query.slug as string[]) || [];
  const eventId = router.asPath.split("/")[2];
  console.log('EventId', eventId)
  const [event, setEvent] = useState<any>(undefined);
  const [participants, setParticipants] = useState<any>([]);
  const eventQuery = async () => {
    const res = await getEvent(eventId);
    setEvent(res);
  };
  const getParticipants = async () => {
    const res = await getUsersFromEvent(eventId);
    console.log("participants", res);
    setParticipants(res);
  };

  const refreshData = () => {
    eventQuery();
    getParticipants();
  };

  useEffect(() => {
    refreshData();
  }, [router.asPath]);

  useEffect(() => {
    console.log("user", user);
    console.log("current event", event);
  }, [event]);

  const onJoinEvent = () => {
    console.log("join event", user, event, participants);
    joinEvent(user, event.id, "");
    refreshData();
  };

  const onLeaveEvent = () => {
    console.log("leave event");
    leaveEvent(user, event.id);
    refreshData();
  };

  const renderParticipants = useMemo(() => {
    return participants.map((participant: any, index: number) => {
      const {
        uid,
        firstName,
        lastName,
        age,
        gender,
        position,
        location,
        email,
      } = participant;
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
            <div className="">{age}</div>
          </td>
          <td>
            <div className="">{gender}</div>
          </td>
          <td>
            <div className="text-sm">{location}</div>
          </td>
          <td>{email}</td>
          <th>
            <button
              className="btn btn-ghost btn-xs"
              onClick={() =>
                Router.push({ pathname: "/profile", query: { id: uid } })
              }
            >
              details
            </button>
          </th>
        </tr>
      );
    });
  }, [participants]);

  return <>
    {event && (
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
              {event.participants?.length || 0}
              {event.maxParticipants > 0
                ? `/${event.maxParticipants}`
                : ""}{" "}
              Participant(s)
            </p>
            {user && event.participants && event.participants[user.claims.user_id] ? (
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
        {console.log('full event', event)}
        <div>
          <h2 className="card-title font-bold">Event Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="font-bold">Start Date</div>
              <div className="text-sm text-secondary font-bold">
                {moment(event.startDate?.toDate()).format("lll") || "N/A"}
              </div>
              <div className="font-bold">End Date</div>
              <div className="text-sm text-secondary font-bold">
                {moment(event.endDate?.toDate()).format("lll") || "N/A"}
              </div>
              <div className="font-bold">Location</div>
              <div className="text-sm text-secondary font-bold">
                {event.location || 'N/A'}{" "}
                {event.location !== "Online" ? `\@ ${event.office}` : ""}
              </div>
              <div className="font-bold">Event Type</div>
              <div className="text-sm text-secondary font-bold">
                {event.eventType || "N/A"}
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
                  <th>Age</th>
                  <th>Gender</th>
                  <th>From</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>{renderParticipants}</tbody>
            </table>
          </div>
        </div>
      </div>
    )}
  </>;
};

export default EventInfo;
