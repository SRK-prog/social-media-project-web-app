import { useEffect } from "react";
import { useContext } from "react";
import { connect } from "react-redux";
import Cards from "../../components/cards/Cards";
import "./Frndspost.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbox from "../../components/rightbox/Rightbox";
import { Context } from "../../context/Context";
import Skeleton from "../../components/Skeleton/Skeleton";
import { fetchFriendsPosts } from "../../redux/actions";
import Navlinks from "../../components/cards/Navlinks";

function Frndsfeed({ posts, fetchFriendsPosts }) {
  const { user } = useContext(Context);

  useEffect(() => {
    document.title = "Mern | Post";
  }, []);

  useEffect(() => {
    fetchFriendsPosts(user._id);
  }, [fetchFriendsPosts, user._id]);

  const RenderFrndsPosts = () => {
    if (posts.length === 0) {
      return (
        <div style={{ display: "flex", flexDirection: "column", flex: "6" }}>
          <Navlinks />
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} />
          ))}
        </div>
      );
    } else {
      return <Cards posts={posts} />;
      //  posts.includes("Nofrnds") ? (
      //   <div
      //     style={{
      //       display: "flex",
      //       flex: "6",
      //       justifyContent: "center",
      //       alignItems: "center",
      //     }}
      //   >
      //     <Link to="/" className="NofrndsLink">
      //       No Friends
      //     </Link>
      //   </div>
      // ) : (
      // );
    }
  };

  return (
    <div className="FrndsfeedFlex">
      <Sidebar />
      {RenderFrndsPosts()}
      <Rightbox />
    </div>
  );
}

const mapStateToProps = (state) => {
  return { posts: state.friendsPosts };
};

export default connect(mapStateToProps, { fetchFriendsPosts })(Frndsfeed);
