import { useEffect, lazy, Suspense, useRef } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import { io } from "socket.io-client";
import { Toaster } from "react-hot-toast";
import Loader from "./common/components/loader";
import Navbar from "./components/navbar/Navbar";
import Utils from "./utils";
import { actionTypes } from "./constants/constants";
import { publish } from "./services/events";
import notifyToast from "./common/components/notifyToast";

const Home = lazy(() => import("./routes/home/Home"));
const SinglePost = lazy(() => import("./routes/singlePost/SinglePost"));
const Register = lazy(() => import("./routes/register/Register"));
const Login = lazy(() => import("./routes/login/Login"));
const Write = lazy(() => import("./routes/createPost"));
const Profile = lazy(() => import("./routes/profile/Profile"));
const Frndsfeed = lazy(() => import("./routes/frndsfeed/Frndsfeed"));
const Error404 = lazy(() => import("./routes/errors/Error404"));
const Contact = lazy(() => import("./routes/contact/Contact"));
const Settings = lazy(() => import("./routes/settings/Settings"));
const Chatapp = lazy(() => import("./routes/chatapp/Chatapp"));
const About = lazy(() => import("./routes/about/About"));
const ForgotPassword = lazy(() => import("./routes/forgotPassword"));
const ResetPassword = lazy(() => import("./routes/resetPassword"));

const { UPDATE_SOCKET } = actionTypes;

function App({ dispatch, socket, user }) {
  const isVisible = useRef(true);

  useEffect(() => {
    try {
      Utils.requestNotificationAccess();
    } catch (error) {
      console.warn("Notification error", error);
    }
  }, []);

  useEffect(() => {
    const onChange = () => {
      const state = document.visibilityState;
      if (state === "visible") isVisible.current = true;
      if (state === "hidden") isVisible.current = false;
    };
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, []);

  const showNotication = (data) => {
    if (isVisible.current) {
      const chatId = window.chatId || "";
      if (chatId !== data?.conversationId) notifyToast(data);
    } else {
      Utils.openNotification({
        title: data?.username,
        message: data?.text || "",
        icon: data?.profilepicture,
      });
    }
  };

  useEffect(() => {
    if (socket.connected) {
      socket.on("message", async (data) => {
        publish("message", data);
        showNotication(data);
      });
    }
    return () => {
      if (socket.connect) socket.off("message");
    };
    // eslint-disable-next-line
  }, [socket.connected]);

  const connect = async () => {
    if (socket.connected) return;
    const socketIo = io(process.env.REACT_APP_CHAT_SERVICE_URL + "/chat", {
      query: { id: user?.userId },
    });
    socketIo.once("connect", () => {
      socketIo.emit("join", "", () => {});
      dispatch(UPDATE_SOCKET, { socket: socketIo });
    });
    socketIo.once("connect_error", (err) => {
      console.log("connect_error: ", err);
    });
    socketIo.once("connect_timeout", (err) => {
      console.log("connect_timeout: ", err);
    });
  };

  useEffect(() => {
    if (user?.userId) connect();
    return () => {
      if (socket?.connected) socket.disconnect();
    };
    // eslint-disable-next-line
  }, [user?.userId]);

  return (
    <Router>
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Register} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="/error404" component={Error404} />
          <Route path="/contact" component={Contact} />
          <Route path="/about" component={About} />
          <ProtectedRoute
            isLoggedIn={user.isLoggedIn}
            path="/write"
            component={Write}
          />
          <ProtectedRoute
            isLoggedIn={user.isLoggedIn}
            path="/postdetails/:postId"
            component={SinglePost}
          />
          <ProtectedRoute
            isLoggedIn={user.isLoggedIn}
            path="/profile/:username"
            component={Profile}
          />
          <ProtectedRoute
            isLoggedIn={user.isLoggedIn}
            path="/feeds"
            component={Frndsfeed}
          />
          <ProtectedRoute
            isLoggedIn={user.isLoggedIn}
            path="/settings"
            component={Settings}
          />
          <ProtectedRoute
            isLoggedIn={user.isLoggedIn}
            path="/chat"
            component={Chatapp}
          />
          <Redirect exact from="*" to="/error404" />
        </Switch>
        <Toaster position="bottom-right" reverseOrder={false} />
      </Suspense>
    </Router>
  );
}

const ProtectedRoute = ({ component: Component, isLoggedIn, ...rest }) => {
  return isLoggedIn ? <Component {...rest} /> : <Redirect to="/signup" />;
};

const mapStateToProps = (state) => ({
  socket: state.socket.socket,
  user: state.user,
});

const dispatch = Utils.dispatch;

export default connect(mapStateToProps, { dispatch })(App);
