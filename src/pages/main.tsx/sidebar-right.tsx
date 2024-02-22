import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

export const SideBarRight = () => {
  let userInfo = [
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
    },
  ];
  const user = userInfo[0];

  return (
    <>
      <div className="container" style={{width: "600px"}}>
        <div className="row">
          <div className="col-md-2">
            {/* Hàng 1 */}
            <div className="row">
              <div className="col-md">
                <div
                  style={{
                    width: "500px",
                    height: "100px",
                    backgroundColor: user.backgroundColorPersonal,
                  }}
                ></div>
                <div>
                  <div>
                    <img
                      className="rounded-circle img-thumbnail float-left"
                      src={user.urlAvatar}
                      alt="Avatar"
                      style={{
                        width: "50px",
                        height: "50px",
                        position: "relative",
                        bottom: "35px",
                        left: "30px",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Kết thúc hàng 1 */}

            <div
              className="row rounded border border-secondary align-items-center"
              style={{ width: "500px" }}
            >
              <div className="row border-bottom text-start">
                {/* Khu để thông tin hình vuông */}
                <div>
                  <p className="fw-bold">{user.name}</p>
                </div>
                <div>
                  <p>{user.nickname}</p>
                </div>
              </div>
              {/* Khu để thông tin 2 */}
              <div className="row border-bottom text-start">
                <div>
                  <p className="fw-bold">About Me</p>
                  <p>{user.aboutMe}</p>
                </div>
                <div>
                  <p className="fw-bold">Name Member Joined</p>
                  <p>{user.dateJoined}</p>
                </div>
              </div>
              {/* Khu để thông tin note */}
              <div className="row border-bottom text-start">
                <div>
                  <p>Note</p>
                  <p>{user.note}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
