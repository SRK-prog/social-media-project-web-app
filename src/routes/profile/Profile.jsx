import { useContext, useEffect, useState, useRef } from "react";
import { Schedule, Room } from "@material-ui/icons";
import { useHistory, useLocation, Link } from "react-router-dom";
import "./profile.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { Context } from "../../context/Context";
import { PROFILE_AVATAR } from "../../constants/constants";
import BASE_URL from "../../api/baseUrl";
import Cards from "../../components/cards/Cards";

export default function Profile() {
  const [profile, setProfile] = useState({});
  const [follow, setfollow] = useState(0);
  const [isfollowed, setIsfollowed] = useState(false);
  const [posts, setUserposts] = useState([]);
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const { user: currentUser } = useContext(Context);
  const history = useHistory();

  const myRef = useRef(null);
  const executeScroll = () => scrollToRef(myRef);
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

  useEffect(() => {
    document.title = profile?.username ? `Profile | ${profile?.username}` : "Profile";
  }, [profile?.username]);

  // Follow Feature
  const followHandler = () => {
    try {
      BASE_URL.put("/users/profile/follow", {
        requesterId: currentUser?._id,
        profileId: profile?._id,
      });
    } catch (err) {
      console.log("follow feature error: ", err);
    }
    setfollow(isfollowed ? follow - 1 : follow + 1);
    setIsfollowed((p) => !p);
  };

  // Fetching users data
  useEffect(() => {
    BASE_URL.get(`/users/${path}`)
      .then(({ data }) => {
        setProfile(data);
        setfollow(data.followers.length);
        setIsfollowed(data.followers.includes(currentUser._id));
      })
      .catch(() => {
        history.push("/error404");
      });
    // eslint-disable-next-line
  }, [path, currentUser._id]);

  const isfollowing = () => {
    return profile?.followings?.includes(currentUser._id);
  };

  // Fetching user posts
  useEffect(() => {
    (async () => {
      try {
        BASE_URL.get("/posts/profile/" + path)
          .then((r) => r.data)
          .then(setUserposts);
      } catch (error) {
        console.log("error: ", error);
      }
    })();
  }, [path]);

  return (
    <div className="flex max-w-360 mx-auto">
      <div className="flex-[2] md:block hidden">
        <Sidebar />
      </div>
      <div className="relative flex-[6.5] bg-gray-130">
        <div className="h-24 bg-gray-140"></div>
        <div>
          <img
            className="ProfileImage"
            src={profile?.profilepicture || PROFILE_AVATAR}
            alt=""
          />
          {profile?.description && <div style={{ height: "25px" }}></div>}
          {profile?.city && <div style={{ height: "25px" }}></div>}
          <div className="ProfileDetails">
            <div className="FollowFlex">
              <span className="FollowFlexBox"></span>
              <span className="FollowCounts">
                <span
                  onClick={executeScroll}
                  className="Follows cursor-pointer"
                >
                  <div className="CountsTitles">Posts</div>
                  <div className="CountsOf">{posts.length}</div>
                </span>
                <span className="Follows">
                  <div className="CountsTitles">Followers</div>
                  <div className="CountsOf">{follow}</div>
                </span>
                <span className="Follows">
                  <div className="CountsTitles">Following</div>
                  <div className="CountsOf">
                    {profile?.followings?.length || 0}
                  </div>
                </span>
              </span>
            </div>
            <div className="UserInfo">
              <div className="UserName">
                <h2>{profile?.username}</h2>
                <p>@{profile?.username}</p>
              </div>
              <div className="BtnWrper">
                {profile?._id !== currentUser?._id && (
                  <div className="BtnSection">
                    <div className="FollowBtn">
                      <div>
                        {isfollowed ? (
                          <button
                            className="followingbutton"
                            onClick={followHandler}
                          >
                            Following
                          </button>
                        ) : (
                          <button
                            className={
                              !isfollowing()
                                ? "followbutton"
                                : "followbackbutton"
                            }
                            onClick={followHandler}
                          >
                            {isfollowing() ? "Follow back" : "Follow"}
                          </button>
                        )}
                      </div>
                    </div>
                    {(isfollowed || isfollowing()) && (
                      <div className="FollowBtn">
                        <Link to="/chat" className="LinkBtn text-white">
                          Messege
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="DescContainer">
              {profile?.description && (
                <div className="UserAbout">{profile?.description}</div>
              )}
            </div>
            <div className="JoinDate">
              {profile?.city && (
                <span className="JoinItems">
                  <Room className="IconSpace" /> {profile?.city}
                </span>
              )}
              <span className="JoinItems">
                <Schedule className="IconSpace" />
                {new Date(profile?.createdAt).toDateString()}
              </span>
            </div>
          </div>
        </div>
        <div className="ProfilePostWrapper">
          <div ref={myRef} className="ProfilePosts">
            {!!posts?.length && <Cards NoLink={true} posts={posts} />}
          </div>
        </div>
      </div>
    </div>
  );
}
