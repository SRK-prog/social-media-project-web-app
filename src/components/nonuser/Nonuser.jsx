import "./Nonuser.css";
import Nonusercard from "./Nonusercard";

function Nonuser({ posts }) {
  return (
    <div className="Noncards px-2">
      {posts.map((p) => (
        <Nonusercard post={p} key={p._id} />
      ))}
    </div>
  );
}

export default Nonuser;
