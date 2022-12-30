import "./Cards.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import { Context } from "../../context/Context";
import { useContext, useState, useEffect } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import BASE_URL from "../../api/URL";
import { fetchUser } from "../../redux/actions";

const CardItem = ({ post, fetchUser, userInfo }) => {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const { user: currentUser } = useContext(Context);

  useEffect(() => {
    fetchUser(post.userId);
  }, [fetchUser, post.userId]);

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

  return (
    <div className="main-container">
      <div className="profile-container">
        <Link to={`/profile/${userInfo?.username}`} className="img-name-box">
          <div>
            <img
              className="profile-img"
              src={
                userInfo?.profilepicture
                  ? userInfo?.profilepicture
                  : "/images/default-avatar.png"
              }
              alt=""
            />
          </div>
          <div className="NameDate">
            <div className="postUserdate">{userInfo?.username}</div>
            <div className="postDate">{moment(post.createdAt).fromNow()}</div>
          </div>
        </Link>
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

const mapStateToProps = (state, ownProps) => {
  return {
    userInfo: state.user.find((user) => user._id === ownProps.post.userId),
  };
};

export default connect(mapStateToProps, { fetchUser })(CardItem);
