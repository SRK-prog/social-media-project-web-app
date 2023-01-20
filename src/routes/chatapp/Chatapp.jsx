import { useEffect, useState, useRef } from "react";
import Conversation from "../../components/conversations/Conversation";
import BASE_URL from "../../api/baseUrl";
import Loader from "../../common/components/loader";
import Conversations from "./Conversations";
import { connect } from "react-redux";
import { subscribe, unsubscribe } from "../../services/events";

document.title = "Social Media | Chat";

function Chatapp({ socket, user }) {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [incomingMessage, setIncomingMessage] = useState({});

  const convRef = useRef(null);

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
        const { data } = await BASE_URL.get("/conversations/" + user.userId);
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
      <div className="m-auto font-semibold text-gray-110 mb-2">No Friends</div>
      <div className="mx-auto">Follow a Friend To Start Conversation</div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  socket: state.socket.socket,
  user: state.user,
});

export default connect(mapStateToProps)(Chatapp);
