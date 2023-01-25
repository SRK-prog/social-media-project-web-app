import { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Conversation from "../../components/conversations/Conversation";
import { chatBaseUrl } from "../../api/baseUrls";
import Loader from "../../common/components/loader";
import Conversations from "./Conversations";
import { subscribe, unsubscribe } from "../../services/events";
import { APP_NAME } from "../../constants/constants";

function Chatapp({ socket, user }) {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [incomingMessage, setIncomingMessage] = useState({});

  const convRef = useRef(null);

  useEffect(() => {
    document.title = `${APP_NAME} | Chat`;
  }, []);

  const addSortConversations = ({ conversationId, text, sender }) => {
    setConversations((prev) => {
      const temp = prev.map((i) =>
        conversationId === i?._id ? { ...i, text, sender: sender } : i
      );
      return temp.sort((x, y) =>
        conversationId === x?._id ? -1 : conversationId === y?._id ? 1 : 0
      );
    });
  };

  useEffect(() => {
    const onMessage = ({ detail }) => {
      addSortConversations(detail);
      if (convRef?.current?.includes(detail?.sender)) {
        setIncomingMessage(detail);
      }
    };

    subscribe("message", onMessage);
    return () => {
      unsubscribe("message", onMessage);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const { data } = await chatBaseUrl.get("/conversations/" + user.userId);
        setConversations(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [user.userId]);

  const updateChat = (data) => {
    setCurrentChat(data);
    convRef.current = !!data ? data?.members : [];
  };

  if (isLoading) return <Loader />;

  if (!!conversations.length) {
    return (
      <div className="flex bg-gray-110 w-full max-w-360 mx-auto">
        <div
          className={`md:sticky fixed md:block z-10 bg-white overflow-y-auto w-full flex-[3] h-screen-cal-55 custom-scrollbar ${
            !currentChat ? "block" : "hidden"
          }`}
        >
          <div className="h-full">
            {conversations.map((c) => (
              <Conversation
                key={c._id}
                onSelect={updateChat}
                isActive={c?._id === currentChat?._id}
                conversation={c}
                currentUser={user}
              />
            ))}
          </div>
        </div>

        <div className="sticky w-full flex-[7] h-screen-cal-55">
          <div className="flex flex-col justify-between relative w-full h-full">
            {currentChat ? (
              <Conversations
                user={user}
                socket={socket}
                incomingMessage={incomingMessage}
                onSent={addSortConversations}
                receiverId={currentChat?.members.find((i) => i !== user.userId)}
                currentChat={currentChat}
                onClose={() => updateChat(null)}
              />
            ) : (
              <span className="grid place-content-center h-full text-ft50-60 text-darkGray-20 text-center">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center mt-32">
      <div className="m-auto font-bold text-darkGray-10 text-2xl mb-2">
        No Friends
      </div>
      <div className="mx-auto text-[#222222] font-medium">
        Follow a Friend To Start Conversation
      </div>
      <Link
        to="/"
        className="text-[#3a8fde] text-lg block underline underline-offset-2 mx-auto mt-1"
      >
        Go Back
      </Link>
    </div>
  );
}

const mapStateToProps = (state) => ({
  socket: state.socket.socket,
  user: state.user,
});

export default connect(mapStateToProps)(Chatapp);
