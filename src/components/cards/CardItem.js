import { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import moment from "moment";
import {
  FavoriteBorderOutlined,
  ModeCommentOutlined,
  ShareOutlined,
  Favorite,
} from "@material-ui/icons";
import { Context } from "../../context/Context";
import BASE_URL from "../../api/baseUrl";
import { DEFAULT_AVATAR } from "../../constants/constants";
import useSingleAndDoubleClick from "../../hooks/useSingleAndDoubleClick";

const CardItem = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const { user: currentUser } = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  const likeHandler = () => {
    try {
      BASE_URL.put("/posts/" + post._id + "/like", {
        userId: currentUser._id,
      });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const handleOnPostClick = useSingleAndDoubleClick(
    () => history.push(`/postdetails/${post._id}`),
    likeHandler
  );

  return (
    <div className="mt-2 rounded-lg bg-white border border-gray-100 py-2.5">
      <div className="px-3">
        <Link
          to={`/profile/${post?.user?.username}`}
          className="flex gap-2.5 pb-2"
        >
          <div>
            <img
              className="h-10 w-10 object-cover rounded-full"
              src={post?.user?.profilepicture || DEFAULT_AVATAR}
              alt=""
            />
          </div>
          <div className="NameDate">
            <div className="postUserdate">{post?.user?.username}</div>
            <div className="text-darkGray-10 text-xs">
              {moment(post.createdAt).fromNow()}
            </div>
          </div>
        </Link>
      </div>
      <div onClick={handleOnPostClick}>
        <div>
          {post.photo && (
            <img
              className="md:max-h-92.5 max-h-77.5 w-full"
              src={post.photo}
              alt=""
            />
          )}
        </div>
        <div className="md:px-6 px-4">
          <div className="mt-2 md:text-3xl text-xl font-medium">
            {post?.title}
          </div>
          <div className="text-black mt-2 mb-2 trucate-word">
            {post?.description}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between md:px-6 px-4">
        <div className="flex items-center gap-2">
          <button
            onClick={likeHandler}
            className="flex cursor-pointer items-center"
          >
            {isLiked ? (
              <Favorite style={{ color: "red" }} />
            ) : (
              <FavoriteBorderOutlined />
            )}
            <span>{like}</span>
          </button>
          <Link to={`/postdetails/${post._id}`}>
            <ModeCommentOutlined />
          </Link>
        </div>
        <div className="">
          <ShareOutlined />
        </div>
      </div>
    </div>
  );
};

export default CardItem;
