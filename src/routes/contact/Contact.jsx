import { TextField, Button } from "@material-ui/core";
import { useState, useEffect } from "react";
import { Close } from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./contact.css";
import BASE_URL from "../../api/URL";

export default function Contact() {
  const [sendername, setSendername] = useState("");
  const [senderemail, setSenderemail] = useState("");
  const [message, setmessage] = useState("");

  useEffect(() => {
    document.title = "Contact";
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newmail = {
      sendername,
      senderemail,
      message,
    };
    try {
      const res = await BASE_URL.post("/mail", newmail);
      window.location.replace("/");
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div style={{ height: "45px" }}></div>
      <div className="AlignContact">
        <form className="Contactsingle-post" onSubmit={handleSubmit}>
          <div className="Contactpost-title">
            <span className="ContactUs">Contact Us</span>
            <Link to="/" className="contacttop-link">
              <Close />
            </Link>
          </div>
          <div className="Contacttext-box">
            <TextField
              type="name"
              label="Name"
              fullWidth
              variant="outlined"
              onChange={(e) => setSendername(e.target.value)}
            />
          </div>
          <div className="Contacttext-box">
            <TextField
              type="email"
              fullWidth
              label="Email"
              variant="outlined"
              onChange={(e) => setSenderemail(e.target.value)}
            />
          </div>
          <div className="Contacttext-box">
            <TextField
              type="text"
              fullWidth
              label="Message"
              variant="outlined"
              rows={4}
              multiline
              onChange={(e) => setmessage(e.target.value)}
            />
          </div>
          <div className="Contactpost-btns">
            <Button
              variant="contained"
              fullWidth
              style={{ color: "white", backgroundColor: "#3a8fde" }}
              type="submit"
            >
              SEND
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
