import React from "react";
import { NavLink } from "react-router-dom";
import "./Cards.css";

export default function Navlinks() {
  return (
    <div className="CardsNavLink">
      <NavLink
        className="CardsNavLinks"
        exact
        to="/"
        activeClassName="ActiveLink"
      >
        Feed
      </NavLink>
      <NavLink
        className="CardsNavLinks"
        to="/feeds"
        activeClassName="ActiveLinkFeed"
      >
        Post
      </NavLink>
    </div>
  );
}
