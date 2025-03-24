import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuth.js";

export default function MyTheoryLeft() {
  const { gotAuthorTheories, getAuthorTheories } = useAuthStore();

  const theoriesRef = useRef(null);

  useEffect(() => {
    const fetchTheories = async () => {
      if (!theoriesRef.current) {
        const theoriesData = await getAuthorTheories(); // Wait for the resolved data
        theoriesRef.current = theoriesData; // Store the actual data
      }
    };
    fetchTheories();
  }, []);

  if (!gotAuthorTheories) {
    return <p>Loading.....</p>;
  }

  return (
    <div className="max-w-[800px] w-full flex flex-col p-4 rounded-xl shadow-md mt-[60px] mx-auto">
      <h2 className="text-3xl font-bold mb-3 text-accent text-center">
        Your Posts
      </h2>

      {/* Scrollable Comments Section with hidden scrollbar */}
      <div className="max-h-[700px] overflow-y-auto space-y-5 p-2 scrollbar-none">
        {theoriesRef.current
          ? theoriesRef.current.theories.map((comment, index) => (
              <div
                key={index}
                className="rounded-md p-4 bg-gray-800 text-white shadow-md"
              >
                <p className="text-sm text-gray-400">@{theoriesRef.current.username}</p>
                <h3 className="text-lg font-semibold">{comment.title}</h3>
                <p className="text-gray-300">{comment.text}</p>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}
