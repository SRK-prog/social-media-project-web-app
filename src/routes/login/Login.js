import { Button, TextField } from "@material-ui/core";
import "./Login.css";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";
import { Close } from "@material-ui/icons";
import { useContext, useState, useEffect } from "react";
import BASE_URL from "../../api/baseUrl";

export default function Login() {
  const [emails, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState([
    {
      error: false,
      message: "",
    },
  ]);
  useEffect(() => {
    document.title = "Mern - Login";
  }, []);

  const { dispatch, isFetching } = useContext(Context);
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emails.toLowerCase();
    dispatch({ type: "LOGIN_START" });
    BASE_URL.post("/auth/login", {
      email,
      password,
    })
      .then(({ data }) => {
        dispatch({ type: "LOGIN_SUCCESS", payload: data });
        data && window.location.replace("/");
      })
      .catch((error) => {
        setError({ error: true, message: "Something went wrong!" });
        dispatch({ type: "LOGIN_FAILURE" });
      });
  };

  return (
    <>
      <div style={{ height: "45px" }}></div>
      <div className="LoginWrap">
        <form className="logsingle-post" onSubmit={handleSubmit}>
          <div className="post-title">
            <h2 className="top-title">Login</h2>
            <Link className="top-link" to="/">
              <Close />
            </Link>
          </div>

          <div className="text-box">
            <TextField
              type="email"
              id="label"
              label="Email"
              fullWidth
              required
              variant="outlined"
              onChange={(e) => setusername(e.target.value)}
            />
          </div>
          <div className="text-box">
            <TextField
              type="password"
              id="textarea"
              fullWidth
              required
              label="Password"
              variant="outlined"
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <div className="logpost-btns">
            <Button
              variant="contained"
              fullWidth
              style={{ color: "white", backgroundColor: "#3a8fde" }}
              type="submit"
              disabled={isFetching}
            >
              Login
            </Button>
          </div>
          {error && <div className="error-msg">{error.message}</div>}
          <div className="text-box">
            Don't have account<Link to="/signup"> Sign Up</Link>
          </div>
        </form>
      </div>
    </>
  );
}
