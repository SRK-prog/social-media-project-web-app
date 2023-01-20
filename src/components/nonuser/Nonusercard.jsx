import moment from "moment";
import {
  FavoriteBorderOutlined,
  ModeCommentOutlined,
  ShareOutlined,
} from "@material-ui/icons";
import { DEFAULT_AVATAR } from "../../constants/constants";

const Nonusercard = ({ post }) => {
  return (
    <div className="mt-2 rounded-lg bg-white border border-gray-100 py-2.5">
      <div className="px-3">
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
            <div className="text-darkGray-10 text-xs">
              {moment(post.createdAt).fromNow()}
            </div>
          </div>
        </span>
      </div>
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
      <div className="flex items-center justify-between md:px-6 px-4">
        <div className="flex items-center gap-2">
          <span className="">
            <FavoriteBorderOutlined />
            <span>{post?.likes?.length}</span>
          </span>
          <span className="">
            <ModeCommentOutlined />
          </span>
        </div>
        <div className="">
          <ShareOutlined />
        </div>
      </div>
    </div>
  );
};

export default Nonusercard;
