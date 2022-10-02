import { useRouter } from "next/router";
import React, { useEffect, useState, useMemo } from "react";
import { getUserDataById } from "../../back-end/functions";
import { useAuth } from "../../back-end/authContext";

type Props = {};

const Profile = (props: Props) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<any>();
  const getProfile = async () => {
    const res = await getUserDataById(`${router.query.id}`);
    console.log("fetched profile", res);
    setProfile(res);
  };
  useEffect(() => {
    console.log("profile", router.query);
    console.log("profile info with id", router.query.id);
    getProfile();
  }, [router.query]);
  return profile ? (
    <div className="page-container">
      <div className="flex flex-col justify-center items- bg-base-200">
        <div className="hero-content flex flex-col lg:flex-row">
          <img
            src="https://placeimg.com/260/400/arch"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl font-bold ">{`${profile.firstName} ${profile.lastName}`}</h1>
            <h2 className="page-subtitle badge badge-secondary p-4">
              {profile.position} @ {profile.location}
            </h2>
            <h2>
              <span className="font-bold">Age: </span>
              {profile.age}
            </h2>
            <h2>
              {" "}
              <span className="font-bold">Gender: </span>
              {profile.gender}
            </h2>
            <h2>
              <span className="font-bold">Bio: </span>
              {profile.bio}
            </h2>
            <p className="font-bold">
              Chat with me{" "}
              <span className="text-secondary">{profile.email}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    "Loading"
  );
};

export default Profile;
