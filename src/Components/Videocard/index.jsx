import React from "react";
import millify from "millify"; // millify: Sayıları binlik gruplara ayırmak için kullanılır.

const VideoCard = ({ video }) => {
  console.log(video);
  return (
    <div>
      {/* image area */}
      <div>
        <img
          src={video.thumbnail[video.thumbnail.length - 1].url}
          className="rounded-lg w-full h-full"
          alt="card-image"
        />
      </div>

      {/* info area */}
      <div className="mt-4">
        <img
          src={video.channelThumbnail[0].url}
          className="size-14 rounded-full"
          alt="channel-thumbnail"
        />
        <div>
          <p className=" font-bold line-clamp-1 mt-2"> {video.title}</p>
          <p>{video.channelTitle}</p>
          <div>
            <p className="flex gap-3 items-center mt-2">
              {millify(video.viewCount)} Görüntülenme
            </p>
            {/*Millify :küsüratı binlik gruplara ayırır. */}
            {video.isLive ? (
              <p className="bg-red-500 py-0.5 px-2 rounded-lg">Canlı</p>
            ) : (
              <p>{video.publishedTimeText}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
