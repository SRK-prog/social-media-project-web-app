export default function Skeleton() {
  return (
    <div className="mt-2 mx-1 rounded-lg bg-white border border-gray-100 py-2.5 animate-pulse">
      <div className="h-12 w-12 bg-gray-150 rounded-full ml-4 mb-2"></div>
      <div className="bg-gray-150 min-h-62.5 max-h-100"></div>
      <div className="px-5">
        <div className="bg-gray-150 w-24 h-5 mt-5"></div>
        <div className="bg-gray-150 w-[90%] h-5 mt-3 mb-3"></div>
      </div>
    </div>
  );
}
