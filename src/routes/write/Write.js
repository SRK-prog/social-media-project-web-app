import { useContext, useState } from "react";
import "./write.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { TextField } from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
import DoneIcon from "@material-ui/icons/Done";
import Sidebar from "../../components/sidebar/Sidebar";
import { Context } from "../../context/Context";
import BASE_URL from "../../api/URL";

export default function Write() {
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const { user } = useContext(Context);
  const [imageurl, setImageurl] = useState("");
  const [loading, setLoading] = useState([
    { success: false, load: false, fail: false },
  ]);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      username: user.username,
      photo: imageurl,
      title,
      description,
    };
    try {
      await BASE_URL.post("/posts", newPost);
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const imageOnChange = async (e) => {
    setLoading((prev) => ({ ...prev, load: true }));
    const files = e.target.files[0];
    const data = new FormData();
    data.append("file", files);
    data.append("upload_preset", "socialmedia-website");
    data.append("cloud_name", "srksiva");
    try {
      const imgres = await axios.post(
        "https://api.cloudinary.com/v1_1/srksiva/image/upload",
        data
      );

      setImageurl(imgres.data.secure_url);
      setLoading((prev) => ({ ...prev, success: true }));
    } catch (err) {
      console.log(err);
      setLoading((prev) => ({ ...prev, success: false }));
    }
  };

  return (
    <div className="WriteFlex max-w-360 mx-auto">
      <Sidebar />
      <div className="ForWrite">
        <form className="single-post p-4" onSubmit={handleSubmit}>
          <input
            type="file"
            className="hidden"
            id="INPUTFILE"
            accept="image/png, image/jpeg, image/jpg"
            onChange={imageOnChange}
          />
          {!!imageurl && (
            <label className="cursor-pointer" htmlFor="INPUTFILE">
              <img
                className="md:h-96 h-60 w-full rounded"
                src={imageurl}
                alt=""
              />
            </label>
          )}
          {!imageurl && (
            <label
              htmlFor="INPUTFILE"
              className="flex items-center justify-center border border-dotted rounded border-gray-40 h-32 font-extrabold text-gray-40 gap-2"
            >
              <ImageIcon />
              Upload Image
              {loading.success && (
                <span className="SuccessMsg">
                  <DoneIcon />
                </span>
              )}
              {loading.load && (
                <span className="w-10">
                  <img src="/images/loader.svg" alt="" />
                </span>
              )}
              {loading.fail && <span className="FailedMsg">Failed!</span>}
            </label>
          )}
          <div className="writetext-box">
            <TextField
              type="text"
              label="Post Title"
              fullWidth
              variant="outlined"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="writetext-box">
            <TextField
              type="text"
              fullWidth
              label="Write your post content..."
              multiline
              minRows={4}
              variant="outlined"
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className="Writepost-btns">
            <Link to="/" className="linkback block">
              Back
            </Link>
            <button type="submit" className="Writepost-btn">
              Publish
            </button>
          </div>
        </form>
      </div>
      <div className="WriteRightFlex"></div>
    </div>
  );
}
