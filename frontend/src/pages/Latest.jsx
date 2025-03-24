import { useState, useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuth.js";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export default function MyTheoryLeft() {
  const { gotLatestTheories, getLatestTheories } = useAuthStore();
  const latestTheoriesRef = useRef(null);

  useEffect(() => {
    const fetchLatestTheories = async () => {
      if (!latestTheoriesRef.current) {
        const latestTheories = await getLatestTheories(); // Wait for the resolved data
        latestTheoriesRef.current = latestTheories; // Store the actual data
        console.log(latestTheoriesRef.current);
      }
    };
    fetchLatestTheories();
  }, []);

  if (!gotLatestTheories) {
    return <p>Loading.....</p>;
  }

  return (
  <>
  
      <div className="z-[10] w-full fixed bg-base-100 right-0 top-0 left-0 h-[200px]">

      </div>
    <div className="max-w-[800px] w-full flex flex-col p-4 rounded-xl relative shadow-md mt-[60px] mx-auto">
      <div className="h-[80px] z-[20] w-full bg-base-100 flex items-start justify-center text-3xl font-bold mb-3 text-accent text-center fixed left-0 right-0">
        <span className="">Latest Posts</span>
      </div>


      {/* Scrollable Posts with hidden scrollbar */}
      <div className="h-full overflow-y-auto space-y-5 p-2 scrollbar-none pt-[90px]">
        {latestTheoriesRef.current
          ? latestTheoriesRef.current.map((comment, index) => (
              <div
                key={index}
                className="rounded-md p-4 bg-gray-800 text-white shadow-md flex flex-col gap-2"
              >
                <p className="text-sm text-gray-400">@Username</p>

                {/* Title (Wrap text) */}
                <h3 className="text-lg font-semibold break-words">
                  {comment.title}
                </h3>

                {/* Text (Wrap text & preserve spacing) */}
                <p className="text-gray-300 break-words whitespace-pre-wrap">
                  {comment.text}
                </p>

                {/* Buttons for Delete & Update */}
              </div>
            ))
          : ""}
      </div>
    </div>
  </>
  );
}
