import React from "react";
import { NavLink } from "react-router-dom";

export default function Navlinks() {
  return (
    <div className="mt-3 mb-2 flex gap-2">
      <NavLink
        className="ml-2 text-black-0 py-1 px2"
        exact
        to="/"
        activeClassName="font-black"
      >
        Posts
      </NavLink>
      <NavLink
        className="ml-2 text-black-0 py-1 px2"
        to="/feeds"
        activeClassName="font-black"
      >
        Feeds
      </NavLink>
    </div>
  );
}
