import React, {useMemo} from "react";
import Router from "next/router";

type Props = {
    profiles: any;
};

const ProfileTable = ({profiles: participants}: Props) => {
  const renderParticipants = useMemo(() => {
    return participants.map((participant: any, index: number) => {
      const {
        id,
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
                <div className="font-bold">{`${firstName || ''} ${lastName || ''}`}</div>
                {position && <span className="badge badge-ghost badge-sm">{position}</span>}
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
                Router.push({ pathname: "/profile", query: { id: id } })
              }
            >
              details
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
            <th>More</th>
          </tr>
        </thead>
        <tbody>{renderParticipants}</tbody>
      </table>
    </div>
  );
};

export default ProfileTable;
