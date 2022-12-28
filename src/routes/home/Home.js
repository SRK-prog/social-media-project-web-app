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

function Home({ posts, fetchPosts }) {
  const { user } = useContext(Context);

  useEffect(() => {
    document.title = "Mern";
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <div className="homeFlex">
      <Sidebar />
      {posts.length === 0 ? (
        <>
          <div style={{ display: "flex", flexDirection: "column", flex: "6" }}>
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

// {
//  <>
// <div className="homeFlex">
//   <Sidebar />
//   {props.posts ? (
//     <>
//       <div
//         style={{ display: "flex", flexDirection: "column", flex: "6" }}
//       >
//         {[1, 2, 3, 4, 5].map(() => (
//           <Skeleton />
//         ))}
//       </div>
//     </>
//   ) : (
//     <>
//       {user ? <Cards posts={props.posts} /> : <Nonuser posts={posts} />}
//     </>
//   )}
//   <Rightbox />
// </div>
// </>
// }
