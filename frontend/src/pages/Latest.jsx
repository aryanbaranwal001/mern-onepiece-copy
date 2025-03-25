import { useEffect, useRef, useState } from "react";
import { useAuthStore } from "../store/useAuth.js";
import { ArrowUp, ArrowDown } from "lucide-react";
import { axiosInstance } from "../lib/axios.js";

export default function Latest() {
  const {
    gotLatestTheories,
    gotAuthors,
    getAuthorFromId,
    getLatestTheories,
    isVotedArrayComplete,
    setIsVotedArray,
  } = useAuthStore();

  const latestTheoriesRef = useRef(null);

  // const [isVoted, setIsVoted] = useState([
  //   { id: "123", voted: null },
  //   { id: "456", voted: "downvoted" },
  //   { id: "789", voted: "upvoted" }
  // ]);

  const [isVoted, setIsVoted] = useState([]);

  const handleUpvote = async (theoryId) => {
    setIsVoted((prevVotes) =>
      prevVotes.map((vote) => {
        if (vote.id === theoryId) {
          if (vote.voted === "upvoted") {
            return {
              ...vote,
              voted: null,
              upvoteNumber: vote.upvoteNumber - 1,
            };
          } else if (vote.voted === "downvoted") {
            return {
              ...vote,
              voted: "upvoted",
              upvoteNumber: vote.upvoteNumber + 1,
              downvoteNumber: vote.downvoteNumber - 1,
            };
          }
          return {
            ...vote,
            voted: "upvoted",
            upvoteNumber: vote.upvoteNumber + 1,
          };
        } else {
          return vote;
        }
      })
    );

    await axiosInstance.post(`/common/upvote/${theoryId}`);
  };

  const handleDownvote = async (theoryId) => {
    setIsVoted((prevVotes) =>
      prevVotes.map((vote) => {
        if (vote.id === theoryId) {
          if (vote.voted === "downvoted") {
            return {
              ...vote,
              voted: null,
              downvoteNumber: vote.downvoteNumber - 1,
            };
          } else if (vote.voted === "upvoted") {
            return {
              ...vote,
              voted: "downvoted",
              downvoteNumber: vote.downvoteNumber + 1,
              upvoteNumber: vote.upvoteNumber - 1,
            };
          }
          return {
            ...vote,
            voted: "downvoted",
            downvoteNumber: vote.downvoteNumber + 1,
          };
        } else {
          return vote;
        }
      })
    );

    await axiosInstance.post(`/common/downvote/${theoryId}`);
  };

  useEffect(() => {
    const fetchLatestTheories = async () => {
      const arrUserVotedInParticularTheory = [];
      if (!latestTheoriesRef.current) {
        const latestTheories = await getLatestTheories();
        latestTheoriesRef.current = latestTheories;

        for (let i = 0; i < latestTheoriesRef.current.length; i++) {
          const author = await getAuthorFromId(
            latestTheoriesRef.current[i].author
          );
          latestTheoriesRef.current[i].authorname = author.username;

          // get the user id from the backend
          const res = await axiosInstance.get("/auth/getuser");
          const user = res.data;

          // checking if user has upvoted or downvoted in a particular theory
          let isVoted = false;
          for (
            let j = 0;
            j < latestTheoriesRef.current[i].upvotes.length;
            j++
          ) {
            if (latestTheoriesRef.current[i].upvotes[j] === user._id) {
              arrUserVotedInParticularTheory.push({
                id: latestTheoriesRef.current[i]._id,
                voted: "upvoted",
              });
              isVoted = true;
            }
          }
          for (
            let j = 0;
            j < latestTheoriesRef.current[i].downvotes.length;
            j++
          ) {
            if (latestTheoriesRef.current[i].downvotes[j] === user._id) {
              arrUserVotedInParticularTheory.push({
                id: latestTheoriesRef.current[i]._id,
                voted: "downvoted",
              });
              isVoted = true;
            }
          }
          if (isVoted === false) {
            arrUserVotedInParticularTheory.push({
              id: latestTheoriesRef.current[i]._id,
              voted: null,
            });
          }
        }
      }
      // setting isVoted to null for all theories
      const isVotedTempArr = [];
      for (let i = 0; i < latestTheoriesRef.current.length; i++) {
        isVotedTempArr.push({
          id: latestTheoriesRef.current[i]._id,
          voted: arrUserVotedInParticularTheory[i].voted,
          upvoteNumber: latestTheoriesRef.current[i].upvoteCount,
          downvoteNumber: latestTheoriesRef.current[i].downvoteCount,
        });
      }
      setIsVotedArray();
      setIsVoted(isVotedTempArr);
      

    };
    
    fetchLatestTheories();

  }, []);

  if (!gotLatestTheories || !gotAuthors || !isVotedArrayComplete) {
    return <p>Loading.....</p>;
  }

  return (
    <>
      <div className="z-[10] w-full fixed bg-base-100 right-0 top-0 left-0 h-[200px]"></div>
      <div className="max-w-[800px] w-full flex flex-col p-4 rounded-xl relative shadow-md mt-[60px] mx-auto">
        <div className="h-[80px] z-[20] w-full bg-base-100 flex items-start justify-center text-3xl font-bold mb-3 text-accent text-center fixed left-0 right-0">
          <span className="">Latest Theories</span>
        </div>

        <div className="h-full overflow-y-auto space-y-5 p-2 scrollbar-none pt-[90px]">
          {latestTheoriesRef.current
            ? latestTheoriesRef.current.map((theory, index) => (
                <div
                  key={index}
                  className="relative rounded-md p-4 bg-gray-800 text-white shadow-md flex flex-col gap-2"
                >
                  <p className="text-sm text-gray-400">@{theory.authorname}</p>

                  <h3 className="text-lg font-semibold break-words">
                    {theory.title}
                  </h3>

                  <p className="text-gray-300 break-words whitespace-pre-wrap w-[89%]">
                    {theory.text}
                  </p>

                  {/* Upvote & Downvote Buttons (Sideways, Right-Aligned) */}
                  <div className="absolute top-1/2 right-4 flex flex-col gap-3 transform -translate-y-1/2">
                    <div className="upvoteSpace flex items-center gap-2 justify-center">
                      {/* Upvote Button */}
                      <button
                        className={`flex items-center gap-2 transition-all"`}
                        onClick={() => handleUpvote(theory._id)}
                      >
                        <div className="flex items-center justify-center size-12">
                          <ArrowUp
                            className={`text-green-500 ${
                              isVoted[index]?.voted === "upvoted"
                                ? "size-11"
                                : "size-8"
                            }`}
                          />
                        </div>
                      </button>

                      <span className="text-lg font-semibold">
                        {isVoted[index]?.upvoteNumber}
                      </span>
                    </div>

                    {/* Downvote Button */}
                    <div className="upvoteSpace flex items-center gap-2 justify-center">
                      <button
                        className={`flex items-center gap-2 transition-all downvoted text-red-500 scale-110"`}
                        onClick={() => handleDownvote(theory._id)}
                      >
                        <div className="flex items-center justify-center size-12">
                          <ArrowDown
                            className={`text-red-500 ${
                              isVoted[index]?.voted === "downvoted"
                                ? "size-11"
                                : "size-8"
                            }`}
                          />
                        </div>
                      </button>
                      <span className="text-lg font-semibold">
                        {isVoted[index]?.downvoteNumber}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            : ""}
        </div>
      </div>
    </>
  );
}
