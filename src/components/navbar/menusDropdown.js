import React from "react";
import { Link } from "react-router-dom";
import ClickOutside from "../../common/components/clickOutside";

const MenusDropdown = ({ onClose, user, onLogout }) => {
  return (
    <ClickOutside
      className="w-48 absolute flex p-1 bg-white flex-col rounded top-12 right-0 shadow-md"
      onClickOutside={onClose}
    >
      <Link
        onClick={() => onClose(false)}
        to={`/profile/${user.username}`}
        className="linkListprofile px-1.5 duration-200"
      >
        <div className="font-medium text-xl">{user?.username}</div>
        <div className="text-sm">@{user?.username}</div>
      </Link>
      <Link
        onClick={() => onClose(false)}
        to="/write"
        className="linkListItems duration-200"
      >
        Create post
      </Link>
      <Link
        onClick={() => onClose(false)}
        to="/settings"
        className="linkListItems duration-200"
      >
        Settings
      </Link>
      <button
        className="text-black-0 text-base bg-white duration-200"
        onClick={onLogout}
      >
        Sign Out
      </button>
    </ClickOutside>
  );
};

export default MenusDropdown;
