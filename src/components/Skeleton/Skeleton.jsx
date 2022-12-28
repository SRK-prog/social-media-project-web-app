import "./skeleton.css";

export default function Skeleton() {
  return (
    <div className="SkeletonContainer">
      <div className="SkeletonPic"></div>
      <div className="SkeletonImage"></div>
      <div className="SkeletonTitle"></div>
      <div className="SkeletonDesc"></div>
    </div>
  );
}
