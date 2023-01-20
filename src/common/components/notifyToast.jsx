import toast from "react-hot-toast";

export default function NotifyToast(data) {
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } bg-white shadow-md rounded-lg pointer-events-auto flex ring-1 ring-black-0 ring-opacity-5 w-full max-w-[400px]`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <img
              className="h-10 w-10 rounded-full"
              src={data?.profilepicture || "/images/avatar.png"}
              alt=""
            />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-black-0">{data?.username}</p>
            <p className="mt-1 text-sm text-black-0">{data?.text}</p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-20">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium focus:outline-none"
        >
          Close
        </button>
      </div>
    </div>
  ));
}
