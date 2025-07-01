import React, { useEffect, useState } from "react";
import api from "../../utils/api"; // Importing the API utility for making requests
import { RiH1 } from "react-icons/ri";
import { AiFillDislike, AiFillLike } from "react-icons/ai"; // Importing icons for like functionality
import { TiArrowSortedDown } from "react-icons/ti"; // Importing an icon for sorting replies
const Comments = ({ videoId }) => {
  const [comments, setComments] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    api
      .get("/comments", { params: { id: videoId } })
      .then((res) => setComments(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [videoId]); // This effect runs when the videoId changes, but currently does nothing.
  console.log(comments);
  return (
    <div className="my-6">
      {isLoading ? (
        <h1>Yükleniyor...</h1>
      ) : error ? (
        <h1>Hata: {error}</h1>
      ) : (
        <div>
          <h2 className="text-xl font-bold">
            {comments.commentsCount}yoruösss
          </h2>
          <input
            type="text"
            placeholder="Yorum ekleyiniz"
            className="w-full bg-transparent border-b border-[#3e403f] p-2"
          />

          {/* Comments */}
          {comments.data.map((i, key) => (
            <div
              className="flex gap-2 sm:gap*3 items-start px-1 py-3 sm:py-4 "
              key={key}
            >
              <img
                src={i.authorThumbnail[0].url}
                className="size-8 rounded-full sm:size-10"
                alt="user-picture"
              />

              <div>
                {/* author */}
                <h5 className="flex gap-2 items-center ">
                  <span className="font-bold">{i.authorText}</span>
                  <span className="text-gray-400 text-sm">
                    {i.publishedTimeText}
                  </span>
                </h5>
                {/* Comments */}
                <p className="whitespace-pre-wrap">{i.textDisplay}</p>
                {/* like and dislike */}
                <div className="flex-items-center gap-5 mt-2">
                  <div className="flex items-center gap-1 hover:bg-gray-700 cursor-pointer transition duration-300 px-2 py-1 rounded">
                    <AiFillLike />
                    <span>{i.likesCount}</span>
                  </div>
                  {/* Dislike */}
                  <div className="flex items-center gap-1 hover:bg-gray-700 cursor-pointer transition duration-300 px-2 py-1 rounded">
                    <AiFillDislike />
                  </div>
                  <span className="flex items-center gap-1 hover:bg-gray-700 cursor-pointer transition duration-300 px-2 py-1 rounded">
                    Yanıtla
                  </span>
                </div>
                {/* Reply Count */}
                {i.replyCount > 0 && (
                  <div className="mt-2 flex items-center gap-1 text-gray-400 cursor-pointer hover:text-white transition duration-300">
                    <TiArrowSortedDown />
                    {i.replyCount}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comments;
