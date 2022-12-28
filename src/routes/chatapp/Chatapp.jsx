import "./Chatapp.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../context/Context";
import BASE_URL from "../../api/URL";

export default function Chatapp() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [timeout, setTime] = useState(false);
  const { user } = useContext(Context);
  const scrollRef = useRef();

  useEffect(() => {
    document.title = "Chat | Mern";
    (async () => {
      try {
        const { data } = await BASE_URL.get("/conversations/" + user._id);
        setConversations(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [user._id]);

  useEffect(() => {
    if (!currentChat) return;
    (async () => {
      try {
        const { data } = await BASE_URL.get("/messages/" + currentChat?._id);
        setMessages(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    try {
      const { data } = await BASE_URL.post("/messages", message);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (!!conversations.length) {
    return (
      <div className="messenger">
        <div className={`chatMenu ${!currentChat && "ChatmenuActive"}`}>
          <div className="chatMenuWrapper">
            {conversations.map((c) => (
              <div key={c._id} onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>

        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  <div className="DoNotMsg">
                    Do not share any personal information in chat
                  </div>
                  {currentChat && (
                    <div className="ChatNavItems">
                      <ArrowBackIcon onClick={() => setCurrentChat(null)} />
                    </div>
                  )}
                  {messages.map((m) => (
                    <div ref={scrollRef} key={m._id}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <input
                    className="chatMessageInput"
                    placeholder="Message..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></input>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        {timeout && (
          <>
            <div className="NoFrndtitle">
              <div className="NoFrnds">No Friends</div>
              <div className="NoFrndsLabel">
                Follow a Friend To Start Conversation
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}
