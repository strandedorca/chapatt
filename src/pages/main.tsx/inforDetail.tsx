import React from "react";

type UserInfoDetailProps = {
  label: string;
  value: string;
};

const UserInfoDetail: React.FC<UserInfoDetailProps> = ({ label, value }) => {
  return (
    <div className="row text-start ">
      <div className="col border-bottom" >
        <p className="fw-bold">{label}</p>
        <p>{value}</p>
      </div>
    </div>
  );
};

export default UserInfoDetail;
