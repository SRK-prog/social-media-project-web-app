import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Search, Close, Menu } from "@material-ui/icons";
import "./Navbar.css";
import { Context } from "../../context/Context";
import Menubar from "../sidebar/menubar/Menubar";
import { DEFAULT_AVATAR } from "../../constants/constants";
import BASE_URL from "../../api/URL";
import MobSearchDropdown from "./mobSearchDropdown";
import ClickOutside from "../../common/components/clickOutside";
import MenusDropdown from "./menusDropdown";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchterm, setSearchterm] = useState("");
  const [searchdata, setSearchdata] = useState([]);

  const { user, dispatch } = useContext(Context);

  useEffect(() => {
    if (!searchterm) return;
    const timeout = setTimeout(() => {
      (async () => {
        const { data } = await BASE_URL.get("/search", {
          params: { username: searchterm },
        });
        setSearchdata(data);
      })();
    }, 500);
    return () => clearTimeout(timeout);
  }, [searchterm]);

  const handlelogout = () => dispatch({ type: "LOGOUT" });

  return (
    <div className="topbarContainer md:px-5">
      <div className="max-w-360 mx-auto flex items-center justify-between w-full">
        <div className="flex items-center">
          <div className="flex items-center justify-center gap-3">
            <button
              className="text-gray-60 select-none md:hidden"
              onClick={() => setShowSidebar((p) => !p)}
            >
              <Menu />
            </button>
            <Link
              to="/"
              className="font-bold md:text-xl text-lg px-2 md:h-12 h-10 gap-2 text-white cursor-pointer bg-black-0 rounded flex items-center"
            >
              <div>Social</div>
              <div>Media</div>
            </Link>
            <ClickOutside isOpen={showSidebar} onClickOutside={setShowSidebar}>
              <Menubar showSidebar={showSidebar} onClose={setShowSidebar} />
            </ClickOutside>
          </div>
          <div className="topbarCenter">
            <div className="searchbar display_none h-12">
              {searchterm ? "" : <Search className="searchIcon" />}
              <input
                placeholder="Search..."
                className="searchInput"
                value={searchterm}
                onChange={(e) => setSearchterm(e.target.value.toLowerCase())}
              />
              {!!searchdata?.length && !!searchterm && (
                <div className="searchNameLinksCon">
                  {searchdata.map(({ username }, idx) => (
                    <Link
                      key={idx}
                      onClick={() => setSearchterm("")}
                      className="searchNameLinks"
                      to={`/profile/${username}`}
                    >
                      {username}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarLinks">
            {user ? (
              <Link
                to="/write"
                className="styleLink display_none duration-200 font-bold"
              >
                Create Post
              </Link>
            ) : (
              <>
                <Link to="/login" className="topbarLink display_none">
                  Log in
                </Link>
                <Link to="/signup" className="styleLink">
                  Create account
                </Link>
              </>
            )}
          </div>
          {user && (
            <div className="topbarIcons">
              <div className="topbarIconItemSearch">
                {!showSearch ? (
                  <Search
                    className="Icon"
                    onClick={() => setShowSearch(true)}
                  />
                ) : (
                  <Close
                    className="Icon"
                    onClick={() => setShowSearch(false)}
                  />
                )}
              </div>
              <div className="topbarIconItem">
                <img
                  src={user.profilepicture || DEFAULT_AVATAR}
                  alt=""
                  className="w-9 h-9 rounded-full object-cover"
                  onClick={() => setShowMenu((p) => !p)}
                />
                {showMenu && (
                  <MenusDropdown
                    onLogout={handlelogout}
                    user={user}
                    onClose={setShowMenu}
                  />
                )}
              </div>
            </div>
          )}
        </div>
        {showSearch && (
          <MobSearchDropdown
            value={searchterm}
            onChange={setSearchterm}
            data={searchdata}
            onClose={setShowSearch}
          />
        )}
      </div>
    </div>
  );
}
