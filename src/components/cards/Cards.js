import React from "react";
import "./Cards.css";
import CardItem from "../../components/cards/CardItem";
import Navlinks from "./Navlinks";

function Cards({ posts, NoLink }) {
  return (
    <div className="cardss md:px-0 px-2">
      {!NoLink && <Navlinks />}
      {posts.map((p, index) =>
        p === null ? "" : <CardItem post={p} key={index} />
      )}
    </div>
  );
}

export default Cards;
