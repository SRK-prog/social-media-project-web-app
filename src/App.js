import { useEffect, useContext, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { connect } from "react-redux";
import { io } from "socket.io-client";
import Loader from "./common/components/loader";
import Navbar from "./components/navbar/Navbar";
import { Context } from "./context/Context";
import Utils from "./utils";
import { actionTypes } from "./constants/constants";
import BASE_URL from "./api/baseUrl";

const Home = lazy(() => import("./routes/home/Home"));
const SinglePost = lazy(() => import("./routes/singlePost/SinglePost"));
const Register = lazy(() => import("./routes/register/Register"));
const Login = lazy(() => import("./routes/login/Login"));
const Write = lazy(() => import("./routes/write/Write"));
const Profile = lazy(() => import("./routes/profile/Profile"));
const Frndsfeed = lazy(() => import("./routes/frndsfeed/Frndsfeed"));
const Error404 = lazy(() => import("./routes/errors/Error404"));
const Contact = lazy(() => import("./routes/contact/Contact"));
const Settings = lazy(() => import("./routes/settings/Settings"));
const Chatapp = lazy(() => import("./routes/chatapp/Chatapp"));
const About = lazy(() => import("./routes/about/About"));

const { UPDATE_SOCKET } = actionTypes;

function App({ dispatch, socket }) {
  const { user } = useContext(Context);

  useEffect(() => {
    (async () => {
      try {
        await Utils.requestNotificationAccess();
        if (socket.connected) {
          socket.on("message", async ({ sender, message }) => {
            if (window.location.pathname === "/chat") return;
            const { data } = await BASE_URL.get("/users", {
              params: { userId: sender },
            });
            Utils.openNotification({
              title: data?.username,
              message: message,
              icon: data?.profilepicture,
            });
          });
        }
      } catch (err) {
        console.warn("Notification error", err);
      }
    })();
    // eslint-disable-next-line
  }, [socket.connected]);

  const connect = async () => {
    if (socket.connected) return;
    const socketIo = io(process.env.REACT_APP_CHAT_SOCKET_URL, {
      query: { id: user?._id },
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
    if (user?._id) connect();
    return () => {
      if (socket?.connected) socket.disconnect();
    };
    // eslint-disable-next-line
  }, [user?._id]);

  return (
    <Router>
      <Navbar />
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Register} />
          <Route path="/error404" component={Error404} />
          <Route path="/contact" component={Contact} />
          <Route path="/about" component={About} />
          <ProtectedRoute isLoggedIn={user} path="/write" component={Write} />
          <ProtectedRoute
            isLoggedIn={user}
            path="/postdetails/:postId"
            component={SinglePost}
          />
          <ProtectedRoute
            isLoggedIn={user}
            path="/profile/:username"
            component={Profile}
          />
          <ProtectedRoute
            isLoggedIn={user}
            path="/feeds"
            component={Frndsfeed}
          />
          <ProtectedRoute
            isLoggedIn={user}
            path="/settings"
            component={Settings}
          />
          <ProtectedRoute isLoggedIn={user} path="/chat" component={Chatapp} />
          <Redirect exact from="*" to="/error404" />
        </Switch>
      </Suspense>
    </Router>
  );
}

const ProtectedRoute = ({ component: Component, isLoggedIn, ...rest }) => {
  return isLoggedIn ? <Component {...rest} /> : <Redirect to="/signup" />;
};

const mapStateToProps = (state) => ({
  socket: state.socket.socket,
});

const dispatch = Utils.dispatch;

export default connect(mapStateToProps, { dispatch })(App);
