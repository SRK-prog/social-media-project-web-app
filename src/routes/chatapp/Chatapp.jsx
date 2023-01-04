import { useContext, useEffect, useState } from "react";
import "./Chatapp.css";
import Conversation from "../../components/conversations/Conversation";
import { Context } from "../../context/Context";
import BASE_URL from "../../api/URL";
import Loader from "../../common/components/loader";
import Conversations from "./Conversations";
import { connect } from "react-redux";

document.title = "Chat | Mern";

function Chatapp({ socket }) {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [incomingMessage, setIncomingMessage] = useState({});
  const { user } = useContext(Context);

  const addSortConversations = (data) => {
    setConversations((prev) => {
      const temp = prev.map((i) =>
        i.members.includes(data?.sender)
          ? { ...i, text: data?.text, sender: data?.sender }
          : i
      );
      return temp.sort((x, y) =>
        x.members.includes(data?.sender)
          ? -1
          : y.members.includes(data?.sender)
          ? 1
          : 0
      );
    });
  };

  const handleOnMessage = () => {
    if (!socket?.connected) return;
    try {
      socket.on("message", (data) => {
        addSortConversations(data);
        if (currentChat?.members?.includes(data?.sender)) {
          setIncomingMessage(data);
        }
      });
    } catch (error) {
      console.error("error handleOnMessage: ", error);
    }
  };

  useEffect(() => {
    handleOnMessage();
    // eslint-disable-next-line
  }, [socket?.connected, currentChat?.members]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const { data } = await BASE_URL.get("/conversations/" + user._id);
        setIsLoading(false);
        setConversations(data);
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    })();
  }, [user._id]);

  const isActiveConversation = (members) => {
    const friendId = members.find((i) => i !== user._id);
    return currentChat?.members
      ? currentChat?.members.includes(friendId)
      : false;
  };

  if (isLoading) return <Loader />;

  if (!!conversations.length) {
    return (
      <div className="messenger max-w-360 mx-auto">
        <div className={`chatMenu ${!currentChat && "ChatmenuActive"}`}>
          <div className="h-full">
            {conversations.map((c) => (
              <Conversation
                key={c._id}
                onSelect={setCurrentChat}
                isActive={isActiveConversation(c.members)}
                conversation={c}
                currentUser={user}
              />
            ))}
          </div>
        </div>

        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <Conversations
                user={user}
                socket={socket}
                incomingMessage={incomingMessage}
                onSent={addSortConversations}
                receiverId={currentChat?.members.find((i) => i !== user._id)}
                currentChat={currentChat}
                onClose={() => setCurrentChat(null)}
              />
            ) : (
              <span className="grid place-content-center h-full text-ft50-60 text-gray-10 text-center">
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
      <div className="NoFrnds">No Friends</div>
      <div className="NoFrndsLabel">Follow a Friend To Start Conversation</div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  socket: state.socket.socket,
});

export default connect(mapStateToProps)(Chatapp);
