import "./App.css";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import MyPosts from "./pages/MyPosts";

import Join from "./pages/Join";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/signup" element={<Join />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/" element={<Main />} />

      <Route path="/:userId/myposts" element={<MyPosts />} />

      {/* invalid routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
