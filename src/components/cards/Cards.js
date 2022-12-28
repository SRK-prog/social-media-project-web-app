import React from "react";
import "./Cards.css";
import CardItem from "../../components/cards/CardItem";
import Navlinks from "./Navlinks";

function Cards({ posts, NoLink }) {
  return (
    <div className="cardss">
      {!NoLink && <Navlinks />}
      {posts
        .slice(0)
        .reverse()
        .map((p, index) =>
          p === null ? "" : <CardItem post={p} key={index} />
        )}
    </div>
  );
}

export default Cards;
