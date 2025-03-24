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
        const theoriesDataWithUsername = await getAuthorTheories(); 
        theoriesRef.current = theoriesDataWithUsername; 
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
                ...item[theoryId],
                isUpdating: true,
              },
            }
          : item
      )
    );
  };

  const UpdatePost = async (theoryId, index) => {
    try {
      const res = await axiosInstance.post(`/author/update/${theoryId}`, {
        title: areTheoriesUpdating[index][theoryId].title,
        text: areTheoriesUpdating[index][theoryId].text,
      });

      if (res.data.isTheoryUpdated === true) {
        toast.success("Theory Updated Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 400);
      }
    } catch (error) {
      console.log("error in UpdatePost", error);
      toast.error("Theory Updation Failed");
    }
  };

  const handleDelete = async (theoryId) => {
    try {
      const res = await axiosInstance.get(`/author/delete/${theoryId}`);
      if (res.data.isTheoryDeleted === true) {
          window.location.reload();
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
                                  ...item[comment._id], 
                                  title: newTitle, 
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
                  <h3 className="text-lg font-semibold break-words">{comment.title}</h3>
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
                                  ...item[comment._id], 
                                  text: newText, 
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
                  <p className="text-gray-300 break-words whitespace-pre-wrap">{comment.text}</p>
                )}

                {areTheoriesUpdating[index][comment._id].isUpdating ? (

                  // Buttons for Update Post & Revert Back
                  <div className="flex gap-2 mt-2 items-center justify-center">
                    <button
                      onClick={() => UpdatePost(comment._id, index)}
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
                                    ...item[comment._id], 
                                    title: title, 
                                    text: text, 
                                    isUpdating: false,
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

              </div>
            ))
          : ""}
      </div>
    </div>
  );
}
