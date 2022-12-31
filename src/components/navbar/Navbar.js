import React, { useState, useEffect } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { Search, Chat } from "@material-ui/icons";
import { Close } from "@material-ui/icons";
import "./Navbar.css";
import MenuIcon from "@material-ui/icons/Menu";
import { Context } from "../../context/Context";
import Menubar from "../sidebar/menubar/Menubar";
import { DEFAULT_AVATAR } from "../../constants/constants";
import BASE_URL from "../../api/URL";

export default function Navbar() {
  const [profilebtn, setProfilebtn] = useState(false);
  const [navmenu, setNavmenu] = useState(false);
  const [search, setSearchbox] = useState(false);
  const [searchterm, setSearchterm] = useState("");
  const [searchdata, setSearchdata] = useState([]);

  const searchboxtoggle = () => {
    setSearchbox(!search);
  };

  const NavmenuBtn = () => {
    setNavmenu(!navmenu);
  };

  const clicktoggle = () => {
    setProfilebtn(!profilebtn);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fetchUser = async () => {
        if (!searchterm) return;
        const { data } = await BASE_URL.get("/search", {
          params: { username: searchterm },
        });
        setSearchdata(data);
      };
      fetchUser();
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [searchterm]);

  const { user, dispatch } = useContext(Context);
  const handlelogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <>
      <div className="topbarContainer">
        <div className="max-w-360 mx-auto flex items-center w-full">
          <div className="topbarLeft">
            <OutsideClickHandler
              onOutsideClick={() => {
                setNavmenu(false);
              }}
            >
              {" "}
              <div onClick={() => setNavmenu(false)}>
                <Menubar data={navmenu} />
              </div>
              <button className="menuBtn" onClick={NavmenuBtn}>
                <MenuIcon />
              </button>
            </OutsideClickHandler>

            <Link to="/" className="logo">
              <span>M</span>
              <span className="LogoLists">
                <div className="LogoList">
                  <h1>ern</h1>
                </div>
                <div className="LogoList">
                  <h1>edia</h1>
                </div>
              </span>
            </Link>
          </div>
          <div className="topbarCenter">
            <div className="searchbar display_none">
              {searchterm ? "" : <Search className="searchIcon" />}
              <input
                placeholder="Search..."
                className="searchInput"
                value={searchterm}
                onChange={(e) => {
                  setSearchterm(e.target.value.toLowerCase());
                }}
              />
              {searchterm && (
                <div className="searchNameLinksCon">
                  {searchdata.map((data) => (
                    <Link
                      onClick={() => setSearchterm("")}
                      className="searchNameLinks"
                      to={`/profile/${data?.username}`}
                    >
                      {data?.username}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="topbarRight">
            <div className="topbarLinks">
              {user ? (
                <>
                  <Link to="/write" className="styleLink display_none">
                    Create Post
                  </Link>
                </>
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
            {user ? (
              <div className="topbarIcons">
                <div className="topbarIconItemSearch">
                  {!search ? (
                    <Search className="Icon" onClick={searchboxtoggle} />
                  ) : (
                    <Close className="Icon" onClick={searchboxtoggle} />
                  )}
                </div>
                <NavLink
                  to="/chat"
                  className="topbarIconItem"
                  activeClassName="None_chatIcon"
                >
                  <Chat className="Icon" />
                </NavLink>
                <OutsideClickHandler
                  onOutsideClick={() => {
                    setProfilebtn(false);
                  }}
                >
                  <div className="topbarIconItem">
                    <img
                      src={user.profilepicture || DEFAULT_AVATAR}
                      alt=""
                      className="topbarImg"
                      onClick={clicktoggle}
                    />
                  </div>
                  <div onClick={() => setProfilebtn(false)}>
                    <div className={`linktoggle ${profilebtn ? "active" : ""}`}>
                      <ul className="linkList">
                        <Link
                          to={`/profile/${user.username}`}
                          className="linkListprofile"
                        >
                          <div style={{ fontSize: "1.2rem" }}>
                            {user?.username}
                          </div>
                          <div style={{ fontSize: ".8rem" }}>
                            @{user?.username}
                          </div>
                        </Link>
                        <Link to="/write" className="linkListItems">
                          Create post
                        </Link>
                        <Link to="/settings" className="linkListItems">
                          Settings
                        </Link>
                        <button className="linkListbtn" onClick={handlelogout}>
                          Sign Out
                        </button>
                      </ul>
                    </div>
                  </div>
                </OutsideClickHandler>
              </div>
            ) : (
              ""
            )}
          </div>
          {search && (
            <div className="SearchBoxPopUp noneInLarge">
              <div className="SearchBoxWrapers">
                <span className="SearchPopUpInputBox">
                  <input
                    type="text"
                    className="SearchPopUpInput"
                    placeholder="Search..."
                    value={searchterm}
                    // onClick={searchhandle}
                    onChange={(e) => {
                      setSearchterm(e.target.value.toLowerCase());
                    }}
                  />
                </span>
                <span>
                  <Search className="SearchPopUpBtn" />
                </span>
              </div>
              <div>
                {searchterm && (
                  <div className="searchNameLinksCon">
                    {searchdata.map((name) => (
                      <Link
                        className="searchNameLinks responsive"
                        onClick={() => {
                          setSearchterm("");
                          setSearchbox(false);
                        }}
                        to={`/profile/${name}`}
                      >
                        {name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div style={{ height: "55px" }}></div>
    </>
  );
}
