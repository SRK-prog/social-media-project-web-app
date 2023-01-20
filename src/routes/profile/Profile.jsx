import { useEffect, useState, useRef } from "react";
import { Schedule, Room } from "@material-ui/icons";
import { useHistory, useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "../../components/sidebar/Sidebar";
import { PROFILE_AVATAR } from "../../constants/constants";
import BASE_URL from "../../api/baseUrl";
import Cards from "../../components/cards/Cards";
import Loader from "../../common/components/loader";

export default function Profile() {
  const user = useSelector((state) => state.user);

  const [profile, setProfile] = useState({});
  const [follow, setfollow] = useState(0);
  const [isfollowed, setIsfollowed] = useState(false);
  const [posts, setUserposts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const profileId = location.pathname.split("/")[2];
  const history = useHistory();

  const postScrollRef = useRef(null);
  const executeScroll = () => scrollToRef(postScrollRef);
  const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

  useEffect(() => {
    document.title = profile?.username
      ? `Profile | ${profile?.username}`
      : "Profile";
  }, [profile?.username]);

  // Follow Feature
  const followHandler = () => {
    try {
      BASE_URL.put(
        "/users/profile/follow",
        { profileId: profile?._id },
        { headers: { Authorization: `Bearer ${user.accessToken}` } }
      );
    } catch (err) {
      console.log("follow feature error: ", err);
    }
    setfollow(isfollowed ? follow - 1 : follow + 1);
    setIsfollowed((p) => !p);
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const select =
          "username email profilepicture followers followings createdAt lastSeen";
        const [profileUser, profilePosts] = await Promise.all([
          BASE_URL.get(`/users`, {
            params: { userId: profileId, select },
          }),
          BASE_URL.get("/posts/profile", {
            params: { userId: profileId },
          }).catch((er) => {
            if (er.response.status === 404) setUserposts([]);
          }),
        ]);

        if (profilePosts) setUserposts(profilePosts.data?.response || []);
        setProfile(profileUser.data?.response);
        setfollow(profileUser.data?.response?.followers?.length);
        setIsfollowed(
          profileUser.data?.response?.followers?.includes(user.userId)
        );
      } catch (error) {
        history.push("/error404");
        console.log("profile error: ", error);
      } finally {
        setIsLoading(false);
      }
    })();
    // eslint-disable-next-line
  }, [profileId, user.userId]);

  const isfollowing = () => {
    return profile?.followings?.includes(user.userId);
  };

  return (
    <div className="flex max-w-360 mx-auto">
      <div className="flex-[2] md:block hidden">
        <Sidebar />
      </div>
      {isLoading && (
        <div className="flex-[6.5]">
          <Loader />
        </div>
      )}
      {!isLoading && (
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
                  {profile?._id !== user?.userId && (
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
                    <Room className="mr-2" /> {profile?.city}
                  </span>
                )}
                <span className="JoinItems">
                  <Schedule className="mr-2" />
                  {new Date(profile?.createdAt).toDateString()}
                </span>
              </div>
            </div>
          </div>
          <div className="ProfilePostWrapper">
            <div ref={postScrollRef} className="ProfilePosts">
              {!!posts?.length && <Cards NoLink={true} posts={posts} />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
