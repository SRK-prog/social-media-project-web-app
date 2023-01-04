import "./Cards.css";
import { Link, useHistory } from "react-router-dom";
import moment from "moment";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import { Context } from "../../context/Context";
import { useContext, useState, useEffect } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import BASE_URL from "../../api/URL";
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
    <div className="main-container">
      <div className="profile-container">
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
            <div className="postDate">{moment(post.createdAt).fromNow()}</div>
          </div>
        </Link>
      </div>
      <div onClick={handleOnPostClick}>
        <div>
          {post.photo && <img className="main-pic" src={post.photo} alt="" />}
        </div>
        <div>
          <div className="PostTitle">{post?.title}</div>
          <div className="PostDesc">{post?.description}</div>
        </div>
      </div>
      <div className="resIcons">
        <div className="FlexLike">
          <button onClick={likeHandler} className="LikeShare">
            {isLiked ? (
              <FavoriteIcon style={{ color: "red" }} />
            ) : (
              <FavoriteBorderOutlinedIcon />
            )}
            <span>{like}</span>
          </button>
          <Link
            to={`/postdetails/${post._id}`}
            style={{ textDecoration: "none", color: "black" }}
            className="LikeShare"
          >
            <ModeCommentOutlinedIcon />
          </Link>
        </div>
        <div className="shareIcon">
          <ShareOutlinedIcon />
        </div>
      </div>
    </div>
  );
};

export default CardItem;
