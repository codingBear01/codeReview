import TopBar from "./components/topbar/TopBar"; //import Topbar.jsx from components folder
import Home from "./pages/home/Home"; //import Home.jsx from pages folder
import Single from "./pages/single/Single"; //import Single.jsx from pages folder
import Write from "./pages/write/Write"; //import Write.jsx from pages folder
import Settings from "./pages/settings/Settings"; //import Settings.jsx from pages folder
import Login from "./pages/login/Login"; //import Login.jsx from pages folder
import Register from "./pages/register/Register"; //import Register.jsx from pages folder
import { useContext } from "react";
import { Context } from "./context/Context";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  const { user } = useContext(Context);

  return (
    <Router>
      <TopBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/post/:postId" element={<Single />} />
        <Route path="/write" element={user ? <Write /> : <Register />} />
        <Route path="/settings" element={user ? <Settings /> : <Register />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
      </Routes>
    </Router>
  );
}

export default App;
