import React, { useEffect } from "react";
import { connect } from "react-redux";
import Cards from "../../components/cards/Cards";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbox from "../../components/rightbox/Rightbox";
import Nonuser from "../../components/nonuser/Nonuser";
import Skeleton from "../../components/Skeleton/Skeleton";
import { fetchPosts } from "../../redux/actions";
import { APP_NAME } from "../../constants/constants";

function Home({ posts, fetchPosts, user }) {
  useEffect(() => {
    document.title = APP_NAME;
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="bg-gray-70 flex max-w-360 mx-auto">
      <Sidebar />
      {!posts.length ? (
        <div className="flex flex-col flex-[6.5] md:px-0 px-2">
          {[...new Array(5).keys()].map((k) => (
            <Skeleton key={k} />
          ))}
        </div>
      ) : user.isLoggedIn ? (
        <Cards posts={posts} />
      ) : (
        <Nonuser posts={posts} />
      )}
      <Rightbox />
    </div>
  );
}
const mapStateToProps = (state) => ({ posts: state.posts, user: state.user });

export default connect(mapStateToProps, { fetchPosts })(Home);
