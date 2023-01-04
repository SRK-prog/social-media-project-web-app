import moment from "moment";

const formatDate = (date) => {
  const today = new Date();
  const isToday =
    today.toLocaleDateString() === new Date(date).toLocaleDateString();
  if (isToday) return moment(date).format("hh:mm a");
  return moment(date).format("DD-MM-YYYY hh:mm a");
};

export default function Message({ message, own }) {
  return (
    <div className={`flex flex-col ${own && "items-end"} mt-2`}>
      <div className={`max-w-xs flex`}>
        <div
          className={`px-2.5 py-1 rounded ${
            own ? "bg-blue-10 text-white" : "bg-gray-50"
          }`}
        >
          <div className="text-xs">{formatDate(message?.createdAt)}</div>
          <div className="md:text-base text-sm">{message?.text}</div>
        </div>
      </div>
    </div>
  );
}
