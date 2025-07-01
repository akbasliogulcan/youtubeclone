import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../utils/api"; // Importing the API utility for making requests
import { useState } from "react"; // Importing useState hook for managing state
import ReactPlayer from "react-player";
import ChannelInfo from "../../Components/ChannelInfo";
import Description from "../../Description";
import VideoCard from "../../Components/Videocard"; // Importing the VideoCard component to display related videos
import Comments from "../../Components/Comments"; // Importing the Comments component to display comments related to the video
import { BasicLoader } from "../../Components/Loader";
import { Error } from "../../Components/Error";
const Detail = () => {
  const [searchParams] = useSearchParams(); // This hook is used to access the URL search parameters, but it's not being used here.
  const id = searchParams.get("v"); // Extracts the video ID from the URL parameters, but it's not being used in this component.

  //*State kurulumu
  const [video, setVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = {
      id,
      extend: 1,
    };

    api
      .get("/video/info", { params })
      .then((res) => setVideo(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [id]); // This effect runs once when the component mounts, but currently does nothing.

  return (
    <div>
      {isLoading ? (
        <BasicLoader />
      ) : error ? (
        <Error info={error} />
      ) : (
        <div className="page-content">
          {/* Video */}
          <div>
            <div className="h-[30vh] md:h-[50vh] lg:h-[60vh] rounded overflow-hidden">
              <ReactPlayer
                height={"100%"}
                width={"100%"}
                url={`https://www.youtube.com/watch?v=${id}`}
                controls
              />
            </div>
          </div>
          {/* info */}
          <div>
            <h1 className="my-3  text-xl font-bold line-clamp-2">Title</h1>

            {/* Channel Info */}
            <ChannelInfo video={video} />

            {/* Description */}
            <Description video={video} />

            {/* Comments */}
            <Comments videoId={id} />
          </div>
          {/* Related Videos */}
          <div>
            {video?.relatedVideos.data.map((i, key) => (
              <VideoCard key={key} video={i} isRow />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
