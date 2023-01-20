import { TextField, Button } from "@material-ui/core";
import { useState } from "react";
import { Close } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import BASE_URL from "../../api/baseUrl";

document.title = "Contact";

const initialValue = { sendername: "", senderemail: "", message: "" };

export default function Contact() {
  const [values, setValues] = useState(initialValue);

  const history = useHistory();

  const onChange = ({ target }) => {
    const { name, value } = target;
    setValues((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await BASE_URL.post("/mail", values);
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mt-16">
      <form
        className="rounded-lg mx-auto px-2.5 pt-2.5 pb-7 border border-darkGray-30 max-w-112.5"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between px-2.5 my-2">
          <span className="text-xl text-center font-semibold">Contact Us</span>
          <Link to="/">
            <Close />
          </Link>
        </div>
        <div className="mt-4">
          <TextField
            type="text"
            label="Name"
            name="sendername"
            fullWidth
            variant="outlined"
            onChange={onChange}
          />
        </div>
        <div className="mt-4">
          <TextField
            type="email"
            fullWidth
            name="senderemail"
            label="Email"
            variant="outlined"
            onChange={onChange}
          />
        </div>
        <div className="mt-4">
          <TextField
            type="text"
            fullWidth
            label="Message"
            variant="outlined"
            minRows={4}
            name="message"
            multiline
            onChange={onChange}
          />
        </div>
        <div className="mt-4">
          <Button
            variant="contained"
            fullWidth
            className="h-10"
            style={{ color: "white", backgroundColor: "#3a8fde" }}
            type="submit"
          >
            SEND
          </Button>
        </div>
      </form>
    </div>
  );
}
