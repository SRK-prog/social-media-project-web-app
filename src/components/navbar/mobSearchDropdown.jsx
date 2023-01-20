import React from "react";
import { Link } from "react-router-dom";
import { Search } from "@material-ui/icons";
import ClickOutside from "../../common/components/clickOutside";

const SearchDropdown = ({ onChange, value, onClose, data }) => {
  return (
    <ClickOutside
      onClickOutside={onClose}
      className="absolute bg-white w-full top-[54px] shadow-md md:hidden left-0"
    >
      <div className="flex items-center pb-2 pt-5 px-4 gap-3">
        <span className="w-[90%]">
          <input
            type="text"
            className="w-full rounded py-2 px-3 border border-[#747272] focus:outline-none"
            placeholder="Search..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </span>
        <div>
          <Search className="text-[#817d7d]" />
        </div>
      </div>
      {!!data?.length && !!value && (
        <div className="flex flex-col py-3 px-2">
          {data.map(({ username, _id }, idx) => (
            <Link
              key={idx}
              className="hover:outline-1 hover:outline rounded px-2 py-1 hover:outline-lightBlue-20 hover:text-blue-30 block w-full"
              onClick={() => {
                onChange("");
                onClose(false);
              }}
              to={`/profile/${_id}`}
            >
              {username}
            </Link>
          ))}
        </div>
      )}
    </ClickOutside>
  );
};

export default SearchDropdown;
