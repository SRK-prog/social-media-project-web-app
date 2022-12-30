import "./Nonuser.css";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import { connect } from "react-redux";
import { useEffect } from "react";
import moment from "moment";
import { DEFAULT_AVATAR } from "../../constants/constants";
import { fetchUser } from "../../redux/actions";

const Nonusercard = ({ post, fetchUser, userInfo }) => {
  useEffect(() => {
    fetchUser(post.userId);
  }, [fetchUser, post.userId]);

  return (
    <div className="Nonmain-container">
      <div className="Nonprofile-container">
        <span className="Nonimg-name-box">
          <div>
            <img
              className="Nonprofile-img"
              src={userInfo?.profilepicture ? userInfo?.profilepicture : DEFAULT_AVATAR}
              alt=""
            />
          </div>
          <div className="NonNameDate">
            <div className="NonpostUserdate">{post.username}</div>
            <div className="NonpostDate">{moment(post.createdAt).fromNow()}</div>
          </div>
        </span>
      </div>
      <div>
        {post.photo && <img className="Nonmain-pic" src={post.photo} alt="" />}
      </div>
      <div>
        <span>
          <div className="NonPostTitle">{post.title}</div>
          <div className="NonPostDesc">{post.desc}</div>
        </span>
      </div>
      <div className="resIcons">
        <div className="FlexLike">
          <span className="LikeShare">
            <FavoriteBorderOutlinedIcon />
            <span>{post.likes.length}</span>
          </span>
          <span className="LikeShare">
            <ModeCommentOutlinedIcon />
            <span style={{ marginLeft: "3px" }}>{post.comments.length}</span>
          </span>
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

export default connect(mapStateToProps, { fetchUser })(Nonusercard);
