import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuth.js";

export default function Latest() {
  const { gotLatestTheories, gotAuthors, getAuthorFromId, getLatestTheories } =
    useAuthStore();
  const latestTheoriesRef = useRef(null);

  useEffect(() => {
    const fetchLatestTheories = async () => {
      if (!latestTheoriesRef.current) {
        const latestTheories = await getLatestTheories(); 
        latestTheoriesRef.current = latestTheories; 

        for (let i = 0; i < latestTheoriesRef.current.length; i++) {
          const user = await getAuthorFromId(
            latestTheoriesRef.current[i].author
          );
          latestTheoriesRef.current[i].author = user.username;
        }
        console.log(latestTheoriesRef.current);
      }
    };

    fetchLatestTheories();
  }, []);

  if (!gotLatestTheories || !gotAuthors) {
    return <p>Loading.....</p>;
  }

  return (
    <>
      <div className="z-[10] w-full fixed bg-base-100 right-0 top-0 left-0 h-[200px]"></div>
      <div className="max-w-[800px] w-full flex flex-col p-4 rounded-xl relative shadow-md mt-[60px] mx-auto">
        <div className="h-[80px] z-[20] w-full bg-base-100 flex items-start justify-center text-3xl font-bold mb-3 text-accent text-center fixed left-0 right-0">
          <span className="">Latest Posts</span>
        </div>

        <div className="h-full overflow-y-auto space-y-5 p-2 scrollbar-none pt-[90px]">
          {latestTheoriesRef.current
            ? latestTheoriesRef.current.map((theory, index) => (
                <div
                  key={index}
                  className="rounded-md p-4 bg-gray-800 text-white shadow-md flex flex-col gap-2"
                >
                  <p className="text-sm text-gray-400">@{theory.author}</p>

                  <h3 className="text-lg font-semibold break-words">
                    {theory.title}
                  </h3>

                  <p className="text-gray-300 break-words whitespace-pre-wrap">
                    {theory.text}
                  </p>

                </div>
              ))
            : ""}
        </div>
      </div>
    </>
  );
}
