import { useContext, useEffect, useState } from "react";
import "./SinglePost.css";
import { Link } from "react-router-dom";
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
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import { Context } from "../../context/Context";
import Comments from "../../components/comments/Comments";
import BASE_URL from "../../api/URL";
import { DEFAULT_AVATAR } from "../../constants/constants";

export default function SinglePost() {
  const [post, setPost] = useState({});
  const [like, setLike] = useState();
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [isLiked, setIsLiked] = useState(false);
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [comments, setComments] = useState([]);

  // Comments Toggle Button
  const [commentsbtn, setCommentsbtn] = useState(true);
  const [newcomment, setNewcomment] = useState();
  const history = useHistory();

  const CommentsToggle = () => {
    setCommentsbtn(!commentsbtn);
  };
  const likeHandler = () => {
    setLike((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
    setIsLiked((p) => !p);
    try {
      BASE_URL.put("/posts/" + post?._id + "/like", { userId: user?._id });
    } catch (err) {}
  };

  const fetchComments = async () => {
    try {
      const { data } = await BASE_URL.get("/comments", {
        params: { postId: path },
      });
      setComments(data);
    } catch (error) {
      console.error("comments err: ", error);
    }
  };

  useEffect(() => {
    const getPost = async () => {
      const { data } = await BASE_URL.get("/posts/" + path);
      setPost(data);
      setTitle(data.title);
      setDesc(data.description);
      setLike(data.likes.length);
      setIsLiked(data.likes.includes(user._id));
    };
    getPost();
    fetchComments();
    // eslint-disable-next-line
  }, [path, user._id]);

  const handleDelete = async () => {
    try {
      await BASE_URL.delete(`/posts/${post?._id}`, {
        data: { username: user.username },
      });
      history.push("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await BASE_URL.put(`/posts/${post?._id}`, {
        username: user.username,
        description: desc,
        title,
      });
      setUpdateMode(false);
    } catch (err) {}
  };

  const handlecommentSubmit = async (e) => {
    e.preventDefault();
    const postComment = {
      postId: path,
      userId: user._id,
      comment: newcomment,
    };
    setComments((prev) => [
      ...prev,
      {
        ...postComment,
        user: {
          username: user?.username,
          profilepicture: user?.profilepicture,
        },
      },
    ]);
    setNewcomment("");
    try {
      BASE_URL.post("/comments", postComment);
    } catch (err) {}
  };

  return (
    <div className="page-container">
      <Sidebar />
      <div className="flex-[6]">
        <div className="smain-container">
          <div className="sprofile-container">
            <Link to={`/profile/${post.username}`} className="simg-name-box">
              <div>
                <img
                  className="sprofile-img"
                  src={post.profilepicture || DEFAULT_AVATAR}
                  alt=""
                />
              </div>
              <div className="sNameDate">
                <div className="spostUserdate">{post.username}</div>
                <div className="spostDate">
                  {moment(post.createdAt).fromNow()}
                </div>
              </div>
            </Link>
            {post?.userId === user?._id && (
              <span className="EditPosition">
                <MoreVert
                  className="Editbtn"
                  onClick={() => setUpdateMode(!updateMode)}
                />
              </span>
            )}
          </div>
          <div>
            {post.photo && (
              <img className="smain-pic" src={post.photo} alt="" />
            )}
          </div>
          <span className="sAlink">
            {updateMode ? (
              <>
                <div className="singlePostTitleInput">
                  <TextField
                    type="text"
                    label="Title of post"
                    variant="outlined"
                    fullWidth
                    value={title}
                    className="singlePostTitle"
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <TextField
                    label="Description"
                    value={desc}
                    variant="outlined"
                    fullWidth
                    multiline
                    minRows={4}
                    className="singlePostTitle"
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </div>
                <div className="flex justify-end gap-4 px-5 mb-5">
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "rgb(47, 224, 255)",
                      color: "white",
                    }}
                    onClick={handleDelete}
                  >
                    delete
                  </Button>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "rgb(47, 224, 255)",
                      color: "white",
                    }}
                    onClick={handleUpdate}
                  >
                    Update
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="sPostTitle">{title}</div>
                <div className="sPostDesc">{desc}</div>
              </>
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
                  onClick={CommentsToggle}
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
            className={`CommentsSpacing px-8 ${commentsbtn ? "activecom" : ""}`}
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
