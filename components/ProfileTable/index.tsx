import React, { useMemo } from "react";
import Router from "next/router";
import { getAllUsers, getUserData } from "../../back-end/functions";
import Image from "next/image";

type Props = {
  profiles: any;
};

const ProfileTable = ({profiles: participants}: Props) => {
  console.log("participants",participants)
  
  const renderParticipants = useMemo(() => {
      
      return participants.map((participant: any, index: number) => {
      const {
        id,
        firstName,
        lastName,
        age,
        profilePic,
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
                  <Image
                    src={profilePic || "https://via.placeholder.com/48"}
                    width={48}
                    height={48}
                    alt="Avatar"
                  />
                </div>
              </div>
              <div>
                <div className="font-bold">{`${firstName || ""} ${
                  lastName || ""
                }`}</div>
                {position && (
                  <span className="badge badge-ghost badge-sm">{position}</span>
                )}
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
              disabled={!firstName}
              className="btn btn-secondary btn-xs text-white"
              onClick={() =>
                Router.push({ pathname: "/profile", query: { id: id } })
              }
            >
              {firstName ? "View Details" : "No Info"}
            </button>
          </th>
        </tr>
      );
    });
  }, [participants]);

  return (
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
            <th>Profile</th>
          </tr>
        </thead>
        <tbody>{renderParticipants}</tbody>
      </table>
    </div>
  );
};

export default ProfileTable;
