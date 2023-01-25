import React from "react";
import { useHistory } from "react-router-dom";
import { DEFAULT_AVATAR } from "../../constants/constants";

const ListItem = ({ data }) => {
  const history = useHistory();
  return (
    <div
      onClick={() => history.push(`/profile/${data?._id}`)}
      className="flex p-2.5 cursor-pointer bg-white mb-1 mx-1"
    >
      <img
        className="w-10 h-10 object-cover mr-5 rounded-full"
        src={data?.profilepicture || DEFAULT_AVATAR}
        alt=""
      />
      <div className="font-medium">
        <div>{data?.username}</div>
      </div>
    </div>
  );
};

export default ListItem;
