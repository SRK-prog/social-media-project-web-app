import React from "react";
import CardItem from "./CardItem";
import Navlinks from "./Navlinks";
import { useSelector } from "react-redux";

function Cards({ posts, NoLink }) {
  const user = useSelector((state) => state.user);
  return (
    <div className="mt-1 flex-[6.5] md:px-0 mb-7 px-2">
      {!NoLink && <Navlinks />}
      {posts.map((p, index) =>
        p === null ? "" : <CardItem user={user} post={p} key={index} />
      )}
    </div>
  );
}

export default Cards;
