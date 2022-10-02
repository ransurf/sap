import React, { useState, useEffect } from "react";
import ProfileTable from "../../components/ProfileTable";
import { getAllUsers } from "../../back-end/functions";

type Props = {};

const Profiles = (props: Props) => {
  const [users, setUsers] = useState<any>([]);
  const getUsers = async () => {
    const fetchedUsers = await getAllUsers();
    console.log('fetchedUsers', fetchedUsers)
    setUsers(fetchedUsers);
    console.log("users", fetchedUsers);
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    users &&
    users.length > 0 && (
      <div className="page-container">
        <ProfileTable profiles={users} />
      </div>
    )
  );
};

export default Profiles;
