import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import { useContext } from "react";
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

function App() {
  const { user } = useContext(Context);

  return (
    <HashRouter>
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
        <Redirect exact from="*" to="/" />
      </Switch>
    </HashRouter>
  );
}

export default App;
