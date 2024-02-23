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
    <div className="container" style={{ backgroundColor: "#232428", color:"white", height:"700px"}}>
      <div className="row ">
        <UserInfo user={user}>
          <UserInfoDetail label="Name" value={user.name} />
          <UserInfoDetail label="Nickname" value={user.nickname} />
          <UserInfoDetail label="About Me" value={user.aboutMe} />
          <UserInfoDetail label="Name Member Joined" value={user.dateJoined} />
          <UserInfoDetail label="Note" value={user.note} />
        </UserInfo>
      </div>
    </div>
  );
};