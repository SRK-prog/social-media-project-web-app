import { useContext, useState } from "react";
import "./write.css";
import axios from "axios";
import { TextField } from "@material-ui/core";
import { Context } from "../../context/Context";
import ImageIcon from "@material-ui/icons/Image";
import DoneIcon from "@material-ui/icons/Done";
import CachedIcon from "@material-ui/icons/Cached";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import BASE_URL from "../../api/URL";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const { user } = useContext(Context);
  const [imageurl, setImageurl] = useState("");
  const [loading, setLoading] = useState([
    {
      success: false,
      load: false,
      fail: false,
    },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      username: user.username,
      photo: imageurl,
      title,
      desc,
    };
    try {
      await BASE_URL.post("/posts", newPost);
      window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="WriteFlex">
        <Sidebar />
        <div className="ForWrite">
          <form className="single-post" onSubmit={handleSubmit}>
            <img className="writepost-img" src={imageurl} alt="" />
            <div className="InputBoxWrapper">
              <>
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="INPUTFILE"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={async (e) => {
                    setLoading({
                      load: true,
                    });
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
                      setLoading({
                        success: true,
                      });
                    } catch (err) {
                      console.log(err);
                      setLoading({
                        fail: false,
                      });
                    }
                  }}
                />
              </>
              <label htmlFor="INPUTFILE" className="InputWriteImger">
                <ImageIcon />
                Upload Image
                {loading.success && (
                  <span className="SuccessMsg">
                    <DoneIcon />
                  </span>
                )}
                {loading.load && (
                  <span className="LoadingMsg">
                    <CachedIcon />
                  </span>
                )}
                {loading.fail && <span className="FailedMsg">Failed!</span>}
              </label>
            </div>
            <div className="writetext-box">
              <TextField
                type="text"
                id="label"
                label="Post Title"
                fullWidth
                variant="outlined"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="writetext-box">
              <TextField
                type="text"
                id="desc"
                fullWidth
                label="Write your post content..."
                multiline
                rows={4}
                variant="outlined"
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div className="Writepost-btns">
              <Link to="/" className="linkback">
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
    </>
  );
}
