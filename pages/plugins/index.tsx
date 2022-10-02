import React from "react";

type Props = {};

const Plugins = (props: Props) => {
  return (
    <div className="page-container">
      <h1 className="page-title">Integrations</h1>
      <h2 className="font-bold text-xl mt-4">Connect your account to use with the following tools</h2>
      <h2 className="font-bold text-xl mt-4">Slack</h2>
      <p>
        Slack is a messaging program designed specifically for the office, but has also been adopted for personal use. Developed by the Canadian software company Slack Technologies, and now owned by Salesforce, Slack offers many IRC-style features, including persistent chat rooms (channels) organized by topic, private groups, and direct messaging. In addition to these online communication features, Slack integrates with other software.
      </p>
      <button className="btn btn-primary max-w-sm self-end">Connect</button>
      <h2 className="font-bold text-xl mt-4">Discord</h2>
      <p>
      Discord is a VoIP and instant messaging social platform. Users have the ability to communicate with voice calls, video calls, text messaging, media and files in private chats or as part of communities called "servers". A server is a collection of persistent chat rooms and voice channels which can be accessed via invite links. Discord runs on Windows, macOS, Android, iOS, iPadOS, Linux, and in web browsers. As of 2021, the service has over 350 million registered users and over 150 million monthly active users.
      </p>
      <button className="btn btn-primary max-w-sm self-end">Connect</button>
      <br/>
      <p> *all app descriptions taken from wikipedia</p>
    </div>
  );
};

export default Plugins;
