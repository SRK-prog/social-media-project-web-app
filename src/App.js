import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useContext } from "react";
import { connect } from "react-redux";
import Home from "./routes/home/Home";
import Navbar from "./components/navbar/Navbar";
import SinglePost from "./routes/singlePost/SinglePost";
import Register from "./routes/register/Register";
import Login from "./routes/login/Login";
import Write from "./routes/write/Write";
import { Context } from "./context/Context";
import Profile from "./routes/profile/Profile";
import Settings from "./routes/settings/Settings";
import Frndsfeed from "./routes/frndsfeed/Frndsfeed";
import Error404 from "./routes/errors/Error404";
import Contact from "./routes/contact/Contact";
import Chatapp from "./routes/chatapp/Chatapp";
import About from "./routes/about/About";
import SocketService from "./services/socketService";
import Utils from "./utils";
import { actionTypes } from "./constants/constants";
import BASE_URL from "./api/URL";

const socket = new SocketService();

const { UPDATE_NOTIFY_SOCKET } = actionTypes;

function App({ dispatch }) {
  const { user } = useContext(Context);

  const receiveNotifications = async () => {
    try {
      await Utils.requestNotificationAccess();
      socket.onMessage(async ({ sender, message }) => {
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
    } catch (err) {
      console.warn("Notification error", err);
    }
  };

  useEffect(() => {
    (async () => {
      if (!user?._id) return;
      try {
        await socket.connect("http://localhost:5005/chat", {
          query: { id: user?._id },
        });
        await socket.join();
        dispatch(UPDATE_NOTIFY_SOCKET, { socket, isConnected: true });
        receiveNotifications();
      } catch (error) {
        console.error("error: ", error);
      }
    })();
    return () => socket.disconnect();
    // eslint-disable-next-line
  }, [user?._id]);

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Register} />
        <Route path="/write" component={user ? Write : Register} />
        <Route
          path="/postdetails/:postId"
          component={user ? SinglePost : Register}
        />
        <Route
          path="/profile/:username"
          component={user ? Profile : Register}
        />
        <Route path="/feeds" component={user ? Frndsfeed : Register} />
        <Route path="/settings" component={user ? Settings : Register} />
        <Route path="/error404" component={Error404} />
        <Route path="/chat" component={user ? Chatapp : Register} />
        <Route path="/contact" component={Contact} />
        <Route path="/about" component={About} />
        <Redirect exact from="*" to="/error404" />
      </Switch>
    </Router>
  );
}

const dispatch = Utils.dispatch;

export default connect(null, { dispatch })(App);
