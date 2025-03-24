import { useState, useRef, useEffect } from "react";
import { axiosInstance } from "../lib/axios.js";
import { useAuthStore } from "../store/useAuth.js";
import toast from "react-hot-toast";

export default function MyThoeryRight() {
  const { gotUser, getUser } = useAuthStore();

  const userRef = useRef(null);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const textAreaRef = useRef(null);
  // Adjust textarea height dynamically

  useEffect(() => {
    const fetchUser = async () => {
      if (!userRef.current) {
        const userData = await getUser(); // Wait for the resolved data
        userRef.current = userData; // Store the actual data
      }

      if (textAreaRef.current) {
        textAreaRef.current.style.height = "auto"; // Reset height
        textAreaRef.current.style.height =
          Math.min(textAreaRef.current.scrollHeight, 420) + "px"; // Max height: 240px
      }
    };
    fetchUser();
  }, [text]);

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
        className="min-w-[390px] min-h-[500px] max-h-[600px] bg-neutral m-4 p-4 rounded-xl shadow-md"
      >
        {/* User Info */}
        <div className="flex items-center gap-3 mb-5">
          <span className="font-semibold">
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
          ref={textAreaRef}
          value={text}
          placeholder="Theory"
          onChange={(e) => setText(e.target.value)}
          className="placeholder-opacity-10 w-full min-h-[50px] max-h-[420px] bg-transparent border p-2 mt-2 border-gray-300 rounded-lg outline-none resize-none overflow-hidden"
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
