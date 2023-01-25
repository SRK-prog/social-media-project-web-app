import React from "react";
import { useSelector } from "react-redux";
import CardItem from "./CardItem";
import Navlinks from "./Navlinks";

function Cards({ posts, NoLink }) {
  const user = useSelector((state) => state.user);
  return (
    <div className="mt-1 flex-[6.5] md:px-0 mb-7 px-2 min-h-screen">
      {!NoLink && <Navlinks />}
      {posts.map(
        (p, idx) => !!p && <CardItem key={idx} user={user} post={p} />
      )}
    </div>
  );
}

export default Cards;
