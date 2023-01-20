import Nonusercard from "./Nonusercard";

function Nonuser({ posts }) {
  return (
    <div className="mt-1.5 flex-[6.5] px-2">
      {posts.map((p) => (
        <Nonusercard post={p} key={p._id} />
      ))}
    </div>
  );
}

export default Nonuser;
