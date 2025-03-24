import { useState, useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuth.js";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export default function MyTheoryLeft() {
  const { gotAuthorTheories, getAuthorTheories } = useAuthStore();
  const [areTheoriesUpdating, setAreTheoriesUpdating] = useState([]);
  const theoriesRef = useRef(null);

  useEffect(() => {
    const fetchTheories = async () => {
      if (!theoriesRef.current) {
        const theoriesDataWithUsername = await getAuthorTheories(); // Wait for the resolved data
        theoriesRef.current = theoriesDataWithUsername; // Store the actual data
        const theoryArr = theoriesRef.current.theories;
        // Initialize the state of areTheoriesUpdating
        const arr = [];
        for (let i = 0; i < theoryArr.length; i++) {
          arr.push({
            [theoryArr[i]._id]: false,
          });
        }
        setAreTheoriesUpdating(arr);
      }
    };
    fetchTheories();
  }, []);

  if (!gotAuthorTheories) {
    return <p>Loading.....</p>;
  }

  const handleUpdate = async () => {
    console.log("Update clicked");
  };

  const handleDelete = async (theoryId) => {
    try {
      const res = await axiosInstance.get(`/author/delete/${theoryId}`);
      if (res.data.isTheoryDeleted === true) {
        toast.success("Theory Deleted Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 400);
      }
    } catch (error) {
      console.log("error in handleDelete", error);
      toast.error("Theory Deletion Failed");
    }
  };

  return (
    <div className="max-w-[800px] w-full flex flex-col p-4 rounded-xl shadow-md mt-[60px] mx-auto">
      <h2 className="text-3xl font-bold mb-3 text-accent text-center">
        Your Posts
      </h2>

      {/* Scrollable Posts with hidden scrollbar */}
      <div className="max-h-[700px] overflow-y-auto space-y-5 p-2 scrollbar-none">
        {theoriesRef.current
          ? theoriesRef.current.theories.map((comment, index) => (
              <div
                key={index}
                className="rounded-md p-4 bg-gray-800 text-white shadow-md flex flex-col gap-2"
              >
                <p className="text-sm text-gray-400">
                  @{theoriesRef.current.username}
                </p>
                <h3 className="text-lg font-semibold">{comment.title}</h3>
                <p className="text-gray-300">{comment.text}</p>

                {/* Buttons for Delete & Update */}
                <div className="flex gap-2 mt-2 items-center justify-center">
                  <button
                    onClick={() => handleUpdate(comment._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDelete(comment._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}
