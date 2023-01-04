import "./sidebar.css";
import { Link } from "react-router-dom";
import {
  Home,
  ContactSupport,
  GitHub,
  Twitter,
  Person,
  Info,
  LinkedIn,
  Instagram,
  Chat,
  HelpOutline,
  AddBox,
} from "@material-ui/icons";

const menuItems = [
  { name: "Create Post", to: "/write", Icon: AddBox },
  { name: "Home", to: "/", Icon: Home },
  { name: "Chats", to: "/chat", Icon: Chat },
  { name: "Questions", to: "/contact", Icon: HelpOutline },
  { name: "Sign In/Up", to: "/login", Icon: Person },
  { name: "About", to: "/about", Icon: Info },
  { name: "Contact", to: "/contact", Icon: ContactSupport },
];

const linkItems = [
  {
    to: "https://twitter.com/SRK_R_?t=58WfgjgrqabaZrXWBHTZkg&s=08",
    Icon: Twitter,
  },
  {
    to: "https://github.com/SRK-prog/",
    Icon: GitHub,
  },
  {
    to: "https://www.linkedin.com/in/sivaramakrishnan-r262/",
    Icon: LinkedIn,
  },
  {
    to: "https://www.instagram.com/siva.r12/",
    Icon: Instagram,
  },
];

export default function Sidebar() {
  return (
    <div className="sidebar md:block hidden">
      <div className="sidebarWrapper">
        <ul className="flex flex-col gap-2 font-medium text-gray-80">
          {menuItems.map(({ name, Icon, to }, idx) => (
            <Link
              key={idx}
              to={to}
              className="flex items-center duration-200 px-3 py-2.5 rounded gap-4 hover:bg-lightBlue-10 hover:text-blue-20"
            >
              <Icon />
              <span className="sidebarListItemText">{name}</span>
            </Link>
          ))}
        </ul>
        <div className="IconList">
          {linkItems.map(({ Icon, to }, idx) => (
            <a target="_blank" rel="noreferrer" key={idx} href={to}>
              <Icon className="IconsList" />
            </a>
          ))}
        </div>
        <hr className="sidebarHr" />
      </div>
    </div>
  );
}
