import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import RequireAuth from "./components/RequireAuth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import authStore from "./stores/authStore";

function App() {
  const s = authStore();

  useEffect(() => {
    s.init();
  }, []);

  if (!s.ready) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/userprofile"
          element={<RequireAuth element={<UserProfile />} />}
        />
        <Route index element={<RequireAuth element={<Home />} />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
