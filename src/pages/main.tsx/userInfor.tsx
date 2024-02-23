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
    <div className="col-md-2">
      <div className="row">
        <div className="col-md" style={{ height: "160px" }}>
          <div
            style={{
              width: "500px",
              height: "100px",
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
                border: "7px solid #313338",
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
                  border: "5px solid #313338",
                  borderRadius: "50%",
                }}
              ></i>
            </div>
          </div>
        </div>
      </div>
      <div style={{ paddingLeft: "20px"}}>
        <div
          className="row rounded border border-0 mx-auto"
          style={{
            width: "460px",
            paddingLeft: "20px",
            backgroundColor: "#111214",
            paddingTop: "16px",
          }}
        >
          {children}
        </div>

        <div>
          <button
            type="button"
            className="btn border-0"
            style={{
              width: "460px",
              marginTop: "10px",
              textAlign: "left",
              color: "#b5bac1",
              backgroundColor: "#111214",
            }}
          >
            1 Mutual Server
            <i
              className="fa fa-arrow-right"
              aria-hidden="true"
              style={{ paddingLeft: "295px" }}
            ></i>
          </button>
        </div>
        <button
          type="button"
          className="btn border-0"
          style={{
            width: "460px",
            marginTop: "10px",
            backgroundColor: "#111214",
            color: "#b5bac1",
          }}
        >
          <i
            className="fa fa-gift"
            aria-hidden="true"
            style={{ paddingRight: "5px" }}
          ></i>
          Gift Nitro
        </button>
      </div>
      <div></div>
    </div>
  );
};

export default UserInfo;
