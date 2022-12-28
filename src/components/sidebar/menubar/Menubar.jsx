import "./Menubar.css";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import PersonIcon from "@material-ui/icons/Person";
import InfoIcon from "@material-ui/icons/Info";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";
import {
  Chat,
  PlayCircleFilledOutlined,
  HelpOutline,
} from "@material-ui/icons";

export default function Menubar({ data }) {
  return (
    <>
      <div className={`Menubar ${data ? "NavActive" : ""}`}>
        <div className="MenubarWrapper">
          <ul className="MenubarList">
            <Link to="/" className="MenubarListItem">
              <HomeIcon className="MenubarIcon" />
              <span className="MenubarListItemText">Home</span>
            </Link>
            <Link to="/chat" className="MenubarListItem">
              <Chat className="MenubarIcon" />
              <span className="MenubarListItemText">Chats</span>
            </Link>
            <Link to="/" className="MenubarListItem">
              <PlayCircleFilledOutlined className="MenubarIcon" />
              <span className="MenubarListItemText">Videos</span>
            </Link>
            <Link to="/contact" className="MenubarListItem">
              <HelpOutline className="MenubarIcon" />
              <span className="MenubarListItemText">Questions</span>
            </Link>
            <Link to="/login" className="MenubarListItem">
              <PersonIcon className="MenubarIcon" />
              <span className="MenubarListItemText">Sign In/Up</span>
            </Link>
            <Link to="/about" className="MenubarListItem">
              <InfoIcon className="MenubarIcon" />
              <span className="MenubarListItemText">about</span>
            </Link>
            <Link to="/contact" className="MenubarListItem">
              <ContactSupportIcon className="MenubarIcon" />
              <span className="MenubarListItemText">Contact</span>
            </Link>
          </ul>
          <div className="IconList">
            <a href="https://twitter.com/SRK_R_?t=58WfgjgrqabaZrXWBHTZkg&s=08">
              <TwitterIcon className="IconsList" />
            </a>
            <a href="https://github.com/SRK-prog/">
              <GitHubIcon className="IconsList" />
            </a>
            <a href="https://www.linkedin.com/in/sivaramakrishnan-r262/">
              <LinkedInIcon className="IconsList" />
            </a>
            <a href="https://www.instagram.com/siva.r12/">
              <InstagramIcon className="IconsList" />
            </a>
          </div>
          <hr className="MenubarHr" />
        </div>
      </div>
    </>
  );
}
