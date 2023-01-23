import { memo, useState, useEffect } from "react";
import moment from "moment";
import { Done } from "@material-ui/icons";

const formatDate = (date) => {
  const today = new Date();
  const isToday =
    today.toLocaleDateString() === new Date(date).toLocaleDateString();
  if (isToday) return moment(date).format("hh:mm a");
  return moment(date).format("DD-MM-YYYY hh:mm a");
};

function Message({ message, own, showSent }) {
  const [isSent, setIsSent] = useState(false);

  useEffect(() => {
    if (showSent)
      message.promise.then((r) => r?.response?.sent).then(setIsSent);
    // eslint-disable-next-line
  }, []);

  return (
    <div className={`flex flex-col ${own && "items-end"} mt-2`}>
      <div className={`max-w-xs flex`}>
        <div
          className={`px-2.5 py-1 rounded relative ${
            own ? "bg-blue-10 text-white" : "bg-gray-50"
          }`}
        >
          <div className="text-xs">{formatDate(message?.createdAt)}</div>
          <div className="md:text-base text-sm break-all mr-3.5">
            {message?.text}
          </div>
          {showSent && isSent && (
            <div className="text-[14px] absolute text-white bottom-0.5 right-2">
              <Done fontSize="inherit" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(Message);
