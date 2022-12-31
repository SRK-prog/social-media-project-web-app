import React, { useState, useEffect, useRef } from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { connect } from "react-redux";
import Message from "../../components/message/Message";
import BASE_URL from "../../api/URL";

const Conversations = (props) => {
  const {
    onClose,
    currentChat,
    user,
    socketChannel,
    receiverId,
    incomingMessage,
  } = props;
  const [isOnline, setIsOnline] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const scrollRef = useRef();
  // console.log("message: ", message);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  console.log('incomingMessage: ', incomingMessage)

  useEffect(() => {
    setMessages((prev) => [
      ...prev,
      { ...incomingMessage, _id: Date.now(), conversationId: currentChat._id },
    ]);
  }, [incomingMessage]);

  useEffect(() => {
    if (!currentChat?._id) return;
    (async () => {
      try {
        const { data } = await BASE_URL.get("/messages/" + currentChat?._id);
        setMessages(data);
        const resp = await socketChannel.socket.getUserStatus({
          id: receiverId,
        });
      } catch (err) {
        console.log(err);
      }
    })();
    return () => socketChannel.socket.removeTracker({ id: receiverId });
    // eslint-disable-next-line
  }, [currentChat?._id, socketChannel?.isConnected]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    if (socketChannel?.isConnected) {
      socketChannel.socket.sendMessage({
        receiver: receiverId,
        sender: user._id,
        message: newMessage,
      });
    }

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
          Do not share any personal information in chat because I'm watching it
        </div>
        {currentChat && (
          <div className="ChatNavItems">
            <ArrowBackIcon onClick={onClose} />
          </div>
        )}
        {messages.map((m) => (
          <div className="px-4" key={m._id}>
            <Message message={m} own={m.sender === user._id} />
          </div>
        ))}
        <div ref={scrollRef}></div>
      </div>
      <form onSubmit={handleSubmit} className="px-4 mb-3 flex gap-4 h-12">
        <input
          className="h-full flex-grow focus:outline-none border outline-gray-40 rounded-md px-3"
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
  socketChannel: state.notificationSocket,
});

export default connect(mapStateToProps)(Conversations);
