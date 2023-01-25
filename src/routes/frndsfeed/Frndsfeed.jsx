import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Cards from "../../components/cards/Cards";
import Sidebar from "../../components/sidebar/Sidebar";
import Rightbox from "../../components/rightbox/Rightbox";
import Skeleton from "../../components/Skeleton/Skeleton";
import Navlinks from "../../components/cards/Navlinks";
import { APP_NAME } from "../../constants/constants";
import { baseUrl } from "../../api/baseUrls";

function Frndsfeed({ user }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = `${APP_NAME} | Feeds`;
    (async () => {
      try {
        setIsLoading(true);
        const {
          data: { response },
        } = await baseUrl.get("/posts/timeline/", {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        });
        setPosts(response);
      } catch (error) {
        console.log("friends post error: ", error);
      } finally {
        setIsLoading(false);
      }
    })();
    // eslint-disable-next-line
  }, [user.userId]);

  const RenderFrndsPosts = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col flex-[6.5] md:px-0 px-2 mt-1.25 min-h-screen">
          <Navlinks />
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} />
          ))}
        </div>
      );
    } else if (!posts.length)
      return (
        <div className="h-screen-cal-55 grid place-content-center w-full text-2xl font-semibold text-center">
          No posts found!
          <Link
            to="/"
            className="text-[#3a8fde] text-lg block underline underline-offset-2"
          >
            Go Back
          </Link>
        </div>
      );
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
  user: state.user,
});

export default connect(mapStateToProps)(Frndsfeed);
