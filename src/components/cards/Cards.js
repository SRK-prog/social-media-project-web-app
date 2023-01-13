import React from "react";
import CardItem from "../../components/cards/CardItem";
import Navlinks from "./Navlinks";

function Cards({ posts, NoLink }) {
  return (
    <div className="mt-1 flex-[6.5] md:px-0 px-2">
      {!NoLink && <Navlinks />}
      {posts.map((p, index) =>
        p === null ? "" : <CardItem post={p} key={index} />
      )}
    </div>
  );
}

export default Cards;
