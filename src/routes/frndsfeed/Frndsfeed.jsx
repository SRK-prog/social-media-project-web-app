import { useEffect } from "react";
import { connect } from "react-redux";
import Cards from "../../components/cards/Cards";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbox from "../../components/rightbox/Rightbox";
import Skeleton from "../../components/Skeleton/Skeleton";
import { fetchFriendsPosts } from "../../redux/actions";
import Navlinks from "../../components/cards/Navlinks";

function Frndsfeed({ posts, fetchFriendsPosts, user }) {
  useEffect(() => {
    document.title = "Social Media | Post";
    fetchFriendsPosts(user.accessToken);
    // eslint-disable-next-line
  }, [user.userId]);

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

const mapStateToProps = (state) => ({
  posts: state.friendsPosts,
  user: state.user,
});

export default connect(mapStateToProps, { fetchFriendsPosts })(Frndsfeed);
