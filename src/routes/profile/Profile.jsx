import ScheduleIcon from "@material-ui/icons/Schedule";
import RoomIcon from "@material-ui/icons/Room";
import { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import "./profile.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { Context } from "../../context/Context";
import { DEFAULT_AVATAR } from "../../constants/constants";
import BASE_URL from "../../api/URL";
import Cards from "../../components/cards/Cards";

export default function Profile() {
  const [details, setProfileDetails] = useState({});
  const [follow, setfollow] = useState([]);
  const [id, setId] = useState();
  const [isfollowed, setIsfollowed] = useState(false);
  const [followings, setfollowings] = useState([]);
  const [desc, setdesc] = useState();
  const [name, setName] = useState();
  const [city, setCity] = useState();
  const [time, setTime] = useState();
  const [Isfollowing, setIsfollowing] = useState();
  const [picture, setPicture] = useState();
  const [posts, setUserposts] = useState([]);
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const { user: currentUser } = useContext(Context);
  const history = useHistory();
  const myRef = useRef(null);
  const executeScroll = () => scrollToRef(myRef);
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

  useEffect(() => {
    document.title = name ? `${name} | Mern` : "Profile | Mern";
  }, [name]);

  // Follow Feature
  const followHandler = () => {
    try {
      BASE_URL.put("/users/" + id + "/follow", {
        userId: currentUser._id,
      });
      if (!isfollowed) {
        if (!Isfollowing) {
          try {
            BASE_URL.post("/conversations", {
              senderId: currentUser._id,
              receiverId: id,
            });
          } catch (err) {}
        }
      } else if (!Isfollowing) {
        BASE_URL.delete(`/conversations/delete/${currentUser._id}/${id}`);
      }
    } catch (err) {}
    setfollow(isfollowed ? follow - 1 : follow + 1);
    setIsfollowed(!isfollowed);
  };

  // Fetching users data
  useEffect(() => {
    BASE_URL.get(`/users/${path}`)
      .then(({ data }) => {
        setProfileDetails(data);
        setName(data.username);
        setdesc(data.desc);
        setCity(data.city);
        setTime(data.createdAt);
        setPicture(data.profilepicture);
        setfollow(data.followers.length);
        setfollowings(data.followings.length);
        setId(data._id);
        setIsfollowing(data.followings.includes(currentUser._id));
        setIsfollowed(data.followers.includes(currentUser._id));
      })
      .catch(() => {
        history.push("/error404");
      });
  }, [path, history, currentUser._id]);

  // Fetching user posts
  useEffect(() => {
    const response = async () => {
      await BASE_URL.get("/posts/profile/" + path).then(({ data }) => {
        setUserposts(data);
      });
    };
    response();
  }, [path]);

  return (
    <div className="ProfileFlexBox">
      <div className="DisplayNoneSidebar">
        <Sidebar />
      </div>
      <div className="ProfileContainer">
        <div className="colorContainer"></div>
        <div>
          <img
            className="ProfileImage"
            src={picture ? picture : DEFAULT_AVATAR}
            alt=""
          />
          {desc && <div style={{ height: "25px" }}></div>}
          {city && <div style={{ height: "25px" }}></div>}
          <div className="ProfileDetails">
            <div className="FollowFlex">
              <span className="FollowFlexBox"></span>
              <span className="FollowCounts">
                <span
                  onClick={executeScroll}
                  className="Follows"
                  style={{ cursor: "pointer" }}
                >
                  <div className="CountsTitles">Posts</div>{" "}
                  <div className="CountsOf">{posts.length}</div>
                </span>
                <span className="Follows">
                  <div className="CountsTitles">Followers</div>{" "}
                  <div className="CountsOf">{follow}</div>
                </span>
                <span className="Follows">
                  {" "}
                  <div className="CountsTitles">Following</div>{" "}
                  <div className="CountsOf">{followings}</div>
                </span>
              </span>
            </div>
            <div className="UserInfo">
              <div className="UserName">
                <h2>{details?.username}</h2>
                <p>@{details?.username}</p>
              </div>
              <div className="BtnWrper">
                <div className="BtnSection">
                  <div className="FollowBtn">
                    {name !== currentUser?.username && (
                      <div>
                        {isfollowed ? (
                          <span
                            className="followingbutton"
                            onClick={followHandler}
                          >
                            Following
                          </span>
                        ) : (
                          <span
                            className={
                              !Isfollowing ? "followbutton" : "followbackbutton"
                            }
                            onClick={followHandler}
                          >
                            {Isfollowing ? "FollowBack" : "Follow"}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="FollowBtn">
                    {name !== currentUser?.username && (
                      <Link
                        to="/chat"
                        className="LinkBtn"
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        Messege
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="DescContainer">
              {" "}
              {desc && <div className="UserAbout">{desc}</div>}
            </div>
            <div className="JoinDate">
              {city && (
                <span className="JoinItems">
                  <RoomIcon className="IconSpace" /> {city}
                </span>
              )}
              <span className="JoinItems">
                <ScheduleIcon className="IconSpace" />{" "}
                {new Date(time).toDateString()}
              </span>
            </div>
          </div>
        </div>
        <div className="ProfilePostWrapper">
          <div ref={myRef} className="ProfilePosts">
            {posts && <Cards NoLink={true} posts={posts} />}
          </div>
        </div>
      </div>
    </div>
  );
}
