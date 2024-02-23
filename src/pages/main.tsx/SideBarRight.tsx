import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import UserInfo from "./userInfor";
import UserInfoDetail from "./inforDetail";

type User = {
  backgroundColorPersonal: string;
  urlAvatar: string;
  name: string;
  nickname: string;
  aboutMe: string;
  dateJoined: string;
  note: string;
};

export const SideBarRight: React.FC = () => {
  let isDarkMode = false;
  if (isDarkMode) { }
  let userInfo: User[] = [
    {
      backgroundColorPersonal: "brown",
      urlAvatar:
        "https://bestfriends.org/sites/default/files/styles/hero_mobile/public/hero-dash/Asana3808_Dashboard_Standard.jpg?h=ebad9ecf&itok=cWevo33k",
      name: "Nguyen Van A",
      nickname: "A Van",
      aboutMe: "Funny, head on clound",
      dateJoined: "10/20/2023",
      note: "This is a comment",
    },
    {
      backgroundColorPersonal: "",
      urlAvatar: "",
      name: "Nguyen Van B",
      nickname: "B Van",
      aboutMe: "",
      dateJoined: "",
      note: "",
    },
  ];
  const user: User = userInfo[0];

  return (
    <div
      // className="container"
      style={{ backgroundColor: "#313338", color: "#ffffff", height: "749px" }}
    >
      <div className="row ">
        <UserInfo user={user}>
          <UserInfoDetail label="Name" value={user.name} />
          <hr style={{ border: "1px solid white", width: "420px" }}></hr>
          <UserInfoDetail label="Nickname" value={user.nickname} />
          <hr style={{ border: "1px solid white", width: "420px" }}></hr>
          <UserInfoDetail label="About Me" value={user.aboutMe} />
          <hr style={{ border: "1px solid white", width: "420px" }}></hr>
          <UserInfoDetail label="Name Member Joined" value={user.dateJoined} />
          <hr style={{ border: "1px solid white", width: "420px" }}></hr>
          <UserInfoDetail label="Note" value={user.note} />
        </UserInfo>
      </div>
    </div>
  );
};
