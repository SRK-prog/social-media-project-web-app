import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Close, Menu } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import Menubar from "../sidebar/menubar/Menubar";
import { DEFAULT_AVATAR } from "../../constants/constants";
import BASE_URL from "../../api/baseUrl";
import MobSearchDropdown from "./mobSearchDropdown";
import ClickOutside from "../../common/components/clickOutside";
import MenusDropdown from "./menusDropdown";
import { actionTypes } from "../../constants/constants";
import { APP_NAME } from "../../constants/constants";

const { REMOVE_USER } = actionTypes;

export default function Navbar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchterm, setSearchterm] = useState("");
  const [searchdata, setSearchdata] = useState([]);

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

  const handlelogout = () => dispatch({ type: REMOVE_USER });

  return (
    <div className="h-[55px] shadow z-50 bg-white flex items-center sticky top-0 px-5">
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
              className="font-bold md:text-xl text-lg px-2.5 h-11 gap-2 text-white cursor-pointer bg-black-0 rounded flex items-center"
            >
              {APP_NAME}
            </Link>
            <ClickOutside isOpen={showSidebar} onClickOutside={setShowSidebar}>
              <Menubar showSidebar={showSidebar} onClose={setShowSidebar} />
            </ClickOutside>
          </div>
          <ClickOutside
            isOpen={!!searchterm}
            onClickOutside={() => setSearchterm("")}
            className="md:flex relative hidden h-10 py-1 items-center px-3 border border-gray-90 rounded w-80"
          >
            <input
              placeholder="search..."
              className="focus:outline-none flex-grow text-base"
              value={searchterm}
              onChange={(e) => setSearchterm(e.target.value.toLowerCase())}
            />
            {!searchterm && <Search className="ml-2 w-4 h-4 text-xs" />}
            {!!searchdata?.length && !!searchterm && (
              <div className="absolute top-12 left-0 bg-white w-full rounded p-1">
                {searchdata.map(({ username, _id }, idx) => (
                  <Link
                    key={idx}
                    onClick={() => setSearchterm("")}
                    className="hover:outline-1 hover:outline rounded px-2 py-1 hover:outline-lightBlue-20 hover:text-blue-30 block"
                    to={`/profile/${_id}`}
                  >
                    {username}
                  </Link>
                ))}
              </div>
            )}
          </ClickOutside>
        </div>
        <div className="flex items-center text-white">
          <div className="flex items-center gap-4">
            {user.isLoggedIn ? (
              <Link
                to="/write"
                className="p-2.5 ml-2 text-blue-50 border-2 border-blue-50 no-underline rounded mr-2 text-sm cursor-pointer md:block hidden duration-200 font-bold hover:bg-[#2484dd] hover:text-white"
              >
                Create Post
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="md:block hidden text-sm text-black-0 duration-200 hover:text-blue-50"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="p-2.5 ml-2 text-blue-50 border-2 border-blue-50 no-underline rounded mr-2 text-sm cursor-pointer duration-200 font-bold hover:bg-[#2484dd] hover:text-white"
                >
                  Create account
                </Link>
              </>
            )}
          </div>
          {user.isLoggedIn && (
            <div className="flex items-center gap-4 ml-3">
              <button
                onClick={() => setShowSearch((p) => !p)}
                className="md:hidden"
              >
                {!showSearch ? (
                  <Search className="text-4xl text-[#817d7d]" />
                ) : (
                  <Close className="text-4xl text-[#817d7d]" />
                )}
              </button>
              <div className="relative cursor-pointer">
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
