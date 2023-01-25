import React, { useState, useEffect, useRef, useCallback } from "react";
import { ArrowBack } from "@material-ui/icons";
import { Link } from "react-router-dom";
import Message from "../../components/message/Message";
import { chatBaseUrl } from "../../api/baseUrls";
import { DEFAULT_AVATAR } from "../../constants/constants";
import Utils from "../../utils";
import InputField from "./inputField";
import usePrevious from "../../hooks/usePrevious";

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
  const [justLeaved, setJustLeaved] = useState({ status: false, lastSeen: 0 });
  const [loading, setLoading] = useState(true);

  const prevConvId = usePrevious(currentChat?._id);

  const topEndRef = useRef(null);
  const scrollRef = useRef(null);

  const pageState = useRef({
    total: 0,
    page: 0,
    loading: true,
    conversationId: currentChat?._id,
    receiverId: receiverId,
  });

  const setPageState = (obj) => {
    pageState.current = { ...pageState.current, ...obj };
  };

  useEffect(() => {
    window.chatId = currentChat?._id;
    setPageState({ conversationId: currentChat?._id, receiverId: receiverId });
    // eslint-disable-next-line
  }, [currentChat?._id, receiverId]);

  const totalPages = useRef(0);
  const pageCount = useRef(0);

  const fetchMessages = async (params) => {
    try {
      updateLoading(true);
      const {
        data: { data, total },
      } = await chatBaseUrl.get("/messages", { params });
      return [data, total];
    } catch (error) {
      console.error("fetchMessages:- ", error);
    } finally {
      updateLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      if ((prevConvId || "") !== currentChat?._id) {
        setMessages([]);
        pageCount.current = 0;
        totalPages.current = 0;
      }
      const [data, total] = await fetchMessages({
        skip: pageCount.current,
        limit: 30,
        conversationId: currentChat?._id,
      });
      totalPages.current = total;
      setMessages(data);
    })();
    // eslint-disable-next-line
  }, [currentChat?._id]);

  const loadMoreMessages = async () => {
    const [data] = await fetchMessages({
      skip: pageCount.current,
      limit: 30,
      conversationId: pageState.current.conversationId,
    });
    setMessages((p) => [...p, ...data]);
  };

  const handleObserver = useCallback((entries) => {
    const [target] = entries;
    if (target.isIntersecting && !pageState.current.loading) {
      const count = pageCount.current;
      if (totalPages.current !== count) {
        pageCount.current = count + 1;
        loadMoreMessages();
      }
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const option = { root: null, rootMargin: "30px", threshold: 0 };
    const observer = new IntersectionObserver(handleObserver, option);
    if (topEndRef.current) observer.observe(topEndRef.current);

    return () => {
      // eslint-disable-next-line
      if (topEndRef.current) observer.unobserve(topEndRef.current);
    };
  }, [handleObserver]);

  useEffect(() => {
    if (Object.keys(incomingMessage).length)
      setMessages((prev) => [
        {
          ...incomingMessage,
          _id: Date.now(),
          conversationId: currentChat._id,
        },
        ...prev,
      ]);
    // eslint-disable-next-line
  }, [incomingMessage]);

  useEffect(() => {
    if (socket.connected) {
      socket.on("user_disconnect", (data) => {
        const recId = pageState.current.receiverId;
        const isCurrentUserChat = data.offline === recId;
        setJustLeaved({ status: isCurrentUserChat, lastSeen: Date.now() });
        if (isCurrentUserChat) setIsOnline(false);
      });
      socket.on("user_status", (data) => {
        const isCurrentUserChat = data.online === pageState.current.receiverId;
        if (isCurrentUserChat) setIsOnline(true);
      });
    }

    return () => {
      if (socket?.connected) socket.off("user_disconnect");
    };
    // eslint-disable-next-line
  }, [socket.connected]);

  const updateLoading = (value) => {
    setLoading(value);
    setPageState({ loading: value });
  };

  useEffect(() => {
    if (!currentChat?._id) return;
    (async () => {
      try {
        socket.emit("user_status", { id: receiverId }, ({ response }) => {
          setIsOnline(response?.online);
          // if (response && !response?.online)
          //   setJustLeaved({ status: false, lastSeen: currentChat?.lastSeen });
        });
      } catch (err) {
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

  const handleSubmit = async (text) => {
    if (!text.trim()) return;
    const message = {
      sender: user.userId,
      text: text,
      conversationId: currentChat._id,
      createdAt: Date.now(),
      receiver: receiverId,
    };
    onSent(message);
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

    const promise = emitMessage({
      ...message,
      profilepicture: user?.profilepicture,
      username: user?.username,
    });

    try {
      setMessages((prev) => [
        { ...message, _id: Date.now(), promise },
        ...prev,
      ]);
      await chatBaseUrl.post("/messages", message);
    } catch (err) {
      console.log(err);
    }
  };

  const userStatus = () => {
    return isOnline
      ? "online"
      : `Last seen ${
          justLeaved.status
            ? Utils.formatDate(justLeaved?.lastSeen)
            : Utils.formatDate(currentChat?.lastSeen)
        }`;
  };

  const showSent = (msg) => {
    return (
      msg?.sender === user?.userId &&
      !!msg?.promise &&
      messages?.[0]?._id === msg?._id
    );
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
            to={`/profile/${currentChat?.userId}`}
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
      {loading && (
        <div className="h-10 w-10 absolute top-20 right-0 left-0 mx-auto shadow-md p-1 rounded-full">
          <div className="circle-loader"></div>
        </div>
      )}
      <div className="h-full overflow-y-auto px-3.5 pt-6 custom-scrollbar flex flex-col-reverse">
        <div className="mt-6" ref={scrollRef}></div>
        {messages.map((m) => (
          <div className="px-4" key={m._id}>
            <Message
              showSent={showSent(m)}
              message={m}
              own={m.sender === user.userId}
            />
          </div>
        ))}
        <div ref={topEndRef}></div>
        <div className="text-center rounded bg-white text-xs mb-auto text-darkGray-20 border py-2.5 border-gray-120 mx-10">
          Do not share any personal information in chat because I'm watching you
        </div>
      </div>
      <InputField onSubmit={handleSubmit} />
    </>
  );
};

export default Conversations;
