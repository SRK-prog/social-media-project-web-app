import "../../../components/cards/Cards.css";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import { Context } from "../../../context/Context";
import { useContext, useState, useEffect } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { DEFAULT_AVATAR } from "../../constants/constants";
import BASE_URL from "../../../api/URL";

const CardItem = ({ post }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const { user: currentUser } = useContext(Context);
  const [userprof, setUserProf] = useState({});

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

  useEffect(() => {
    const fetchUser = async () => {
      const res = await BASE_URL.get(`/users?userId=${post.userId}`);
      setUserProf(res.data.profilepicture);
    };
    fetchUser();
  }, [post.userId]);

  return (
    <div className="main-container">
      <div className="profile-container">
        <span className="img-name-box">
          <div>
            <img
              className="profile-img"
              src={userprof ? userprof : DEFAULT_AVATAR}
              alt=""
            />
          </div>
          <div className="NameDate">
            <div className="postUserdate">{post.username}</div>
            <div className="postDate">{format(post.createdAt)}</div>
          </div>
        </span>
      </div>
      <div>
        {post.photo && <img className="main-pic" src={post.photo} alt="" />}
      </div>
      <div>
        <Link className="Alink" to={`/postdetails/${post._id}`}>
          <div className="PostTitle">{post.title}</div>
          <div className="PostDesc">{post.desc}</div>
        </Link>
      </div>
      <div className="resIcons">
        <div className="FlexLike">
          <span className="LikeShare">
            {isLiked ? (
              <FavoriteIcon onClick={likeHandler} style={{ color: "red" }} />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={likeHandler} />
            )}
            <span>{like}</span>
          </span>
          <Link
            to={`/postdetails/${post._id}`}
            style={{ textDecoration: "none", color: "black" }}
            className="LikeShare"
          >
            <ModeCommentOutlinedIcon />
            <span style={{ marginLeft: "3px" }}>{post.comments.length}</span>
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
