import { useRouter } from "next/router";
import React, { useEffect, useState, useMemo } from "react";
import { getUserDataById } from "../../back-end/functions";
import { useAuth } from "../../back-end/authContext";
import Image from "next/image";

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
      <div className="flex flex-col justify-center items- bg-base-200 rounded-3xl">
        <div className="hero-content flex flex-col lg:flex-row">
          <div className="mask mask-squircle w-48 h-48">
            <Image src={profile.profilePic || "https://via.placeholder.com/300"} width={192} height={192} alt="Avatar" />
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl font-bold ">{`${profile.firstName} ${profile.lastName}`}</h1>
            <p className="text-lg italic">{profile.bio}</p>
            <h2 className="page-subtitle badge badge-secondary p-4 text-white">
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
            <p className="font-bold">
              Chat with me{" "}
              <span className="text-secondary">
                <a className="link" href={`mailto:${profile.email}`}>
                  {profile.email}
                </a>
              </span>
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
