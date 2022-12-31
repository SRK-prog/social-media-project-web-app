import { useContext, useEffect, useState } from "react";
import "./Chatapp.css";
import Conversation from "../../components/conversations/Conversation";
import { Context } from "../../context/Context";
import BASE_URL from "../../api/URL";
import Loader from "../../common/components/loader";
import Conversations from "./Conversations";
import { connect } from "react-redux";

function Chatapp({ socketChannel }) {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [incomingMessage, setIncomingMessage] = useState({});
  const { user } = useContext(Context);

  // useEffect(() => {

  // }, []);

  console.log("conversations: ", conversations);

  const handleOnMessage = () => {
    if (!socketChannel?.isConnected) return;
    try {
      window.socket.on("message", (data) => {
        const message = {
          sender: data?.sender,
          text: data?.message,
        };
        console.log("data: ", data);
        setIncomingMessage(message);
        setConversations((prev) => {
          const temp = prev.map((i) =>
            i.members.includes(data?.sender) ? { ...i, text: data?.message } : i
          );
          return temp.sort((x, y) => {
            return x.members.includes(data?.sender)
              ? -1
              : y.members.includes(data?.sender)
              ? 1
              : 0;
          });
        });
      });
    } catch (error) {
      console.error("error handleOnMessage: ", error);
    }
  };

  useEffect(() => {
    handleOnMessage();
  }, [socketChannel?.isConnected]);

  useEffect(() => {
    document.title = "Chat | Mern";
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
              <div key={c._id} onClick={() => setCurrentChat(c)}>
                <Conversation
                  isActive={isActiveConversation(c.members)}
                  conversation={c}
                  currentUser={user}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <Conversations
                user={user}
                incomingMessage={
                  currentChat?.members?.includes(incomingMessage?.sender)
                    ? incomingMessage
                    : ""
                }
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
  socketChannel: state.notificationSocket,
});

export default connect(mapStateToProps)(Chatapp);
