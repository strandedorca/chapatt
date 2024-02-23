import React from "react";

type UserInfoDetailProps = {
  label: string;
  value: string;
};

const UserInfoDetail: React.FC<UserInfoDetailProps> = ({ label, value }) => {
  return (
    <div className="row text-start " style={{}}>
      <div className="col" >
        <p className="fw-bold" style={{}}>{label}</p>
        <p>{value}</p>
      </div>
    </div>
  );
};

export default UserInfoDetail;
