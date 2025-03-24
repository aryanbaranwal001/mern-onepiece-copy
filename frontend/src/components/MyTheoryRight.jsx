import { useState, useRef, useEffect } from "react";
import { axiosInstance } from "../lib/axios.js";
import { useAuthStore } from "../store/useAuth.js";
import toast from "react-hot-toast";

export default function MyThoeryRight() {
  const { gotUser, getUser } = useAuthStore();

  const userRef = useRef(null);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      if (!userRef.current) {
        const userData = await getUser(); // Wait for the resolved data
        userRef.current = userData; // Store the actual data
      }
    };
    fetchUser();
  }, []);

  if (!gotUser) {
    return <p>Loading.....</p>;
  }

  const handlePost = async (e) => {
    e.preventDefault();
    const data = { title, text };
    try {
      const res = await axiosInstance.post("/author/create", data);
      if (res.data.doesTheoryExit === true) {
        toast.error("Theory already exists");
      }
      if (res.data.isTheoryCreated === true) {
        toast.success("New Post Created");
        setTitle("");
        setText("");
        setTimeout(() => {
          window.location.reload();
        }, 300);
      }
    } catch (err) {
      toast.error("Could not create post");
      console.error(err);
    }
  };

  return (
    <div className="h-full w-full  flex justify-center">
      <form
        onSubmit={handlePost}
        className="min-w-[390px] min-h-[500px] max-h-[600px] bg-neutral m-4 p-4 rounded-xl shadow-md mt-[120px]"
      >
        {/* User Info */}
        <div className="flex items-center  gap-3 mb-1">
          <span className="text-sm text-[20px] text-gray-500">
            {"@"}
            {userRef.current ? userRef.current.username : "Username"}
          </span>
        </div>

        {/* Editable Title */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="placeholder-opacity-10 w-full text-2xl font-bold bg-transparent  border-gray-300 outline-none"
        />

        {/* Auto-growing Textarea */}
        <textarea
          value={text}
          placeholder="Theory"
          onChange={(e) => setText(e.target.value)}
          className="placeholder-opacity-10 w-full min-h-[420px] max-h-[420px] bg-transparent border p-2 mt-2 border-gray-300 rounded-lg outline-none resize-none overflow-y-auto"
        ></textarea>

        {/* Action Buttons */}
        <div className="flex w-full justify-center mt-3">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Post
          </button>
        </div>
      </form>
    </div>
  );
}
