import {Latest, Login, MyTheories, SignUp, Top} from "./pages";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
function App() {

  return (
    <>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/latest" element={<Latest />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mytheories" element={<MyTheories />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  )
}

export default App
