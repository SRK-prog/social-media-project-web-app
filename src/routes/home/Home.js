import React, { useEffect } from "react";
import { connect } from "react-redux";
import Cards from "../../components/cards/Cards";
import "./home.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbox from "../../components/rightbox/Rightbox";
import Nonuser from "../../components/nonuser/Nonuser";
import { Context } from "../../context/Context";
import { useContext } from "react";
import Skeleton from "../../components/Skeleton/Skeleton";
import { fetchPosts } from "../../redux/actions";

document.title = "Social Media";

function Home({ posts, fetchPosts }) {
  const { user } = useContext(Context);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="homeFlex max-w-360 mx-auto">
      <Sidebar />
      {posts.length === 0 ? (
        <>
          <div className="flex flex-col flex-[6.5] md:px-0 px-2" >
            {[1, 2, 3, 4, 5].map((k) => (
              <Skeleton key={k} />
            ))}
          </div>
        </>
      ) : (
        <>{user ? <Cards posts={posts} /> : <Nonuser posts={posts} />}</>
      )}
      <Rightbox />
    </div>
  );
}
const mapStateToProps = (state) => {
  return { posts: state.posts };
};

export default connect(mapStateToProps, { fetchPosts })(Home);
