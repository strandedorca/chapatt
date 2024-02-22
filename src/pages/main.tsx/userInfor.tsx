import React, { ReactNode } from "react";

type User = {
  backgroundColorPersonal: string;
  urlAvatar: string;
  name: string;
  nickname: string;
  aboutMe: string;
  dateJoined: string;
  note: string;
};

type UserInfoProps = {
  user: User;
  children: ReactNode;
};

const UserInfo: React.FC<UserInfoProps> = ({ user, children }) => {

  // Xem có active hay không
  const isOnline = true;
  let iconActive;
  if (isOnline) { 
     iconActive = "green";
  } else { iconActive = "red" }

  // Return
  return (
    <div className="col-md-2" >
      <div className="row">
        <div className="col-md" style={{ height: "160px" }}>
          <div
            style={{
              width: "500px",
              height: "100px",
              padding: "10px",
              backgroundColor: user.backgroundColorPersonal,
            }}
          ></div>
          <div>
            <img
              className="rounded-circle float-left"
              src={user.urlAvatar}
              alt="Avatar"
              style={{
                width: "100px",
                height: "100px",
                position: "relative",
                bottom: "60px",
                left: "30px",
                border: "5px solid white",
              }}
            />
            <div>
              <i
                className="fa fa-circle"
                aria-hidden="true"
                style={{
                  color: iconActive,
                  position: "relative",
                  bottom: "88px",
                  left: "81px",
                  border: "5px solid white",
                  borderRadius: "50%",
                }}
              ></i>
            </div>
          </div>
        </div>
      </div>
      <div
        className="row rounded border border-secondary mx-auto"
        style={{ width: "500px" }}
      >
        {children}
      </div>
      <div>
        <button
          type="button"
          className="btn btn-outline-secondary"
          style={{ width: "500px", marginTop: "10px", textAlign: "left" }}
        >
          1 Mutual Server
          <i className="fa fa-arrow-right" aria-hidden="true" style={{paddingLeft:"310px"}}></i>
        </button>
      </div>
      <button
        type="button"
        className="btn btn-outline-secondary"
        style={{ width: "500px", marginTop: "10px" }}
      >
        <i
          className="fa fa-gift"
          aria-hidden="true"
          style={{ paddingRight: "5px" }}
        ></i>
        Gift Nitro
      </button>
      <div></div>
    </div>
  );
};

export default UserInfo;
