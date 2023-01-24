import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { TextField } from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
import DoneIcon from "@material-ui/icons/Done";
import Sidebar from "../../components/sidebar/Sidebar";
import BASE_URL from "../../api/baseUrl";
import { useSelector } from "react-redux";

export default function Write() {
  const user = useSelector((state) => state.user);

  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [imageurl, setImageurl] = useState("");
  const [loading, setLoading] = useState({
    success: false,
    load: false,
    fail: false,
  });
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = { photo: imageurl, title, description };
    try {
      await BASE_URL.post("/posts", newPost, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      });
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
    <div className="flex bg-gray-70 max-w-360 mx-auto">
      <Sidebar />
      <div className="bg-white mt-5 rounded flex-[5]">
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
                <span className="ml-2 pt-2 text-[#06af06]">
                  <DoneIcon />
                </span>
              )}
              {loading.load && (
                <span className="w-10">
                  <img src="/images/loader.svg" alt="" />
                </span>
              )}
              {loading.fail && (
                <span className="ml-2 pt-2 text-[#ff0000]">Failed!</span>
              )}
            </label>
          )}
          <div className="mt-5">
            <TextField
              type="text"
              label="Post Title"
              fullWidth
              variant="outlined"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mt-5">
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
          <div className="mt-5 flex justify-end gap-3">
            <Link
              className="w-28 h-10 text-white text-base bg-[#3791f8ea] rounded grid place-content-center"
              to="/"
            >
              Back
            </Link>
            <button
              className="w-28 h-10 text-white text-base bg-[#3791f8ea] rounded grid place-content-center"
              type="submit"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
      <div className="lg:flex-[2]"></div>
    </div>
  );
}
