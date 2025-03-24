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
            [theoryArr[i]._id]: {
              isUpdating: false,
              title: theoryArr[i].title,
              text: theoryArr[i].text,
            },
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

  const handleUpdate = async (theoryId) => {
    setAreTheoriesUpdating((prev) =>
      prev.map((item) =>
        theoryId in item
          ? {
              [theoryId]: {
                ...item[theoryId], // Preserve existing properties
                isUpdating: true, // Toggle or modify fields
              },
            }
          : item
      )
    );
  };


  const UpdatePost = async (theoryId) => {
    console.log("UpdatePost");
  }
  const RevertBack = async () => {
      window.location.reload();
  }


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

                {/* Editable Title  */}
                {areTheoriesUpdating[index][comment._id].isUpdating ? (
                  <input
                    type="text"
                    placeholder="Title"
                    value={areTheoriesUpdating[index][comment._id].title}
                    onChange={(e) => {
                      const newTitle = e.target.value;

                      setAreTheoriesUpdating((prev) =>
                        prev.map((item, i) =>
                          i === index
                            ? {
                                ...item,
                                [comment._id]: {
                                  ...item[comment._id], // Preserve existing fields
                                  title: newTitle, // Update only title
                                },
                              }
                            : item
                        )
                      );
                    }}
                    className="w-full text-xl font-bold bg-transparent border border-gray-600 outline-none 
             placeholder-opacity-50 p-2 rounded-lg 
                transition"
                  />
                ) : (
                  <h3 className="text-lg font-semibold">{comment.title}</h3>
                )}

                {/* Editable Text  */}
                {areTheoriesUpdating[index][comment._id].isUpdating ? (
                  <input
                    type="text"
                    placeholder="text"
                    value={areTheoriesUpdating[index][comment._id].text}
                    onChange={(e) => {
                      const newText = e.target.value;

                      setAreTheoriesUpdating((prev) =>
                        prev.map((item, i) =>
                          i === index
                            ? {
                                ...item,
                                [comment._id]: {
                                  ...item[comment._id], // Preserve existing fields
                                  text: newText, // Update only title
                                },
                              }
                            : item
                        )
                      );
                    }}
                    className="w-full text-[14px] font-bold bg-transparent border border-gray-600 outline-none 
             placeholder-opacity-50 p-2 rounded-lg 
                transition"
                  />
                ) : (
                  <p className="text-gray-300">{comment.text}</p>
                )}



                  {console.log(areTheoriesUpdating[index][comment._id].isUpdating)}

                  { areTheoriesUpdating[index][comment._id].isUpdating ? (

                    // while updating buttons 
                    
                    <div className="flex gap-2 mt-2 items-center justify-center">
                    <button
                      onClick={() => UpdatePost(comment._id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                    >
                      Update Post
                    </button>

                    <button
                      onClick={() => {
                        const title = comment.title;
                        const text = comment.text;

                        // reverting title and text

                        setAreTheoriesUpdating((prev) =>
                          prev.map((item, i) =>
                            i === index
                              ? {
                                  ...item,
                                  [comment._id]: {
                                    ...item[comment._id], // Preserve existing fields
                                    title: title, // Update title
                                    text: text, // Update title
                                    isUpdating: false, // Update condition
                                  },
                                }
                              : item
                          )
                        );
                      }}
                      className="bg-red-700 text-white px-3 py-1 rounded-md hover:bg-red-800"
                    >
                      Revert Back
                    </button>
                  </div>
                  ) : (

                    <div className="flex gap-2 mt-2 items-center justify-center">
                      <button
                        onClick={() => handleUpdate(comment._id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                      >
                        Update
                      </button>

                      <button
                        onClick={() => handleDelete(comment._id)}
                        className="bg-red-700 text-white px-3 py-1 rounded-md hover:bg-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  )}                


                {/* Buttons for Delete & Update */}
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}
