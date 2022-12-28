import "./error.css";
import { Link } from "react-router-dom";
import ErrorImg from "./pngegg.png";

export default function Error404() {
  return (
    <div className="errorContainer">
      <div className="error">
        <img className="errorimage" src={ErrorImg} alt="error404" />
        <div className="unautherize">Page Not Found</div>
        <div className="errorhome">
          <Link className="errorhomelink" to="/">
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
