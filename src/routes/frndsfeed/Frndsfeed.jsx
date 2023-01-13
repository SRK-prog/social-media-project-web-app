import { useEffect, useContext } from "react";
import { connect } from "react-redux";
import Cards from "../../components/cards/Cards";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbox from "../../components/rightbox/Rightbox";
import { Context } from "../../context/Context";
import Skeleton from "../../components/Skeleton/Skeleton";
import { fetchFriendsPosts } from "../../redux/actions";
import Navlinks from "../../components/cards/Navlinks";

document.title = "Mern | Post";

function Frndsfeed({ posts, fetchFriendsPosts }) {
  const { user } = useContext(Context);

  useEffect(() => {
    fetchFriendsPosts(user._id);
  }, [fetchFriendsPosts, user._id]);

  const RenderFrndsPosts = () => {
    if (!posts.length) {
      return (
        <div className="flex flex-col flex-[6.5] md:px-0 px-2 mt-1.25">
          <Navlinks />
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} />
          ))}
        </div>
      );
    }
    return <Cards posts={posts} />;
  };

  return (
    <div className="flex bg-gray-70 max-w-360 mx-auto">
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
