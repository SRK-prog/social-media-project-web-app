import { useContext, useState } from "react";
import "./Settings.css";
import { Button, TextField } from "@material-ui/core";
import Sidebar from "../../components/sidebar/Sidebar";
import { Context } from "../../context/Context";
import axios from "axios";
import { DEFAULT_AVATAR } from "../../constants/constants";
import BASE_URL from "../../api/baseUrl";

document.title = "Settings";

export default function Settings() {
  const { user, dispatch } = useContext(Context);
  const [desc, setDesc] = useState(user.desc);
  const [username, setUsername] = useState(user.username);
  const [city, setCity] = useState(user.city);
  const [email, setEmail] = useState(user.email);
  const [propic, setPropicurl] = useState(user?.profilepicture);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      profilepicture: propic,
      username,
      email,
      desc,
      description: desc,
      city,
    };
    try {
      const { data } = await BASE_URL.put("/users/" + user._id, updatedUser);

      dispatch({ type: "LOGIN_SUCCESS", payload: data });
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  const onImageChange = async (e) => {
    const files = e.target.files[0];
    const form = new FormData();
    form.append("file", files);
    form.append("upload_preset", "socialmedia-website");
    form.append("cloud_name", "srksiva");
    try {
      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/srksiva/image/upload",
        form
      );
      setPropicurl(data.secure_url);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex max-w-360 mx-auto">
      <Sidebar />
      <form className="SettingsContainer">
        <div className="SetWrapper">
          <div>
            <h2 className="SetUser">User</h2>
          </div>
          <div className="ForInputGap">
            <TextField
              type="text"
              label="Name"
              focused
              placeholder={user.username}
              fullWidth
              variant="outlined"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="ForInputGap">
            <TextField
              type="email"
              label="email"
              placeholder={user.email}
              focused
              fullWidth
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="ForInputGap InputStraight">
            <img
              className="ProInput_Img"
              src={propic ? propic : user.profilepicture || DEFAULT_AVATAR}
              alt=""
            />
            <input
              className="ProPhotoInput"
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={onImageChange}
            />
          </div>
        </div>
        <div className="SetWrapper">
          <div>
            <h2 className="SetUser">About</h2>
          </div>
          <div className="ForInputGap">
            <TextField
              type="text"
              label="Bio"
              placeholder={user.desc}
              focused
              fullWidth
              // value={desc}
              variant="outlined"
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className="ForInputGap">
            <TextField
              type="text"
              label="City"
              placeholder={user.city}
              fullWidth
              focused
              variant="outlined"
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              onClick={handleSubmit}
              variant="contained"
              style={{
                backgroundColor: "rgb(47, 224, 255)",
                color: "white",
              }}
            >
              Update
            </Button>
          </div>
        </div>
      </form>
      <div className="SettingsRightFlex"></div>
    </div>
  );
}
