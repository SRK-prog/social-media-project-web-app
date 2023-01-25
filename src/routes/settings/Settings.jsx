import { useState, useEffect } from "react";
import { Button, TextField } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import { DEFAULT_AVATAR } from "../../constants/constants";
import { baseUrl } from "../../api/baseUrls";
import { actionTypes } from "../../constants/constants";

document.title = "Settings";

const initialValue = {
  profilepicture: "",
  username: "",
  email: "",
  description: "",
  city: "",
};

const { UPDATE_USER } = actionTypes;

export default function Settings() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [settingsState, setSettingsState] = useState(initialValue);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setSettingsState((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    (async () => {
      const select =
        "username email profilepicture description city createdAt lastSeen";
      try {
        const { data } = await baseUrl.get(`/users`, {
          params: { userId: user.userId, select },
        });
        if (data?.response) setSettingsState(data?.response);
      } catch (error) {}
    })();
  }, [user.userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = { userId: user.userId, ...settingsState };
    try {
      const { data } = await baseUrl.put("/users", updatedUser, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      });
      if (data?.response)
        dispatch({ type: UPDATE_USER, payload: data.response });
    } catch (err) {}
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
      setSettingsState((p) => ({ ...p, profilepicture: data?.secure_url }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex max-w-360 mx-auto">
      <Sidebar />
      <div className="relative flex-[7] md:px-10 px-4 mt-6">
        <div className="rounded py-5 px-4 border border-[#8b8a8a]">
          <div className="mb-6">
            <h2 className="font-bold text-xl">User</h2>
          </div>
          <Field
            label="Name"
            name="username"
            placeholder={settingsState.username}
            onChange={onChangeHandler}
          />
          <Field
            label="email"
            name="email"
            placeholder={settingsState.email}
            onChange={onChangeHandler}
          />
          <div className="mt-6 flex items-center gap-4">
            <img
              className="w-12 h-12 rounded-full object-cover"
              src={settingsState.profilepicture || DEFAULT_AVATAR}
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
        <div className="rounded py-5 px-4 border border-[#8b8a8a] mt-6">
          <div className="mb-6">
            <h2 className="font-bold text-xl">About</h2>
          </div>
          <Field
            label="Bio"
            name="description"
            placeholder={settingsState.description}
            onChange={onChangeHandler}
          />
          <Field
            label="City"
            name="city"
            placeholder={settingsState.city}
            onChange={onChangeHandler}
          />
          <div className="flex justify-end mt-6">
            <Button
              onClick={handleSubmit}
              variant="contained"
              style={{
                backgroundColor: "rgb(0, 190, 255)",
                color: "white",
              }}
            >
              Update
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const Field = (props) => {
  return (
    <div className="mt-6">
      <TextField type="text" fullWidth focused variant="outlined" {...props} />
    </div>
  );
};
