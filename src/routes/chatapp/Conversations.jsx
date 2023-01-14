import React, { useState, useEffect, useRef, useCallback } from "react";
import { ArrowBack, Send } from "@material-ui/icons";
import { Link } from "react-router-dom";
import Message from "../../components/message/Message";
import BASE_URL from "../../api/baseUrl";
import { DEFAULT_AVATAR } from "../../constants/constants";
import Utils from "../../utils";

const Conversations = (props) => {
  const {
    onClose,
    currentChat,
    user,
    receiverId,
    incomingMessage,
    onSent,
    socket,
  } = props;
  const [isOnline, setIsOnline] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [justNowLeaved, setJustNowLeaved] = useState({
    status: false,
    lastSeen: 0,
  });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const loader = useRef(null);
  const loadingStatus = useRef(true);

  useEffect(() => {
    (async () => {
      try {
        updateLoading(true);
        const { data } = await BASE_URL.get("/messages/" + currentChat?._id);
        updateLoading(false);
        setMessages(data);
      } catch (error) {}
    })();
  }, [page, currentChat?._id]);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting && !loadingStatus.current) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "30px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  const scrollRef = useRef();

  useEffect(() => {
    setMessages((prev) => [
      { ...incomingMessage, _id: Date.now(), conversationId: currentChat._id },
      ...prev,
    ]);
    // eslint-disable-next-line
  }, [incomingMessage]);

  useEffect(() => {
    if (socket.connected) {
      socket.on("user_disconnect", (data) => {
        const isCurrentUserChat = data.offline === receiverId;
        setJustNowLeaved({
          status: isCurrentUserChat,
          lastSeen: Date.now(),
        });
        setIsOnline((prev) => (isCurrentUserChat ? false : prev));
      });
      socket.on("user_status", (data) => {
        setIsOnline((prev) => (data.online === receiverId ? true : prev));
      });
    }

    return () => {
      if (socket?.connected) socket.off("user_disconnect");
    };
    // eslint-disable-next-line
  }, [socket.connected]);

  const updateLoading = (value) => {
    setLoading(value);
    loadingStatus.current = value;
  };

  useEffect(() => {
    if (!currentChat?._id) return;
    (async () => {
      try {
        socket.emit("user_status", { id: receiverId }, ({ response }) => {
          setIsOnline(response?.online);
        });
      } catch (err) {
        updateLoading(false);
        console.log(err);
      }
    })();
    return () => socket.emit("remove_tracker", { id: receiverId }, () => {});
    // eslint-disable-next-line
  }, [currentChat?._id, socket.connected]);

  const emitMessage = (msgData) => {
    return new Promise((resolve) => {
      if (socket.connected) socket.emit("message", msgData, resolve);
      else resolve({ response: { sent: false } });
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    onSent({ text: newMessage, sender: user._id, receiver: receiverId });
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

    const promise = emitMessage({
      receiver: receiverId,
      sender: user._id,
      text: newMessage,
      createdAt: Date.now(),
    });

    try {
      setMessages([
        { ...message, _id: Date.now(), createdAt: Date.now(), promise },
        ...messages,
      ]);
      setNewMessage("");
      await BASE_URL.post("/messages", message);
    } catch (err) {
      console.log(err);
    }
  };

  const userStatus = () => {
    return isOnline
      ? "online"
      : `Last seen ${
          justNowLeaved.status
            ? Utils.formatDate(justNowLeaved?.lastSeen)
            : Utils.formatDate(currentChat?.lastSeen)
        }`;
  };

  return (
    <>
      {currentChat && (
        <div className="flex items-center md:px-5 px-2 py-1.5 bg-gray-20">
          <button className="px-1.5">
            <ArrowBack onClick={onClose} />
          </button>
          <Link
            className="flex gap-4 items-center"
            to={`/profile/${currentChat?.username}`}
          >
            <img
              className="w-10 h-10 object-cover rounded-full"
              src={currentChat?.profilepicture || DEFAULT_AVATAR}
              alt=""
            />
            <div className="font-medium">
              <div className="md:text-lg font-semibold text-base">
                {currentChat?.username}
              </div>
              <div className="md:text-sm text-xs">{userStatus()}</div>
            </div>
          </Link>
        </div>
      )}
      <div className="h-full overflow-y-auto px-2.5 my-4 custom-scrollbar flex flex-col-reverse">
        <div ref={scrollRef}></div>
        {messages.map((m) => (
          <div className="px-4" key={m._id}>
            <Message message={m} own={m.sender === user._id} />
          </div>
        ))}
        <div ref={loader} />
        <div className="text-center rounded bg-white text-xs text-darkGray-20 border py-2.5 border-gray-120 mx-10">
          Do not share any personal information in chat because I'm watching you
        </div>
      </div>
      <form onSubmit={handleSubmit} className="px-4 mb-3 flex gap-3 h-12">
        <input
          className="h-full flex-grow outline-1 outline outline-gray-100 rounded-full px-3"
          placeholder="Message..."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        ></input>
        <button
          type="submit"
          className="h-full w-20 text-white bg-blue-30 rounded-full grid place-content-center"
          onClick={handleSubmit}
        >
          <Send />
        </button>
      </form>
    </>
  );
};

export default Conversations;
