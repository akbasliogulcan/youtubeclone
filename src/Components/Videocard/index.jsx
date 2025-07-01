import React, { useState } from "react";
import millify from "millify"; // millify: Sayıları binlik gruplara ayırmak için kullanılır.
import { Link } from "react-router-dom";

const VideoCard = ({ video, isRow }) => {
  const [isHover, setIsHover] = useState(false);
  const thumbnail =
    isHover && video?.richThumbnail
      ? video?.richThumbnail[video.richThumbnail.length - 1].url
      : video?.thumbnail?.[video?.thumbnail?.length - 1]?.url;
  return (
    <Link
      to={`/watch?v=${video?.videoId}`} //* /watch diyerek Detail sayfasına yönlendiriyoruz.
      className={`cursor-pointer ${isRow && "row mt-4"}`} //* isRow true ise row class'ını ekliyoruz.
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* //*yukarıda(onMouseEnter) diyerek, setIsHover true yaparak fare üzerine  geldiğinde thumbnail değişiyor.(video oynuyor) 
      //* ve (onMouseLeave) diyerek setIsHover false yaparak fare ayrıldığında thumbnail eski haline dönüyor. */}

      {/* image area */}
      <div>
        <img
          src={thumbnail}
          className="rounded-lg w-full h-full"
          alt="card-image"
        />
      </div>
      {/* info area */}
      <div className={`${!isRow && "mt-3"} " flex gap-3 items-start"`}>
        <img
          src={video?.channelThumbnail?.[0]?.url}
          className="size-14 rounded-full"
          alt="channel-pic pp"
        />
        <div>
          <p className="channel-title"> {video?.title}</p>
          <p>{video?.channelTitle}</p>
          <div>
            <p className="flex gap-3 items-center mt-2">
              {video?.viewCount && !isNaN(video.viewCount)
                ? millify(Number(video.viewCount))
                : "0"}
              <span className="view">Görüntülenme</span>
            </p>
            {/*Millify :küsüratı binlik gruplara ayırır. */}
            {video?.isLive ? (
              <p className="bg-red-500 py-0.5 px-2 rounded-lg">Canlı</p>
            ) : (
              <p>{video?.publishedTimeText}</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
