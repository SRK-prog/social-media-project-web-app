import "./Nonuser.css";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import ModeCommentOutlinedIcon from "@material-ui/icons/ModeCommentOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import moment from "moment";
import { DEFAULT_AVATAR } from "../../constants/constants";

const Nonusercard = ({ post }) => {
  return (
    <div className="Nonmain-container">
      <div className="Nonprofile-container">
        <span className="flex gap-2.5 pb-2">
          <div>
            <img
              className="h-10 w-10 object-cover rounded-full"
              src={post?.user?.profilepicture || DEFAULT_AVATAR}
              alt=""
            />
          </div>
          <div className="NonNameDate">
            <div className="NonpostUserdate">{post?.user?.username}</div>
            <div className="NonpostDate">
              {moment(post.createdAt).fromNow()}
            </div>
          </div>
        </span>
      </div>
      <div>
        {post.photo && <img className="Nonmain-pic" src={post.photo} alt="" />}
      </div>
      <div>
        <span>
          <div className="NonPostTitle">{post.title}</div>
          <div className="NonPostDesc">{post.description}</div>
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
          </span>
        </div>
        <div className="shareIcon">
          <ShareOutlinedIcon />
        </div>
      </div>
    </div>
  );
};

export default Nonusercard;
