import { useEffect, useState } from "react";
import { DEFAULT_AVATAR } from "../../constants/constants";
import { baseUrl } from "../../api/baseUrls";

const formatText = (conv, curtUserId) => {
  if (!conv?.text) return "";
  if (conv?.sender === curtUserId) return `You: ${conv?.text}`;
  return conv?.text;
};

function Conversation({ conversation, currentUser, isActive, onSelect }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser.userId);
    (async () => {
      try {
        const { data } = await baseUrl.get("/users", {
          params: { userId: friendId },
        });
        if (data?.response) setUser(data.response);
      } catch (err) {
        console.log(err);
      }
    })();
    // eslint-disable-next-line
  }, [currentUser]);

  return (
    <div
      onClick={() => onSelect({ ...user, ...conversation, userId: user?._id })}
      className={`flex items-center p-2.5 cursor-pointer hover:bg-gray-30 ${
        isActive && "bg-gray-20"
      }`}
    >
      <img
        className="w-10 h-10 object-cover mr-5 rounded-full"
        src={user?.profilepicture || DEFAULT_AVATAR}
        alt=""
      />
      <div className="font-medium">
        <div>{user?.username}</div>
        <div className="truncate w-40 text-xs">
          {formatText(conversation, currentUser._id)}
        </div>
      </div>
    </div>
  );
}

export default Conversation;
