import { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import {
  FavoriteBorderOutlined,
  Favorite,
  ModeCommentOutlined,
  ShareOutlined,
  MoreVert,
  Send,
} from "@material-ui/icons";
import moment from "moment";
import { useSelector } from "react-redux";
import Sidebar from "../../components/sidebar/Sidebar";
import Comments from "../../components/comments/Comments";
import { baseUrl } from "../../api/baseUrls";
import { DEFAULT_AVATAR } from "../../constants/constants";

export default function SinglePost() {
  const user = useSelector((state) => state.user);

  const [post, setPost] = useState({});
  const [like, setLike] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComment] = useState(true);
  const [newcomment, setNewcomment] = useState("");

  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const history = useHistory();

  const likeHandler = () => {
    setLike((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
    setIsLiked((p) => !p);
    try {
      baseUrl.put(
        "/posts/like",
        { postId: post?._id },
        { headers: { Authorization: `Bearer ${user.accessToken}` } }
      );
    } catch (err) {}
  };

  const fetchComments = async () => {
    try {
      const { data } = await baseUrl.get("/comments", {
        params: { postId: path },
      });
      setComments(data);
    } catch (error) {
      console.error("comments err: ", error);
    }
  };

  useEffect(() => {
    const getPost = async () => {
      const {
        data: { response },
      } = await baseUrl.get("/posts", {
        params: { postId: path },
      });
      setPost(response);
      setTitle(response.title);
      setDescription(response.description);
      setLike(response.likes.length);
      setIsLiked(response.likes.includes(user.userId));
    };
    getPost();
    fetchComments();
    // eslint-disable-next-line
  }, [path, user.userId]);

  const handleDelete = async () => {
    try {
      await baseUrl.delete(`/posts`, {
        data: { postId: post?._id },
        headers: { Authorization: `Bearer ${user.accessToken}` },
      });
      history.push("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await baseUrl.put(
        `/posts`,
        { postId: post?._id, title, description },
        { headers: { Authorization: `Bearer ${user.accessToken}` } }
      );
      setUpdateMode(false);
    } catch (err) {}
  };

  const handlecommentSubmit = async (e) => {
    e.preventDefault();
    const postComment = {
      postId: post?._id,
      userId: user._id,
      comment: newcomment,
    };
    setComments((prev) => [
      ...prev,
      {
        ...postComment,
        user: { username: user.username, profilepicture: user.profilepicture },
      },
    ]);
    setNewcomment("");
    try {
      baseUrl.post("/comments", postComment, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      });
    } catch (err) {}
  };

  return (
    <div className="page-container">
      <Sidebar />
      <div className="flex-[6] mb-10">
        <div className="mt-2 rounded-lg bg-white border border-gray-100 py-2.5">
          <div className="flex justify-between px-2.5 items-center">
            <Link
              to={`/profile/${post?.user?._id}`}
              className="flex gap-2.5 pb-2"
            >
              <div>
                <img
                  className="h-10 w-10 object-cover rounded-full"
                  src={post?.user?.profilepicture || DEFAULT_AVATAR}
                  alt=""
                />
              </div>
              <div>
                <div>{post?.user?.username}</div>
                <div className="text-darkGray-10 text-xs">
                  {moment(post?.createdAt).fromNow()}
                </div>
              </div>
            </Link>
            {post?.userId === user?.userId && (
              <button onClick={() => setUpdateMode((p) => !p)}>
                <MoreVert />
              </button>
            )}
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
          <span>
            {updateMode ? (
              <>
                <div className="mx-6 my-6">
                  <div className="mt-4">
                    <TextField
                      type="text"
                      label="Title of post"
                      variant="outlined"
                      fullWidth
                      value={title}
                      autoFocus
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="mt-4">
                    <TextField
                      label="Description"
                      value={description}
                      variant="outlined"
                      fullWidth
                      multiline
                      minRows={4}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-4 px-5 mb-5">
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "rgb(0, 190, 255)",
                      color: "white",
                    }}
                    onClick={handleDelete}
                  >
                    delete
                  </Button>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "rgb(0, 190, 255)",
                      color: "white",
                    }}
                    onClick={handleUpdate}
                  >
                    Update
                  </Button>
                </div>
              </>
            ) : (
              <div className="md:px-6 px-4">
                <div className="mt-2 md:text-3xl text-xl font-medium">
                  {title}
                </div>
                <div className="text-black mt-2 mb-2 trucate-word">
                  {description}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between px-5 mb-5">
              <div className="gap-1.5 flex items-center">
                <button
                  onClick={likeHandler}
                  className="gap-1.5 flex items-center"
                >
                  {isLiked ? (
                    <Favorite style={{ color: "red" }} />
                  ) : (
                    <FavoriteBorderOutlined />
                  )}
                  <span>{like}</span>
                </button>
                <button
                  onClick={() => setShowComment((p) => !p)}
                  className="gap-1.5 flex items-center"
                >
                  <ModeCommentOutlined />
                  <span className="font-semibold">{comments.length}</span>
                </button>
              </div>
              <div className="">
                <ShareOutlined />
              </div>
            </div>
          </span>

          <div
            className={`px-8 border-t border-gray-100 my-5 ${
              !showComments && "hidden"
            }`}
          >
            <h2 className="my-8 text-2xl font-bold">Comments</h2>
            <form
              onSubmit={handlecommentSubmit}
              className="flex gap-3 items-center"
            >
              <input
                type="text"
                placeholder="Type a comment..."
                className="rounded-full outline-gray-40 outline h-10 outline-2 px-4 py-2 flex-grow"
                value={newcomment}
                onChange={(e) => setNewcomment(e.target.value)}
              />
              <button
                className="bg-blue-10 rounded-full w-12 h-12 grid place-content-center"
                onClick={handlecommentSubmit}
                type="submit"
              >
                <Send className="text-white" />
              </button>
            </form>
            <div className="CommentsContains">
              {comments.map((comment) => (
                <Comments key={comment?._id} comment={comment} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="md:flex-[3]"></div>
    </div>
  );
}
