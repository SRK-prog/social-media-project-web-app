import { useContext, useEffect, useState } from "react";
import "./Chatapp.css";
import Conversation from "../../components/conversations/Conversation";
import { Context } from "../../context/Context";
import BASE_URL from "../../api/URL";
import Loader from "../../common/components/loader";
import SocketService from "../../services/socketService";
import Conversations from "./Conversations";

function Chatapp() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(Context);

  useEffect(() => {
    // const socket = io("http://localhost:5000");
    // const socket = new SocketService("http://localhost:5005");

    // socket.joinChat();
    // socket.onMessage((msg) => console.log(msg));

    // return () => socket.disconnect();

    // socket.emit("joinRoom", { username: "react", room: "JavaScript" });

    // // Get room and users
    // socket.on("roomUsers", ({ room, users }) => {
    //   console.log(room, users);
    // });

    // socket.on("message", (message) => {
    //   console.log(message);
    // });
    // console.log(socket);
  }, []);

  useEffect(() => {
    document.title = "Chat | Mern";
    (async () => {
      try {
        setIsLoading(true);
        const { data } = await BASE_URL.get("/conversations/" + user._id);
        setIsLoading(false);
        setConversations(data);
      } catch (err) {
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
      <div className="messenger">
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

        <div className="chatBox px-4">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <Conversations
                user={user}
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

export default Chatapp;
