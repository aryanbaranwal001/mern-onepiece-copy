import { Latest, Login, MyTheories, SignUp, Top } from "./pages";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import { useAuthStore } from "./store/useAuth.js";
import { useEffect } from "react";

const App = () => {
  const { userLoggedIn, check, loading } = useAuthStore();

  useEffect(() => {
    check();
  }, [check]); //

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Toaster />
      {userLoggedIn ? <Navbar /> : ""}
      <Routes>
        <Route
          path="/top"
          element={userLoggedIn ? <Top /> : <Navigate to="/signup" />}
        />
        <Route
          path="/latest"
          element={userLoggedIn ? <Latest /> : <Navigate to="/signup" />}
        />
        <Route
          path="/login"
          element={userLoggedIn ? <Navigate to="/top" /> : <Login />}
        />
        <Route
          path="/signup"
          element={userLoggedIn ? <Navigate to="/top" /> : <SignUp />}
        />
        <Route
          path="/mytheories"
          element={userLoggedIn ? <MyTheories /> : <Navigate to="/signup" />}
        />
      </Routes>
    </>
  );
};

export default App;
