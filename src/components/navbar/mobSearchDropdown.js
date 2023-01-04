import React from "react";
import { Link } from "react-router-dom";
import { Search } from "@material-ui/icons";
import ClickOutside from "../../common/components/clickOutside";

const SearchDropdown = ({ onChange, value, onClose, data }) => {
  return (
    <ClickOutside
      onClickOutside={onClose}
      className="absolute bg-white w-full top-14 md:hidden left-0"
    >
      <div className="SearchBoxWrapers">
        <span className="SearchPopUpInputBox">
          <input
            type="text"
            className="SearchPopUpInput"
            placeholder="Search..."
            value={value}
            onChange={(e) => {
              onChange(e.target.value.toLowerCase());
            }}
          />
        </span>
        <div>
          <Search className="SearchPopUpBtn" />
        </div>
      </div>
      {!!data?.length && (
        <div className="flex flex-col py-3 px-2">
          {data.map(({ username }, idx) => (
            <Link
              key={idx}
              className="searchNameLinks responsive block w-full"
              onClick={() => {
                onChange("");
                onClose(false);
              }}
              to={`/profile/${username}`}
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
