import "./sidebar.css";
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

export default function Sidebar() {
  return (
    <>
      <div className="sidebar">
        <div className="sidebarWrapper">
          <ul className="sidebarList">
            <Link to="/" className="sidebarListItem">
              <HomeIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Home</span>
            </Link>
            <Link to="/chat" className="sidebarListItem">
              <Chat className="sidebarIcon" />
              <span to="Sign In/Up" className="sidebarListItemText">
                Chats
              </span>
            </Link>
            <Link to="/" className="sidebarListItem">
              <PlayCircleFilledOutlined className="sidebarIcon" />
              <span className="sidebarListItemText">Videos</span>
            </Link>
            <Link to="/contact" className="sidebarListItem">
              <HelpOutline className="sidebarIcon" />
              <span className="sidebarListItemText">Questions</span>
            </Link>
            <Link to="/login" className="sidebarListItem">
              <PersonIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Sign In/Up</span>
            </Link>
            <Link to="/about" className="sidebarListItem">
              <InfoIcon className="sidebarIcon" />
              <span className="sidebarListItemText">about</span>
            </Link>
            <Link to="/contact" className="sidebarListItem">
              <ContactSupportIcon className="sidebarIcon" />
              <span className="sidebarListItemText">Contact</span>
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
          <hr className="sidebarHr" />
        </div>
      </div>
    </>
  );
}
