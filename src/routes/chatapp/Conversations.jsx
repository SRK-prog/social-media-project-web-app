import React, { useState, useEffect, useRef } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { connect } from "react-redux";
import Message from "../../components/message/Message";
import BASE_URL from "../../api/URL";

const Conversations = (props) => {
  const { onClose, currentChat, user, notifySocket, receiverId } = props;
  const [isOnline, setIsOnline] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleOnMessage = () => {
    notifySocket.socket.onMessage((data) => {
      const message = {
        sender: data?.sender,
        text: data?.message,
        conversationId: currentChat._id,
      };
      setMessages((prev) => [...prev, { ...message, _id: Date.now() }]);
    });
  };

  useEffect(() => {
    if (!currentChat?._id) return;
    (async () => {
      try {
        const { data } = await BASE_URL.get("/messages/" + currentChat?._id);
        setMessages(data);
        handleOnMessage();
        const resp = await notifySocket.socket.checkOnline({ id: receiverId });
        console.log("resp: ", resp);
      } catch (err) {
        console.log(err);
      }
    })();
    // eslint-disable-next-line
  }, [currentChat?._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    notifySocket.socket.sendMessage({
      receiver: receiverId,
      sender: user._id,
      message: newMessage,
    });

    try {
      setMessages([...messages, { ...message, _id: Date.now() }]);
      setNewMessage("");
      await BASE_URL.post("/messages", message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="chatBoxTop">
        <div className="DoNotMsg">
          Do not share any personal information in chat
        </div>
        {currentChat && (
          <div className="ChatNavItems">
            <ArrowBackIcon onClick={onClose} />
          </div>
        )}
        {messages.map((m) => (
          <div key={m._id}>
            <Message message={m} own={m.sender === user._id} />
          </div>
        ))}
        <div ref={scrollRef}></div>
      </div>
      <form onSubmit={handleSubmit} className="chatBoxBottom">
        <input
          className="chatMessageInput"
          placeholder="Message..."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        ></input>
        <button
          type="submit"
          className="chatSubmitButton"
          onClick={handleSubmit}
        >
          Send
        </button>
      </form>
    </>
  );
};

const mapStateToProps = (state) => ({
  notifySocket: state.notificationSocket,
});

export default connect(mapStateToProps)(Conversations);
